# frozen_string_literal: true

require "rexml/document"

# Add <image:image> elements to sitemap.xml for posts with hero images.
# This helps Google Image Search discover and index post images.

Jekyll::Hooks.register :site, :post_write do |site|
  path = File.join(site.dest, "sitemap.xml")
  next unless File.file?(path)

  doc = REXML::Document.new(File.read(path))
  root = doc.root
  next unless root&.name == "urlset"

  # Add image namespace if not present
  unless root.attributes["xmlns:image"]
    root.add_namespace("image", "http://www.google.com/schemas/sitemap-image/1.1")
  end

  # Build a lookup of post URLs to their image paths
  post_images = {}
  site.posts.docs.each do |post|
    img = post.data["image"]
    next unless img

    img_path = img.is_a?(Hash) ? img["path"] : img
    next unless img_path

    img_alt = img.is_a?(Hash) ? img["alt"] : nil

    post_url = site.config["url"].to_s + post.url
    post_images[post_url.chomp("/")] = {
      "loc" => site.config["url"].to_s + img_path,
      "title" => img_alt || post.data["title"]
    }
  end

  root.each_element("url") do |url_el|
    loc_el = url_el.elements["loc"]
    next unless loc_el

    loc = loc_el.text.to_s.strip.chomp("/")
    img_data = post_images[loc]
    next unless img_data

    # Skip if image element already exists
    next if url_el.elements["image:image"]

    img_el = url_el.add_element("image:image")
    img_loc = img_el.add_element("image:loc")
    img_loc.text = img_data["loc"]

    if img_data["title"]
      img_title = img_el.add_element("image:title")
      img_title.text = img_data["title"]
    end
  end

  File.open(path, "w") do |f|
    doc.write(f, 2)
  end
end

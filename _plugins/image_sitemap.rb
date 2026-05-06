# frozen_string_literal: true

require "erb"
require "rexml/document"
require "rexml/formatters/default"

# Add <image:image> elements to sitemap.xml for posts with hero images.
# This helps Google Image Search discover and index post images.

Jekyll::Hooks.register :site, :post_write do |site|
  sitemap_path = File.join(site.dest, "sitemap.xml")
  next unless File.file?(sitemap_path)

  doc = REXML::Document.new(File.read(sitemap_path))
  root = doc.root
  next unless root&.name == "urlset"

  # Add image namespace if not present
  unless root.attributes["xmlns:image"]
    root.add_namespace("image", "http://www.google.com/schemas/sitemap-image/1.1")
  end

  site_url = site.config["url"].to_s.chomp("/")

  encode_absolute_url = lambda do |input|
    value = input.to_s.strip
    next value if value.empty?

    if value.start_with?("http://", "https://")
      uri = value
    else
      uri = site_url + (value.start_with?("/") ? value : "/#{value}")
    end

    uri.sub(%r{\A(https?://[^/]+)(/.*)?\z}) do
      host = Regexp.last_match(1)
      path_with_query = Regexp.last_match(2).to_s
      url_path, query = path_with_query.split("?", 2)
      encoded_path = url_path.split("/", -1).map do |part|
        part.empty? ? part : ERB::Util.url_encode(part).tr("+", "%20")
      end.join("/")
      query ? "#{host}#{encoded_path}?#{query}" : "#{host}#{encoded_path}"
    end
  end

  # Build a lookup of post URLs to their image paths
  post_images = {}
  site.posts.docs.each do |post|
    img = post.data["image"]
    next unless img

    img_path = img.is_a?(Hash) ? img["path"] : img
    next unless img_path

    img_alt = img.is_a?(Hash) ? img["alt"] : nil

    post_url = encode_absolute_url.call(post.url)
    post_images[post_url.chomp("/")] = {
      "loc" => encode_absolute_url.call(img_path),
      "title" => img_alt || post.data["title"]
    }
  end

  root.each_element("url") do |url_el|
    loc_el = url_el.elements["loc"]
    next unless loc_el

    loc_el.text = encode_absolute_url.call(loc_el.text)
    loc = loc_el.text.to_s.chomp("/")
    img_data = post_images[loc]

    url_el.each_element("image:image/image:loc") do |img_loc_el|
      img_loc_el.text = encode_absolute_url.call(img_loc_el.text)
    end

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

  File.open(sitemap_path, "w") do |f|
    REXML::Formatters::Default.new.write(doc, f)
    f.write("\n")
  end
end

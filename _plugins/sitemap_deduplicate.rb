# frozen_string_literal: true

require "rexml/document"
require "rexml/formatters/default"

# jekyll-archives creates one archive page per distinct tag string; slug collisions
# (e.g. "AI" vs "ai" both -> /tags/ai/) produce duplicate <loc> entries in
# jekyll-sitemap's output, which breaks Google Search Console sitemap processing.

Jekyll::Hooks.register :site, :post_write do |site|
  path = File.join(site.dest, "sitemap.xml")
  next unless File.file?(path)

  doc = REXML::Document.new(File.read(path))
  root = doc.root
  next unless root&.name == "urlset"

  seen = {}
  to_remove = []
  root.each_element("url") do |url_el|
    loc_el = url_el.elements["loc"]
    next unless loc_el

    loc = loc_el.text.to_s.strip
    loc_el.text = loc
    if seen[loc]
      to_remove << url_el
    else
      seen[loc] = true
    end
  end
  to_remove.each { |el| el.parent.delete(el) }

  File.open(path, "w") do |f|
    REXML::Formatters::Default.new.write(doc, f)
    f.write("\n")
  end
end

# frozen_string_literal: true

# Fix jekyll-seo-tag's incorrect "imageObject" casing to "ImageObject"
# Schema.org types are case-sensitive; Google may not recognize lowercase variant.

Jekyll::Hooks.register :documents, :post_render do |doc|
  next unless doc.output

  doc.output = doc.output.gsub('"@type":"imageObject"', '"@type":"ImageObject"')
  doc.output = doc.output.gsub('"@type": "imageObject"', '"@type": "ImageObject"')
end

Jekyll::Hooks.register :pages, :post_render do |page|
  next unless page.output

  page.output = page.output.gsub('"@type":"imageObject"', '"@type":"ImageObject"')
  page.output = page.output.gsub('"@type": "imageObject"', '"@type": "ImageObject"')
end

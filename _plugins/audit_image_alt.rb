# frozen_string_literal: true

# Warn at build time when post images are missing alt text.
# Covers both Markdown ![](url) syntax and front matter image objects.

Jekyll::Hooks.register :posts, :post_render do |post|
  path = post.path.sub(Dir.pwd + "/", "")

  # Check front matter image
  img = post.data["image"]
  if img
    alt = img.is_a?(Hash) ? img["alt"] : nil
    if alt.nil? || alt.strip.empty?
      Jekyll.logger.warn "SEO/alt:", "#{path} — front matter `image` has no alt text"
    end
  end

  # Check inline Markdown images: ![alt](url) — warn when alt is blank
  post.content.scan(/!\[([^\]]*)\]\([^)]+\)/) do |match|
    if match[0].strip.empty?
      Jekyll.logger.warn "SEO/alt:", "#{path} — inline image missing alt text"
      break
    end
  end
end

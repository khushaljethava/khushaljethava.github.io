# frozen_string_literal: true

# Give generated taxonomy archive pages unique metadata so they are less likely
# to look like thin duplicates in Search Console.
Jekyll::Hooks.register :pages, :pre_render do |page|
  case page.url
  when %r{\A/categories/([^/]+)/\z}
    label = Regexp.last_match(1).tr("-", " ").split.map(&:capitalize).join(" ")
    page.data["description"] ||= "Browse #{label} articles by Khushal Jethava, including practical Python, AI, machine learning, and developer-focused tutorials."
  when %r{\A/tags/([^/]+)/\z}
    label = Regexp.last_match(1).tr("-", " ")
    page.data["description"] ||= "Read Khushal Jethava tutorials tagged #{label}, with hands-on guidance for Python developers and AI builders."
  when "/archives/"
    page.data["description"] ||= "Explore the complete archive of Khushal Jethava articles, Python tutorials, AI guides, and machine learning engineering notes."
  when "/categories/"
    page.data["description"] ||= "Browse all article categories on Khushal Jethava, from Python basics and reference guides to AI, LLMs, RAG, and MLOps."
  when "/tags/"
    page.data["description"] ||= "Browse all article tags on Khushal Jethava to find Python, AI, machine learning, LLM, RAG, and developer tutorials."
  end
end

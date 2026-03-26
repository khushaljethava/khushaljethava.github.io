# frozen_string_literal: true

require "erb"

# Percent-encode each path segment so spaces, parentheses, etc. work in <img src>.
module Jekyll
  module EncodeUrlPathFilter
    def encode_url_path(input)
      return input if input.nil?

      s = input.to_s
      return s if s.empty? || s.start_with?("http://", "https://", "data:")

      s.split("/", -1).map { |part|
        part.empty? ? part : ERB::Util.url_encode(part).tr("+", "%20")
      }.join("/")
    end
  end
end

Liquid::Template.register_filter(Jekyll::EncodeUrlPathFilter)

<?php
class Card_View extends Plugin {

   function about() {
		return array(1.1,
			"Experimental card view for combined mode, with content view pop-up",
			"fox");
	}

   function init($host) {
		$host->add_hook($host::HOOK_RENDER_ARTICLE_CDM, $this);
	}

	function hook_render_article_cdm($article) {
		list ($flavor_image, $flavor_stream, $flavor_kind) = Article::_get_image(
			Article::_get_enclosures($article['id']),
			$article["content"], // unsanitized
			$article["site_url"] ?? "", // could be null if archived article
			$article);

		$article["flavor"] = ["image" => $flavor_image, "stream" => $flavor_stream, "kind" => $flavor_kind];

		return $article;
	}

	function get_css() {
		return file_get_contents(__DIR__ . "/init.css");
	}

	function get_js() {
		return file_get_contents(__DIR__ . "/init.js");
	}

   function api_version() {
		return 2;
	}

}

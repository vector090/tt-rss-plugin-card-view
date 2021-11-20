/* global require, PluginHost, Headlines, App */

require(['dojo/_base/kernel', 'dojo/ready'], function  (dojo, ready) {

	ready(function () {
		PluginHost.register(PluginHost.HOOK_ARTICLE_RENDERED_CDM, function (article) {

			const article_id = article.getAttribute('data-article-id');

			// we need access to unrendered data
			const hl = Headlines.headlines[article_id];

			if (hl) {
				const flavor = hl.flavor;

				article.querySelector('.content .content-inner').innerHTML = `
					<span onclick="return Headlines.click(event, ${hl.id});" data-article-id="${hl.id}" class="hlMenuAttach">
					<a class="card-title" title="${App.escapeHtml(hl.title)}" target="_blank" rel="noopener noreferrer" href="${App.escapeHtml(hl.link)}">
						${hl.title}</a>
				</span>
					<img src="${App.escapeHtml(flavor.image)}">
					<p class="text-muted text-small">${hl.content_preview.replace("&mdash;", "")}</p>
				`;
			}

			return true;
		});
	});
});

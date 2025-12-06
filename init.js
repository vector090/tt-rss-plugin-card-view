/* global require, PluginHost, Headlines, App */

require(['dojo/_base/kernel', 'dojo/ready'], function  (dojo, ready) {

	ready(function () {
		// Function to show content in tt-rss native dialog - following exact note/share plugin pattern
		window.showContentPopup = function(articleId) {
			const hl = Headlines.headlines[articleId];
			if (!hl) return;

			const dialog = new fox.SingleUseDialog({
				id: `card-view-content-dialog-${articleId}`,
				title: App.escapeHtml(hl.title),
				content: __("Loading, please wait..."),
				style: 'width: 80vw; max-width: 1200px; height: 80vh; max-height: 900px;'
			});

			const tmph = dojo.connect(dialog, 'onShow', function () {
				dojo.disconnect(tmph);

				// Set content directly like note/share plugins do
				dialog.attr('content', `<div class='panel panel-scrollable-dynamic contents' style='border: 1px solid #ddd; margin: 10px;'>
						${hl.content}
					</div>
					`);
			});

			dialog.show();
		};

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
					<p class="text-muted text-small content-preview" onclick="showContentPopup(${hl.id})" style="cursor: pointer;">
						${hl.content_preview.replace("&mdash;", "")} <span style="color: #0066cc;">[Read more]</span>
					</p>
				`;
			}

			return true;
		});
	});
});

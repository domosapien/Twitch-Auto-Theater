// ==UserScript==
// @name         Twitch Auto Theater
// @version      1.0.3
// @updateURL    https://raw.githubusercontent.com/domosapien/Twitch-Auto-Theater/master/twitch-auto-theater.js
// @downloadURL  https://raw.githubusercontent.com/domosapien/Twitch-Auto-Theater/master/twitch-auto-theater.js
// @match        www.twitch.tv/*
// @grant        none
// ==/UserScript==

/* jshint -W097 jquery:true */

'use strict';

var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (!mutation.addedNodes) {
			return;
		}

		for (var i = 0; i < mutation.addedNodes.length; i++) {
			// do things to your newly added nodes here
			var $node = $(mutation.addedNodes[i]).find('button.player-button--theatre');
			if ($node.length) {
				$node.trigger('click');
				observer.disconnect();
				return;
			}
		}
	});
});

function startObserver() {
	observer.observe(document.body, {
		childList: true,
		subtree: true,
		attributes: false,
		characterData: false
	});
}

startObserver();

window.onpopstate = function (event) {
	startObserver();
};

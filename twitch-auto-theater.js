// ==UserScript==
// @name         Twitch Auto Theater
// @version      1.0.5
// @updateURL    https://raw.githubusercontent.com/domosapien/Twitch-Auto-Theater/master/twitch-auto-theater.js
// @downloadURL  https://raw.githubusercontent.com/domosapien/Twitch-Auto-Theater/master/twitch-auto-theater.js
// @match        www.twitch.tv/*
// @grant        none
// ==/UserScript==

/* jshint -W097 jquery:true */

'use strict';

var observer = new MutationObserver(function (mutations) {
	mutations.some(function (mutation) {
		if (!mutation.addedNodes) {
			return false;
		}

		for (var i = 0; i < mutation.addedNodes.length; i++) {
			// do things to your newly added nodes here
			var $node = $(mutation.addedNodes[i]).find('button.player-button--theatre');
			if ($node.length) {
				$node.trigger('click');
				observer.disconnect();
				return true;
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

(function (history) {
	var pushState = history.pushState;
	history.pushState = function (state) {
		if (typeof history.onpushstate === "function") {
			history.onpushstate({ state: state });
		}
		return pushState.apply(history, arguments);
	}
})(window.history);

window.onpopstate = history.onpushstate = function (event) {
	if (event.state && event.state.path) {
		var path = event.state.path.split('/');
		if (path.length === 2 && path[1] !== 'directory') {
			startObserver();
		}
	}
};

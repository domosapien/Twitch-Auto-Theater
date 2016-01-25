// ==UserScript==
// @name         Twitch Auto Theater
// @version      1.0.0
// @updateURL    
// @match        www.twitch.tv/*
// ==/UserScript==
/* jshint -W097 */
'use strict';

/* jshint jquery:true */

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (!mutation.addedNodes) { return; }

        for (var i = 0; i < mutation.addedNodes.length; i++) {
            // do things to your newly added nodes here
            var $node = $(mutation.addedNodes[i]).find('button.player-button--theatre');
            if ($node.length) {
                $node.trigger('click');
                observer.disconnect();
            }
        }
    });
});

observer.observe(document.body, {
    childList: true
    , subtree: true
    , attributes: false
    , characterData: false
});

window.onpopstate = function(event) {
    observer.observe(document.body, {
        childList: true
        , subtree: true
        , attributes: false
        , characterData: false
    });
};

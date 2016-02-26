// ==UserScript==
// @name        Github Compare Button
// @namespace   http://github.com/core23/gm-scripts
// @description Adds a compare button to the repository overview page
// @author      Christian Gripp
// @copyright   2016+, core23 (http://core23.de)
// @include     https://github.com/*
// @version     1.0.1
// @grant       none
// @run-at      document-end
// ==/UserScript==
/* global unsafeWindow */
(function () {
    function createCompareMenu() {
        if ($('#GithubCompareMenu').length) {
            return;
        }
        var actions = $('.pagehead-actions');
        if (!actions.length === 0) {
            return;
        }
        var branch = $('.js-navigation-open.selected').data('name');
        if (!branch) {
            return;
        }
        var url = $('h1.entry-title strong a').attr('href');
        var tags = $('.select-menu-tab-bucket .select-menu-item .select-menu-item-text');
        var button = $('<button>').addClass('btn btn-sm btn-with-count select-menu-button js-menu-target').text('Compare');
        var submenu = $(['<div class="select-menu-modal-holder js-menu-content js-navigation-container">',
            '<div class="select-menu-modal-holder">',
            '<div aria-hidden="false" class="select-menu-modal subscription-menu-modal js-menu-content">',
            '<div class="select-menu-header">',
            '<span class="select-menu-title">Compare with</span>',
            '</div>',
            '<div role="menu" class="select-menu-list js-navigation-container js-active-navigation-container"></div>',
            '</div>',
            '</div>',
            '</div>'].join(''));
        tags.each(function () {
            var tag = $(this).text().trim();
            if (tag == branch || tag.match(/Create branch:/)) {
                return;
            }
            var link = $(['<a class="select-menu-item js-navigation-item js-navigation-open" href="' + url + '/compare/' + branch + '...' + tag + '">',
                '<span class="select-menu-item-text css-truncate-target js-select-menu-filter-text">' + tag + '</span>',
                '</a>'].join(''));
            $('.select-menu-list', submenu).append(link);
        });
        var div = $('<div>').attr('id', 'GithubCompareMenu').addClass('select-menu js-menu-container js-select-menu');
        div.append(button);
        div.append(submenu);
        var li = $('<li>');
        li.append(div).prependTo(actions);
    }

    console.log('GithubCompareButton', 'page load');
    createCompareMenu();

    // On pjax;
    unsafeWindow.$(document).on('pjax:end', function () {
        console.log('GithubCompareButton', 'pjax');
        createCompareMenu();
    });
})();

// ==UserScript==
// @name         atcoder-problem-navigator
// @namespace    https://github.com/yoshrc
// @version      1.0
// @description  Shows a navigation bar on AtCoder contest pages for jumping to problems.
// @author       yoshrc
// @match        https://atcoder.jp/contests/*
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    const contest = location.href.match(/^https:\/\/atcoder\.jp\/contests\/([^\/]+)/)[1];
    const key = 'atcoder-problem-navigator-' + contest;

    if (location.href.match(/^https:\/\/atcoder\.jp\/contests\/([^\/]+)\/tasks\/?$/)) {
        console.log(contest);
        const problems = [];
        const $rows = $('tbody>tr');
        for (let i = 0; i < $rows.length; i++) {
            console.log(i);
            const $links = $rows.eq(i).find('a');
            const href = $links.eq(0).attr('href');
            console.log(href);
            const text = $links.eq(0).text() + ' - ' + $links.eq(1).text();
            problems.push({
                href: href,
                text: text
            });
        }
        localStorage[key] = JSON.stringify(problems);
    }

    if (key in localStorage) {
        let problems = JSON.parse(localStorage[key]);
        const $problemsBar = $('<ul class="nav nav-tabs"></ul>');
        for (let i = 0; i < problems.length; i++) {
            const $link = $('<a style="margin-left: 10px; margin-right: 10px; white-space: nowrap"></a>')
                  .attr('href', problems[i].href)
                  .text(problems[i].text);
            $problemsBar.append($('<span> </span>').append($link));
        }
        $('#contest-nav-tabs').append($problemsBar);
    }
})();

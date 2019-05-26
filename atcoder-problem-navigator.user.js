// ==UserScript==
// @name         atcoder-problem-navigator
// @namespace    https://github.com/yoshrc
// @version      1.1
// @description  Shows a navigation bar on AtCoder contest pages for jumping to problems.
// @author       yoshrc
// @match        https://atcoder.jp/contests/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const contest = location.href.match(/^https:\/\/atcoder\.jp\/contests\/([^\/]+)/)[1];
    const key = 'atcoder-problem-navigator-' + contest;

    if (location.href.match(/^https:\/\/atcoder\.jp\/contests\/([^\/]+)\/tasks\/?$/)) {
        const problems = [];
        const rows = document.querySelectorAll('tbody>tr');
        for (let i = 0; i < rows.length; i++) {
            const links = rows[i].querySelectorAll('a');
            const href = links[0].getAttribute('href');
            const text = links[0].textContent + ' - ' + links[1].textContent;
            problems.push({
                href: href,
                text: text
            });
        }
        localStorage[key] = JSON.stringify(problems);
    }

    if (key in localStorage) {
        let problems = JSON.parse(localStorage[key]);
        const problemsBar = document.createElement('ul');
        problemsBar.className = 'nav nav-tabs';
        for (let i = 0; i < problems.length; i++) {
            const link = document.createElement('a');
            link.setAttribute('style', 'margin-left: 10px; margin-right: 10px; white-space: nowrap');
            link.setAttribute('href', problems[i].href);
            link.textContent = problems[i].text;
            const span = document.createElement('span');
            span.textContent = ' ';
            span.appendChild(link);
            problemsBar.appendChild(span);
        }
        document.getElementById('contest-nav-tabs').appendChild(problemsBar);
    }
})();

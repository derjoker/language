// ==UserScript==
// @name         Yi Language
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  try to take over the world!
// @author       derjoker
// @match        https://github.com/derjoker/language/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  // Your code here...
  GM_addStyle(".markdown-body {font-size: 20px}");
  GM_addStyle("#readme strong {color: #ffa657}");
  GM_addStyle("#readme .del-grey {opacity: 0.6}");

  const pg = document.querySelector('#readme');

  pg.querySelectorAll('del').forEach(d => {
    const s = document.createElement('span');
    s.textContent = d.textContent;
    s.className = 'del-grey';
    d.replaceWith(s);
  })
  
  pg.querySelectorAll('strong').forEach(s => {
    // original data in highlight
    const x = s.textContent;
    s.setAttribute('data-x', x);

    // new data in parenthesis
    const y = s.nextSibling.textContent.replace('(', '').split(')')[0];
    s.nextSibling.textContent = s.nextSibling.textContent.replace('(' + y + ')', '');
    s.setAttribute('data-y', y);

    s.addEventListener('click', event => {
      s.textContent = s.textContent === x ? y : x;
      event.stopPropagation();
    });
  });

  pg.querySelectorAll('p').forEach((p, key) => {
    console.log(key, p);
  });

  let toggle = true;

  document.body.addEventListener('click', () => {
    toggle = !toggle;
    if (toggle) {
      pg.querySelectorAll('strong').forEach(s => {
        s.textContent = s.getAttribute('data-x');
      })
    } else {
      pg.querySelectorAll('strong').forEach(s => {
        s.textContent = s.getAttribute('data-y');
      })
    }
  });
})();

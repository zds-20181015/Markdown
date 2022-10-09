var h=/highlight-(?:text|source)-([a-z0-9]+)/;function N(t){t.addRule("highlightedCodeBlock",{filter:function(e){var r=e.firstChild;return e.nodeName==="DIV"&&h.test(e.className)&&r&&r.nodeName==="PRE"},replacement:function(e,r,l){var n=r.className||"",i=(n.match(h)||[null,""])[1];return`

`+l.fence+i+`
`+r.firstChild.textContent+`
`+l.fence+`

`}})}function v(t){t.addRule("strikethrough",{filter:["del","s","strike"],replacement:function(e){return"~"+e+"~"}})}var C=Array.prototype.indexOf,b=Array.prototype.every,a={};a.tableCell={filter:["th","td"],replacement:function(t,e){return f(g(e))?t:c(t,e)}};a.tableRow={filter:"tr",replacement:function(t,e){const r=g(e);if(f(r))return t;var l="",n={left:":--",right:"--:",center:":-:"};if(T(e)){const d=m(r);for(var i=0;i<d;i++){const u=d>=e.childNodes.length?null:e.childNodes[i];var o="---",s=u?(u.getAttribute("align")||"").toLowerCase():"";s&&(o=n[s]||o),u?l+=c(o,e.childNodes[i]):l+=c(o,null,i)}}return`
`+t+(l?`
`+l:"")}};a.table={filter:function(t){return t.nodeName==="TABLE"},replacement:function(t,e){if(f(e))return t;t=t.replace(/\n+/g,`
`);var r=t.trim().split(`
`);r.length>=2&&(r=r[1]);var l=r.indexOf("| ---")===0,n=m(e),i="";return n&&!l&&(i="|"+"     |".repeat(n)+`
|`+" --- |".repeat(n)),`

`+i+t+`

`}};a.tableSection={filter:["thead","tbody","tfoot"],replacement:function(t){return t}};function T(t){var e=t.parentNode;return e.nodeName==="THEAD"||e.firstChild===t&&(e.nodeName==="TABLE"||w(e))&&b.call(t.childNodes,function(r){return r.nodeName==="TH"})}function w(t){var e=t.previousSibling;return t.nodeName==="TBODY"&&(!e||e.nodeName==="THEAD"&&/^\s*$/i.test(e.textContent))}function c(t,e=null,r=null){r===null&&(r=C.call(e.parentNode.childNodes,e));var l=" ";r===0&&(l="| ");let n=t.trim().replace(/\n\r/g,"<br>").replace(/\n/g,"<br>");for(n=n.replace(/\|+/g,"\\|");n.length<3;)n+=" ";return e&&(n=A(n,e," ")),l+n+" |"}function p(t){if(!t.childNodes)return!1;for(let e=0;e<t.childNodes.length;e++){const r=t.childNodes[e];if(r.nodeName==="TABLE"||p(r))return!0}return!1}function f(t){return!!(!t||!t.rows||t.rows.length===1&&t.rows[0].childNodes.length<=1||p(t))}function g(t){let e=t.parentNode;for(;e.nodeName!=="TABLE";)if(e=e.parentNode,!e)return null;return e}function A(t,e,r){const l=e.getAttribute("colspan")||1;for(let n=1;n<l;n++)t+=" | "+r.repeat(3);return t}function m(t){let e=0;for(let r=0;r<t.rows.length;r++){const n=t.rows[r].childNodes.length;n>e&&(e=n)}return e}function L(t){t.keep(function(r){return r.nodeName==="TABLE"});for(var e in a)t.addRule(e,a[e])}function k(t){t.addRule("taskListItems",{filter:function(e){return e.type==="checkbox"&&e.parentNode.nodeName==="LI"},replacement:function(e,r){return(r.checked?"[x]":"[ ]")+" "}})}function x(t){t.use([N,v,L,k])}export{x as gfm,N as highlightedCodeBlock,v as strikethrough,L as tables,k as taskListItems};

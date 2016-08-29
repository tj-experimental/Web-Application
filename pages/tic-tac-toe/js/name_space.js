var differences = {},
    exceptions,
    globals = {},
    ignoreList = (prompt('Ignore filter (comma sep)?', '') || '').split(','),
    i = ignoreList.length,
    iframe = document.createElement('iframe');
while (i--) {
    globals[ignoreList[i]] = 1
}
for (i in window) {
    differences[i] = {
        'type': typeof window[i],
        'val': window[i]
    }
}
iframe.style.display = 'none';
document.body.appendChild(iframe);
iframe.src = 'about:blank';
iframe = iframe.contentWindow || iframe.contentDocument;
for (i in differences) {
    if (typeof iframe[i] != 'undefined') delete differences[i];
    else if (globals[differences[i].type]) delete differences[i]
}
exceptions = 'addEventListener,document,location,navigator,window'.split(',');
i = exceptions.length;
while (--i) {
    delete differences[exceptions[i]]
}
console.dir(differences);
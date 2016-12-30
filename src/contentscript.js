var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};
document.createElement('script');


restore_options();
function restore_options() {
        chrome.storage.sync.get({
            activeSubreddits: [],
            activeExt: true
        }, function (items) {
            localStorage.setItem("activeSubreddits",  items.activeSubreddits);
            localStorage.setItem("activeExtension",  items.activeExt);            
        });
    }
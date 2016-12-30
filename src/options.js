var activeSr = [];

function save_options() {
    var activeExt = document.getElementById('active').checked;
    chrome.storage.sync.set({
        activeExt: activeExt,
        activeSubreddits: activeSr
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

function addItm() {
    var reddit = document.getElementById('i_subreddit').value;
    document.getElementById('i_subreddit').value = "";
    activeSr.push(reddit);
    drawItems();
}

function rmvItm(e) {
    var elem = $(e.target);
    activeSr.splice(parseInt(elem.attr("idx")), 1);
    drawItems();
}

function drawItems() {
     $("#list").empty();
    var idx = 0;
    activeSr.forEach(function (entry) {
        if (entry && entry.length > 0) {
            $("#list").append("<p><span>r/" + entry + "</span> <button class='remove' idx='" + idx + "'>Remove</button></p>");
            idx++;
        } else {
            activeSr.splice(idx, 1);
        }

    });
    $(".remove").on("click", rmvItm);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        activeExt: true,
        activeSubreddits: []
    }, function (items) {
        document.getElementById('active').checked = items.activeExt;
        activeSr = items.activeSubreddits;
        drawItems();
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('add').addEventListener('click',
    addItm);
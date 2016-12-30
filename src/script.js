$(document).ready(function () {
    var activeSr = [];
    var activeExtension;
    console.log("Loaded");

    function getObjects(obj, key, val) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(getObjects(obj[i], key, val));
            } else if (i.toUpperCase() == key.toUpperCase() && obj[key].toUpperCase() == val.toUpperCase()) {
                objects.push(obj);
            }
        }
        return objects;
    }

    restore_options();

    var i = 0;
    var split = window.location.pathname.split("/");



    function restore_options() {
        // Use default value color = 'red' and likesColor = true.
       activeSr = localStorage.getItem("activeSubreddits");
       activeExtension = localStorage.getItem("activeExtension");
       console.log(activeSr);
       console.log(activeExtension);
       if (activeExtension === 'true') {
           triggerSearch();
           setInterval(myTimer, 1000);
       }
    }

    function triggerSearch() {
        $('div.entry a.author').not("[blacklist-check-completed*=true]").each(function (index) {
            var elem = $(this);
            elem.attr("blacklist-check-completed", true);
            $.getJSON($(this).attr('href') + "/comments.json", function (data) {
                i++;
                var subreddits = activeSr.split(",");
                var validSubs = [];
                var objects = [];
                subreddits.forEach(function (entry) {
                    var newob = getObjects(data, "subreddit", entry);
                    objects = objects.concat(newob);
                    if (newob && newob.length > 0) validSubs.push(entry);
                });
                if (objects.length > 0) {
                    console.log(elem.attr('href'));
                    elem.addClass("user-anchor-blacklisted");
                    elem.parent().parent().addClass("user-div-blacklisted");
                    validSubs.forEach(function (entry) {
                        elem.parent().append("<span class='user-span-blacklisted'>r/" + entry + "</span>");
                    });

                }

            });
        });
        $("a[id^='more_t1_']").each(function (index) {
            var elem = $(this);
            elem.attr("onclick", elem.attr("onclick") + ";triggerSearch();");
        });


    }
    

    function myTimer() {
        var split = window.location.pathname.split("/");
        if (split.length > 3 && split[3] == "comments") {
            triggerSearch();
        }
    }



});

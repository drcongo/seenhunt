/**
 * Automatically mark stuff on Product Hunt as new if it wasn't here on your last visit.
 */


var timediff = 259200000; // three days
// var timediff = 30000; // 30 seconds, useful for debugging

// Remove stuff from local storage if it's more than a couple of days old
// to keep localStorage manageable.
var cleanUp = function(){
    var now = +new Date();
    var allKeys = Object.keys(window.localStorage);
    for (var i = allKeys.length - 1; i >= 0; i--) {
        var key = allKeys[i];
        var prefix = key.split("__")[0];
        if(prefix === 'is.hactar.seenhunt'){
            var stored = new Date(window.localStorage.getItem(key));
            if(now - stored > timediff){
                window.localStorage.removeItem(key);
            }
        }
    }
};


var setSeen = function(id){
    var date = new Date();
    return window.localStorage.setItem('is.hactar.seenhunt__' + id, date);
};


var getSeen = function(id){
    return window.localStorage.getItem('is.hactar.seenhunt__' + id);
};


var elements = document.querySelectorAll('div.post-item--content');
Array.prototype.forEach.call(elements, function(el, i){
    var id = el.getAttribute('data-href');
    var seen = getSeen(id);
    if(seen === undefined || seen === null){
        // W00t! Something new!
        // add something to the before of the parent to signify newyness.
        var style = document.createElement("style");
        document.head.appendChild(style);
        var sheet = style.sheet;
        sheet.insertRule('.seenhunt_new::before { content: "🍆"; float: left; display: block; margin-top: 15px; margin-left: -33px;}', 0);

        var parent = el.parentNode;
        if (parent.classList){
            parent.classList.add('seenhunt_new');
        }else{
            parent.className += ' ' + 'seenhunt_new';
        }
        setSeen(id);
    }
});

cleanUp();

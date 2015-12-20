var server = 'http://step.polymtl.ca';
var basepath = '/~alexrose/markdown/';
var contentPath = 'content/';

$(document).ready(function() {
    updateContent(window.location.pathname);
});

// Update content with given markdown
// URL should be either full path or relative chrooted to content folder
function updateContent(url) {
    if (url.match("^" + basepath)) {
//            if (!url.match("^" + basepath + contentPath)) {
            url = url.substring(basepath.length);
//          }
    }

    if (!url) {
        url = "index.md";
    }
    
    if (url.match(".md$")){ 
        url = contentPath + url;
    }

    $.ajax({
    method: 'GET',
    url: url
    }).done(setMarkdown);
}

function setMarkdown(content) { 
    $('#content').html(markdown.toHTML(content));
}

$(document).on('click', 'a', (function(e) {
        var url = $(this).attr('href');
        if (!url.match("^http") && url.match(".md$")) {
            e.preventDefault();
            updateContent(url);
            var prevUrl = window.location.href;
            var prevPath = window.location.pathname;
            prevPath = prevPath.substring(basepath.length);
            
            window.history.pushState({dest: url, path: prevPath}, "STEP wiki - " + prevPath, url);
        }
    })
);

window.onpopstate = function(e){
    if(e.state){
        updateContent(e.state.dest);
    }
    else { 
        updateContent("");
    }
};
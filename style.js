$(document).ready(function() {
    if (window.localStorage) {
        var theme = localStorage.getItem('theme');
        if (theme && theme != 'default') {
            changeTheme(theme);
        }
    }
});

function changeTheme(url) {
    $('#theme').attr('href', url)
}

$(document).on('click', 'a.theme', function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    changeTheme(url);
    
    if (window.localStorage) {
        if ($(this).hasClass('default')) {
            url = 'default';
        }
        
        localStorage.setItem('theme', url);
    }
});
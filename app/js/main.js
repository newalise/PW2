$('.user-info').find(".edit").click(function () {
    $(this).each(function () {
        $(this).css({'display': 'none'});
        var content = $(this).html();
        $('textarea').each(function () {
            $(this).siblings().css({'display': 'block'});
            $(this).remove();
        });
        $('.btn-success, .btn-close').remove();
        $(this).parent().append('<textarea autofocus rows="1">' + content + '</textarea>');
        $(this).parent().parent().append('<div class="btn-group"><button class="btn btn-success">✔</button>' +
            '<button class="btn btn-close">X</button></div>');
    });

    $('.user-info').find('.btn-success, .btn-close').show();
});

$(document).on('click', '.btn-success', function () {
    console.log("click");
    $('.btn-success, .btn-close').remove();
    $('textarea').each(function () {
        var content = $(this).val();
        $(this).siblings().html(content).css({'display': 'block'});
        $(this).remove();
    });
});

$(document).on('click', '.btn-close', function () {
    $('.btn-success, .btn-close').remove();
    $('textarea').each(function () {
        $(this).siblings().css({'display': 'block'});
        $(this).remove();
    });
});

$('[data-toggle]').click(function(){
    toggleActive()
})



$('#form').on('submit', function(event) {
    var label = $('.tt-input').val();
    addTag(label);
    $('.typeahead').typeahead('close');
    $('.typeahead').typeahead('val', '');
    toggleActive()
    event.preventDefault();
});


function toggleActive() {
    $('[data-toggle]').toggleClass('cancel').toggleClass('add');
    $('.tag-input').toggleClass('active').focus();
    $('.tag-add-submit').toggleClass('active');
    $('.taglist').toggleClass('edit');
}
function addTag(label) {
    var tag = "<li class='tag-wrap'><div class='tag' >" + label + "</div></li> ";
    $('.tag-tools').parent().before(tag);
}

// constructs the suggestion engine
var states = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: ['new', 'test', 'event screen', 'newport', 'special event']
});

$('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        name: 'states',
        source: states
    });

$('.typeahead').bind('typeahead:select', function(ev, suggestion) {
    $('#form').submit();
});

$(document).on('click', '.tag-wrap', function () {
    $(this).remove();
});
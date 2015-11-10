$(document).ready(function() {
    $('select').select2({
        minimumResultsForSearch: 8
    });

    var stacks = {
        stack_top_right: {
            "dir1": "down",
            "dir2": "left",
            "push": "top",
            "spacing1": 10,
            "spacing2": 10
        },
        stack_top_left: {
            "dir1": "down",
            "dir2": "right",
            "push": "top",
            "spacing1": 10,
            "spacing2": 10
        },
        stack_bottom_left: {
            "dir1": "right",
            "dir2": "up",
            "push": "top",
            "spacing1": 10,
            "spacing2": 10
        },
        stack_bottom_right: {
            "dir1": "left",
            "dir2": "up",
            "push": "top",
            "spacing1": 10,
            "spacing2": 10
        },
        stack_bar_top: {
            "dir1": "down",
            "dir2": "right",
            "push": "top",
            "spacing1": 0,
            "spacing2": 0
        },
        stack_bar_bottom: {
            "dir1": "up",
            "dir2": "right",
            "spacing1": 0,
            "spacing2": 0
        },
        stack_context: {
            "dir1": "down",
            "dir2": "left",
            "context": $("#stack-context")
        }
    };
    var titles = {
        "success": "Success"
    };

    $('.notification-handler').each(function(index, element) {
        element = $(element);

        var noteStyle = element.data('style');
        var noteShadow = true;
        var noteOpacity = 1;
        var noteStack = "stack_top_right";
        //var noteStack = "stack_bar_top";

        function findWidth() {
            if (noteStack == "stack_bar_top") {
                return "100%";
            }
            if (noteStack == "stack_bar_bottom") {
                return "70%";
            } else {
                return "320px";
            }
        }

        // Create new Notification
        new PNotify({
            title: titles[element.data('type')],
            text: element.html(),
            shadow: noteShadow,
            opacity: noteOpacity,
            addclass: noteStack,
            type: noteStyle,
            stack: stacks[noteStack],
            width: findWidth(),
            delay: 1400,
            buttons: {
                closer_hover: false,
                sticker: false,
                sticker_hover: false
            }
        });

    });

    $('.js-autocomplete').each(function(){
        var queryParams = $(this).data('params');

        $(this).select2({
            ajax: {
                url: $(this).data('url'),
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    queryParams.query = params.term;

                    return queryParams;
                },
                processResults: function (data) {
                    return {
                        results: data
                    };
                },
                cache: true
            },
            minimumInputLength: 1
        });
    });
});

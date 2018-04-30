$(function () {
    var stickyNoteTemplate = `
    <div class="sticky-note card ui-widget-content" style="width: 18rem;">
        <div class="card-header">
            <input type="text" class="form-control" value="Card title">
            <a class="btn btn-outline-primary js-delete-note" href="#"><i class="far fa-trash-alt"></i></a>
        </div>
        <div class="card-body">
            <textarea class="form-control card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</textarea>
        </div>
        <div class="card-footer">
            <a href="#" class="card-link">Mark Francis</a>
            <a href="#" class="card-link card-progress">3/4</a>
        </div>
    </div>`;
    
    var resizeWhiteboard = resizeWhiteboardEvent($(document));
    
    function initialiseSticky($stickyNote) {
        $stickyNote.draggable({
            stop: function(){
                resizeWhiteboard.invoke();
            }
        });
        $stickyNote.resizable({
            minHeight: 216,
            minWidth: 176
        });
    };
    
    initialiseSticky($('.sticky-note'));

    var $body = $('body');

    $('.js-add-sticky-note').click(function () {
        var $newSticky = $(stickyNoteTemplate);
        $body.append($newSticky);
        initialiseSticky($newSticky);
        
        return false;
    });
    
    $body.on('click', '.js-delete-note', function() {
        var $sticky = $(this).parents('.sticky-note');
        $sticky.remove();
        return false;
    });

    var $canvas = $('#js-whiteboard');
    
    $canvas.width($body.width());
    $canvas.height($body.height());
    
    whiteboard($(document), resizeWhiteboard, $canvas, $canvas.width(), $canvas.height());
})

$(function () {
    var stickyNoteTemplate = `
    <div class="sticky-note card ui-widget-content" style="width: 18rem;">
        <div class="card-header">
            <input type="text" class="form-control" value="Card title">
        </div>
        <div class="card-body">
            <textarea class="form-control card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</textarea>
        </div>
        <div class="card-footer">
            <a href="#" class="card-link">Mark Francis</a>
            <a href="#" class="card-link card-progress">3/4</a>
        </div>
    </div>`;
    
    function initialiseSticky($stickyNote) {
        $stickyNote.draggable();
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

    var $canvas = $('#js-whiteboard');
    whiteboard($(document), $canvas, $canvas.width(), $canvas.height());
})

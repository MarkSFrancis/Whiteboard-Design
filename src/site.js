$(function(){
    $('.sticky-note').draggable();
    var $canvas = $('#js-whiteboard');
    whiteboard($(document), $canvas, $canvas.width(), $canvas.height());
})
$(function(){
    $('.sticky-note').draggable();
    var canvas = $('#js-whiteboard');
    whiteboard(canvas[0], canvas.width(), canvas.height());
    
    var ctx = canvas[0].getContext('2d');
})
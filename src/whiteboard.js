/*jslint white: true, sloppy: true*/
function coordinate(x, y) {
    return {
        x: x,
        y: y
    };
}

function whiteboard($document, $canvas, width, height) {
    var canvas = $canvas[0],
        ctx = canvas.getContext('2d'),
        erasing = false,
        eraserThickness = 14,
        eraserColor = 'white',
        drawingColor = 'black',
        drawingThickness = 2,
        drawing = false,
        prevCoord;
    
    canvas.width = width;
    canvas.height = height;

    function getMouseCoords(clientX, clientY) {
        return coordinate(
            clientX - canvas.offsetLeft,
            clientY - canvas.offsetTop
        );
    }

    function draw(curCoord) {
        ctx.beginPath();
        ctx.moveTo(prevCoord.x, prevCoord.y);
        ctx.lineTo(curCoord.x, curCoord.y);

        if (erasing) {
            ctx.strokeStyle = eraserColor;
            ctx.lineWidth = eraserThickness;
        } else {
            ctx.strokeStyle = drawingColor;
            ctx.lineWidth = drawingThickness;
        }

        ctx.stroke();
        ctx.closePath();

        prevCoord = curCoord;
    }

    function startDrawing(coords) {
        if (drawing) {
            draw(coords);
        } else {
            drawing = true;
        }
        prevCoord = coords;
    }

    function stopDrawing() {
        drawing = false;
    }

    function setColor(newColor) {
        drawingColor = newColor;
    }

    function useEraser() {
        erasing = true;
    }

    function usePen() {
        drawing = true;
    }

    function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function exportToImage() {
        var dataURL = canvas.toDataURL();
        return dataURL;
    }

    function importFromImage(data) {
        ctx.drawImage(data, 0, 0);
    }

    $canvas.mousemove(function (e) {
        if (drawing || erasing) {
            draw(getMouseCoords(e.clientX, e.clientY));
        }
    });

    $canvas.mousedown(function (e) {
        startDrawing(getMouseCoords(e.clientX, e.clientY));

        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    $document.mouseup(function (e) {
        stopDrawing();
    });
    
    $canvas.on('contextmenu', function(e){
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    return {
        exportToImage: exportToImage,
        importFromImage: importFromImage
    };
}

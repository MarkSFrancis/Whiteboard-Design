/*jslint white: true, sloppy: true*/
function coordinate(x, y) {
    return {
        x: x,
        y: y
    };
}

function whiteboard($document, resizeWhiteboardEvent, $canvas, width, height) {
    var canvas = $canvas[0],
        ctx = canvas.getContext('2d'),
        erasing = false,
        eraserThickness = 30,
        eraserColor = 'white',
        drawingColor = 'black',
        drawingThickness = 2,
        drawing = false,
        prevCoord;

    canvas.width = width;
    canvas.height = height;

    function getMouseCoords(x, y) {
        var offset = $canvas.offset();
        return coordinate(
            x - offset.left,
            y - offset.top
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

    function stopDrawing() {
        drawing = false;
    }

    function stopErasing() {
        erasing = false;
    }

    function startDrawing(coords) {
        stopErasing();

        if (drawing) {
            draw(coords);
        } else {
            drawing = true;
        }
        prevCoord = coords;
    }

    function startErasing(coords) {
        stopDrawing();

        if (erasing) {
            draw(coords);
        } else {
            erasing = true;
        }
        prevCoord = coords;
    }

    function setColor(newColor) {
        drawingColor = newColor;
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
            draw(getMouseCoords(e.pageX, e.pageY));
        }
    });

    $canvas.mousedown(function (e) {
        switch (e.which) {
            case 1:
                startDrawing(getMouseCoords(e.pageX, e.pageY));
                break;
            case 3:
                startErasing(getMouseCoords(e.pageX, e.pageY));
                break;
            default:
                return;
        }

        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    $document.mouseup(function (e) {
        stopDrawing();
        stopErasing();
    });

    $canvas.on('contextmenu', function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
    
    resizeWhiteboardEvent.addListener(function(newSize){
        console.log(newSize);
        
        $canvas.width(newSize.width);
        $canvas.height(newSize.height);
        
        var oldDrawing = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = newSize.width;
        canvas.height = newSize.height;
        ctx.putImageData(oldDrawing, 0, 0);
    });

    return {
        exportToImage: exportToImage,
        importFromImage: importFromImage
    };
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var BB = canvas.getBoundingClientRect();
var offsetX = BB.left;
var offsetY = BB.top;
var WIDTH = canvas.width;
var HEIGHT = canvas.height;

var dragok = false;
var startX;
var startY;
var lastX;
var lastY;

var figuri = [];
figuri.push({
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    fill: "blue",
    snapped: false,
    isDragging: false
});
figuri.push({
    x: 85,
    y: 25,
    r: 25,
    fill: "blue",
    snapped: false,
    isDragging: false
});
figuri.push({
    x: 120,
    y: 0,
    width: 50,
    height: 50,
    fill: "red",
    snapped: false,
    isDragging: false
});
figuri.push({
    x: 205,
    y: 25,
    r: 25,
    fill: "red",
    snapped: false,
    isDragging: false
});

canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;

draw();

function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
}

function cerc(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function draw() {
    clear();
    ctx.fillStyle = "#FAF7F8";
    rect(0, 0, WIDTH, HEIGHT);

    for (var i = 0; i < figuri.length; i++) {
        var elem = figuri[i];
        ctx.fillStyle = elem.fill;

        rect(elem.x, elem.y, elem.width, elem.height);
        cerc(elem.x, elem.y, elem.r);
    }
}

function myDown(e) {

    e.preventDefault();
    e.stopPropagation();

    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);

    lastX = mx;
    lastY = my;

    dragok = false;
    for (var i = 0; i < figuri.length; i++) {

        var elem = figuri[i];

        if (mx > elem.x && mx < elem.x + elem.width && my > elem.y && my < elem.y + elem.height) {
            dragok = true;
            elem.isDragging = true;
        }

        var a = Math.abs(mx - elem.x)
        var b = Math.abs(my - elem.y)

        if (Math.sqrt(a * a + b * b) < elem.r) {
            dragok = true;
            elem.isDragging = true;
        }
    }
    startX = mx;
    startY = my;
}

function IntersectieCercPatrat(cerc, patrat) {
    var distX = Math.abs(cerc.x - patrat.x - patrat.width / 2);
    var distY = Math.abs(cerc.y - patrat.y - patrat.height / 2);

    if (distX > (patrat.width / 2 + cerc.r)) {
        return false;
    }
    if (distY > (patrat.height / 2 + cerc.r)) {
        return false;
    }

    if (distX <= (patrat.width / 2)) {
        return true;
    }
    if (distY <= (patrat.height / 2)) {
        return true;
    }

    var dx = distX - patrat.width / 2;
    var dy = distY - patrat.height / 2;
    return (dx * dx + dy * dy <= (cerc.r * cerc.r));
}

function myUp(e) {
    e.preventDefault();
    e.stopPropagation();

    dragok = false;
    for (var i = 0; i < figuri.length; i++) {
        if (i % 2 === 1) {
            if (IntersectieCercPatrat(figuri[i], figuri[i - 1])) {
                figuri[i].snapped = true;
                figuri[i].fill = "white";
                figuri[i].x = figuri[i - 1].x + figuri[i].r;
                figuri[i].y = figuri[i - 1].y + figuri[i].r;
                draw();
            } else if (!figuri[i].snapped && (i === 1 && IntersectieCercPatrat(figuri[i], figuri[i + 1])) || (i === 3 && IntersectieCercPatrat(figuri[i], figuri[0]))) {
                figuri[i].x = lastX;
                figuri[i].y = lastY;
                draw();
            }
        }
        figuri[i].isDragging = false;
    }
}

function myMove(e) {
    if (dragok) {

        e.preventDefault();
        e.stopPropagation();

        var mx = parseInt(e.clientX - offsetX);
        var my = parseInt(e.clientY - offsetY);

        var dx = mx - startX;
        var dy = my - startY;

        for (var i = 0; i < figuri.length; i++) {
            var elem = figuri[i];

            if (elem.isDragging) {
                elem.x += dx;
                elem.y += dy;
            }
            if (elem.snapped) {
                var tata = figuri[i - 1]
                elem.x = tata.x + elem.r;
                elem.y = tata.y + elem.r;
            }
        }

        draw();

        startX = mx;
        startY = my;
    }
}
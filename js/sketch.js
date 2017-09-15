var t = new Tile(0, 0, "");

var zoom;

var mb;

var x, y;

/* === Map Variables ===*/

var m; //Map
var xTiles = 20;
var yTiles = 20;
var tileSize = 50;


function setup() {
    var d = select('#canvas');
    var canvas = createCanvas(sqrt(2) * xTiles * tileSize, yTiles * tileSize);
    canvas.parent(d);

    m = new Map(xTiles, yTiles);
    m.init();

    m.editTile(2, 3, 'city');

    lb = select('#land');
    lb.mouseClicked(function() {
        x = parseInt(select('#xCoord').value());
        y = parseInt(select('#yCoord').value());
        m.editTile(x, y, 'land');
    });

    sb = select('#sea');
    sb.mouseClicked(function() {
        x = parseInt(select('#xCoord').value());
        y = parseInt(select('#yCoord').value());
        m.editTile(x, y, 'sea');
    });

    mb = select('#mtn');
    mb.mouseClicked(function() {
        x = parseInt(select('#xCoord').value());
        y = parseInt(select('#yCoord').value());
        m.editTile(x, y, 'mtn');
    });

    tb = select('#tree');
    tb.mouseClicked(function() {
        x = parseInt(select('#xCoord').value());
        y = parseInt(select('#yCoord').value());
        m.editTile(x, y, 'tree');
    });

    cb = select('#city');
    cb.mouseClicked(function() {
        x = parseInt(select('#xCoord').value());
        y = parseInt(select('#yCoord').value());
        m.editTile(x, y, 'city');
    })
}

// implement tile changing mechanism

function draw() {
    background('#303030');

    ISO();

    m.displayISO();
    /* Display zoom percent
    zoom = (t.s / 100) * 100 + "%";
    text(zoom, width - 100, height - 100);
    */
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        m.editTile(0, 0, 'mtn');
    } else if (keyCode === DOWN_ARROW) {
        t.dec = "land";
    } else if (keyCode === LEFT_ARROW) {
        t.dec = "city";
    } else if (keyCode === RIGHT_ARROW) {
        t.dec = "tree";
    } else if (keyCode === 187 && t.s < 200) {
        zoom(10);
    } else if (keyCode === 189 && t.s > 10) {
        zoom(-10);
    }
}

function zoom(x) {
    for (var i = 0; i < m.mapGrid.length; i++) {
        m.mapGrid[i].s += x;
    }
    tileSize += x;
    resizeCanvas(sqrt(2) * xTiles * tileSize, yTiles * tileSize);
}

function ISO() {
    smooth();

    translate(0, height / 2);
    scale(1, .5);
    rotate(radians(-45));
}
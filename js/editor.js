var canvas;
var parent;

var r;

var btn;
var mtn, tree, city, none, sea;
var alert;
var convert;
var in1;

var selected; // selected could be the integer representing the location of the selected Tile
var div;

var grid;
var gridNum = 20;
var tileSize;

function setup() {

    canvas = createCanvas(500, 500);
    background('#fafafa');
    canvas.parent('canvas');

    alert = select('#alert');

    setupButtons();

    grid = new Array();
    tileSize = width / gridNum;

    for (var i = 0; i < gridNum; i++) {
        for (var j = 0; j < gridNum; j++) {
            grid.push(new Tile(i, j, tileSize));
        }
    }
}

function setupButtons() {
    mtn = select('#mtn');
    mtn.mouseClicked(function() {
        if (grid[selected].isStroke) {
            grid[selected].update("mtn");
        }
    });
    tree = select('#tree');
    tree.mouseClicked(function() {
        if (grid[selected].isStroke) {
            grid[selected].update("tree");
        }
    });
    city = select('#city');
    city.mouseClicked(function() {
        if (grid[selected].isStroke) {
            grid[selected].update("city");
        }
    });
    none = select('#none');
    none.mouseClicked(function() {
        if (grid[selected].isStroke) {
            grid[selected].update("none");
        }
    });
    sea = select('#sea');
    sea.mouseClicked(function() {
        if (grid[selected].isStroke) {
            grid[selected].update("sea");
        }
    });
    convert = select('#convert');
    convert.mouseClicked(function() {
        send();
    });
}

function draw() {
    background('#fafafa');
    displayGrid();
}

function mouseClicked() {
    var x = mouseX,
        y = mouseY;
    if (inCanvas(x, y)) {
        for (var i = 0; i < grid.length; i++) {
            if (grid[i].contains(x, y)) {
                grid[i].isStroke = true;
                selected = i;
            } else {
                grid[i].isStroke = false;
            }
        }
    }
}

function displayGrid() {
    for (var i = 0; i < grid.length; i++) {
        grid[i].display();
    }
}

function inCanvas(xPos, yPos) {
    if (xPos < 0 || xPos > width) {
        return false;
    }
    if (yPos < 0 || yPos > height) {
        return false;
    }
    return true;
}

function send() {
    var xList = new Array();
    var yList = new Array();
    var dList = new Array();
    for (var i = 0; i < grid.length; i++) {
        xList.push(grid[i].x);
        yList.push(grid[i].y);
        dList.push(grid[i].dec);
    }
    sessionStorage.setItem('xList', xList);
    sessionStorage.setItem('yList', yList);
    sessionStorage.setItem('dList', dList);
}

function Tile(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;

    this.dec = 'sea';
    this.color = '#00BCD4';

    this.isStroke = false;

    this.display = function() {
        fill(this.color);
        noStroke();
        if (this.isStroke) {
            stroke('#B3E5FC');
            strokeWeight(2);
        } else {
            //noStroke();
            fill(this.color);
        }
        rect(this.x * this.s, this.y * this.s, this.s, this.s);
    }

    this.update = function(newDec) {
        this.dec = newDec;
        if (this.dec === 'mtn') {
            this.color = '#9E9E9E';
        } else if (this.dec === 'tree') {
            this.color = '#4CAF50';
        } else if (this.dec === 'city') {
            this.color = '#F44336';
        } else if (this.dec === 'none') {
            this.color = '#8BC34A';
        } else if (this.dec === 'sea') {
            this.color = '#00BCD4';
        }
    }

    this.contains = function(xPos, yPos) {
        if (xPos < this.x * this.s || xPos > this.x * this.s + this.s) {
            return false;
        }
        if (yPos < this.y * this.s || yPos > this.y * this.s + this.s) {
            return false;
        }
        return true;
    }

    this.toString = function() {
        return (this.x + ", " + this.y);
    }
}
var canvas; // Canvas Object
var system; // Map Object
var gridLines; // GridOverlay Object
var s; // Integer representing side length of Tiles
var centerX, centerY; // Integers used to find center of Canvas

// === Color Variables ===
var backgroundColor = '#f5f5f5'; // background color of the canvas
var grassColor; // color of grass
var waterColor; // color of water
var mtnColor1; // color of left side of mountain
var mtnColor2; // color of right side of mountain
var treeColor1; // color of left side of tree
var treeColor2; // color of right side of tree
var towerColor1; // color of left side of tower
var towerColor2; // color of right side of tower
var towerColor3; // color of the top of the tower
var towerColor4; // color of the flagpole of the tower
// =======================

function setup() {
    // Create the Canvas
    canvas = createCanvas(windowWidth, windowHeight);

    // Define Canvas specific methods
    centerX = width / 2;
    centerY = height / 2;

    // Define s - the side length of each tile in the map
    s = 50;

    // Define the Map
    system = new Map();

    var xList = sessionStorage.getItem('xList');
    var yList = sessionStorage.getItem('yList');
    var dList = sessionStorage.getItem('dList');

    for (var i = 0; i < xList.length; i++) {
        system.add(new Tile(
            xList[i],
            yList[i],
            s,
            dList[i]
        ));
    }

    system.sort();

    // Define the GridOverlay
    gridLines = new GridOverlay();
};

function draw() {
    // Add background color to canvas
    background(backgroundColor);
    smooth();

    // Implement translation from Normal perspective to Isometric perspective
    translate(0, height / 2);
    scale(1, .5);
    rotate(radians(-45));

    // Display Grid and Map
    //gridLines.display();
    system.display();
};

// basic idea for zoom function to be added later
function mouseClicked() {
    if (s > 20) {
        s -= 10;
    }
}

// ===== GridOverlay Object =====
/**
 * Object that creates a grid overlay on the canvas
 * 
 * @param none
 */
function GridOverlay() {
    this.color = color('#E0E0E0');
}

GridOverlay.prototype.display = function() {
    stroke(this.color);
    strokeWeight(1);
    for (var i = -2 * width; i <= 2 * width; i += s) {
        line(i, -2 * height, i, 2 * height);
    }
    for (var j = -2 * height; j <= 2 * height; j += s) {
        line(-2 * width, j, 2 * width, j);
    }
};

//===== Map Object =====
/**
 * Object that creates an Array that houses all 
 * the Tiles that form the map
 *
 *  @param none
 */
function Map() {
    this.grid = new Array();
};
/**
 * Add function
 * 
 * Function which adds a new tile to the map
 * and then sorts it according to custom sort
 * fucntion
 */
Map.prototype.add = function(newTile) {
    this.grid.push(newTile);
    this.sort();
};

/** 
 * Display Function
 * 
 * Function which runs through the grid Array
 * and 
 */
Map.prototype.display = function() {
    noStroke();
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i].display();
    }
};

/**
 * Sort Function
 * 
 * Function which sorts the map's grid array according
 * to a special order:
 * Highest xPos -> Lowest xPos, then Highest yPos -> Lowest yPos
 */
Map.prototype.sort = function() {
    this.grid.sort(function(a, b) {
        if (b.xPos > a.xPos) {
            return 1;
        }
        if (b.xPos < a.xPos) {
            return -1;
        }
        if (b.yPos < a.yPos) {
            return 1;
        }
        if (b.yPos > a.yPos) {
            return -1;
        }
        return 0;
    });
};

/**
 * Update Function
 * 
 * Function used to update the map's grid array
 * and then display it.
 */
Map.prototype.update = function() {
    this.sort();
    this.display();
};

//===== Tile Object =====
/**
 * Object that represents one tile on the map
 * 
 * @param xPos - the x position of the map relative to the grid
 *             - multiplied by size to get actual x position on canvas
 * @param yPos - the y position of the map relative to the grid
 *             - multiplied by size to get actual y position on canvas
 * @param size - the side length of the Tile
 * @param decoration - string that determines what decoration (if any)
 *                      is on the Tile.  Can be any of the following
 *                      - "mtn"  > Mountain
 *                      - "tree" > Forest
 *                      - "city" > City
 *                      - "none" > No decoration
 *                      -  all other values default to none
 *                      
 */
function Tile(xPos, yPos, size, decoration) {
    this.xPos = xPos * size;
    this.yPos = yPos * size;
    this.size = size;
    this.decoration = decoration;
};

/**
 * Default function
 * 
 * Displays a basic tile with no decoration
 */
Tile.prototype.default = function() {
    fill('#9CCC65');
    quad(
        this.xPos, this.yPos,
        this.xPos + this.size, this.yPos,
        this.xPos + this.size, this.yPos + this.size,
        this.xPos, this.yPos + this.size
    );
};

/**
 * Display function
 * 
 * Displays the tile based on the value of decoration
 */
Tile.prototype.display = function() {
    if (this.decoration === "mtn") {
        var m = new Mountain(this.xPos, this.yPos, this.size);
        m.display();
    } else if (this.decoration === "tree") {
        var t = new Forest(this.xPos, this.yPos, this.size);
        t.display();
    } else if (this.decoration === "city") {
        this.default();
        var c = new City(this.xPos, this.yPos, this.size);
        c.display();
    } else if (this.decoration === "sea") {
        var s = new Sea(this.xPos, this.yPos, this.size);
        s.display();
    } else {
        this.default();
    }
};

//===== Mountain Object =====
/**
 * Mountain Object
 * 
 * Object which represents a mountain on a Tile
 * 
 * @param xPos - the x position of the Tile on the canvas
 * @param yPos - the y position of the Tile on the canvas
 * @param size - the side length of the Tile
 */
function Mountain(xPos, yPos, size) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
};

/**
 * Display function
 * 
 * Function which displays the mountain as two triangles
 */
Mountain.prototype.display = function() {
    fill('#BDBDBD');
    triangle(
        this.xPos, this.yPos,
        this.xPos + 5 * this.size / 2, this.yPos - 3 * this.size / 2,
        this.xPos, this.yPos + this.size
    );
    fill('#9E9E9E');
    triangle(
        this.xPos + this.size, this.yPos + this.size,
        this.xPos + 5 * this.size / 2, this.yPos - 3 * this.size / 2,
        this.xPos, this.yPos + this.size
    );
};

// ===== Forest Object =====
/**
 * Object which represents a forest on a Tile
 * 
 * @param xPos - the x position of the Tile on the canvas
 * @param yPos - the y position of the Tile on the canvas
 * @param size - the side length of the Tile
 *  
 */
function Forest(xPos, yPos, size) {
    this.num = 5; // the number of trees on the tile
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.base = size / this.num; // 
};

/**
 * One Function
 * 
 * One function which draws a single tree as two triangles
 */
Forest.prototype.one = function(xPos, yPos) {
    fill('#66BB6A');
    triangle(
        xPos, yPos,
        xPos + 5 * this.base / 2, yPos - 3 * this.base / 2,
        xPos, yPos + this.base
    );
    fill('#4CAF50');
    triangle(
        xPos + this.base, yPos + this.base,
        xPos + 5 * this.base / 2, yPos - 3 * this.base / 2,
        xPos, yPos + this.base
    );
};

/**
 * Display Function
 * 
 * Function which generates and displays grid of trees on the tile
 */
Forest.prototype.display = function() {
    for (var i = this.num; i > 0; i--) {
        for (var j = 0; j < this.num; j++) {
            this.one(this.xPos + (i - 1) * this.base, this.yPos + j * this.base);
        }
    }
};

// ===== City Object =====
/**
 * Object which represents a city on a map as a tower with a flag
 * 
 * @param xPos - the x position of the Tile on the canvas
 * @param yPos - the y position of the Tile on the canvas
 * @param size - the side length of the Tile 
 */
function City(xPos, yPos, size) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
};

/**
 * Display Function
 * 
 * Function which displays the tower on the tile
 */
City.prototype.display = function() {
    fill('#BDBDBD');
    quad(
        this.xPos + 3 / 8 * this.size, this.yPos + 3 / 8 * this.size,
        this.xPos + 3 / 8 * this.size, this.yPos + 5 / 8 * this.size,
        this.xPos + 7 / 8 * this.size, this.yPos + 1 / 8 * this.size,
        this.xPos + 7 / 8 * this.size, this.yPos - 1 / 8 * this.size
    );
    fill('#9E9E9E');
    quad(
        this.xPos + 5 / 8 * this.size, this.yPos + 5 / 8 * this.size,
        this.xPos + 3 / 8 * this.size, this.yPos + 5 / 8 * this.size,
        this.xPos + 7 / 8 * this.size, this.yPos + 1 / 8 * this.size,
        this.xPos + 9 / 8 * this.size, this.yPos + 1 / 8 * this.size
    );
    fill('#E0E0E0');
    quad(
        this.xPos + 7 / 8 * this.size, this.yPos - 1 / 8 * this.size,
        this.xPos + 7 / 8 * this.size, this.yPos + 1 / 8 * this.size,
        this.xPos + 9 / 8 * this.size, this.yPos + 1 / 8 * this.size,
        this.xPos + 9 / 8 * this.size, this.yPos - 1 / 8 * this.size
    );
    fill('#FF5722');
    triangle(
        this.xPos + 10 / 8 * this.size, this.yPos - 2 / 8 * this.size,
        this.xPos + 9 / 8 * this.size, this.yPos - 1 / 8 * this.size,
        this.xPos + 23 / 16 * this.size, this.yPos - 3 / 16 * this.size
    );
    stroke('#795548');
    strokeWeight(1.125);
    line(
        this.xPos + 8 / 8 * this.size, this.yPos - 0 / 8 * this.size,
        this.xPos + 10 / 8 * this.size, this.yPos - 2 / 8 * this.size
    );
    noStroke();
};

function Sea(xPos, yPos, size) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
};

Sea.prototype.display = function() {
    fill('#00BCD4');
    quad(
        this.xPos, this.yPos,
        this.xPos + this.size, this.yPos,
        this.xPos + this.size, this.yPos + this.size,
        this.xPos, this.yPos + this.size
    );
}
/**
 * ===== Map JS =====
 * 
 * Javascript Object which represents a map comprised of
 * a grid of Tile Objects
 * The map has 2 variables which are passed into the Object
 * through parameters
 * 
 *      mapWidth    ->      The number of Tiles that make up the horizontal direction
 *      mapHeight   ->      The number of Tiles that make up the vertical direction
 * 
 * The Map Object also contains several methods which enable the editing of specific tiles, 
 * as well as sorting the the various tiles
 */

function Map(mapWidth, mapHeight) {

    // === parameters ===
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;

    // === constants ===
    this.mapGrid = new Array();

    this.init = function() {
        for (var i = 0; i < this.mapHeight; i++) {
            for (var j = 0; j < this.mapWidth; j++) {
                this.mapGrid.push(new Tile(i, j, 'sea'));
            }
        }
        this.mapGrid.sort(function(a, b) {
            if (b.x > a.x) {
                return 1;
            }
            if (b.x < a.x) {
                return -1;
            }
            if (b.y < a.y) {
                return 1;
            }
            if (b.y > a.y) {
                return -1;
            }
            return 0;
        });
    }

    this.editTile = function(x, y, newDec) {
        for (var i = 0; i < this.mapGrid.length; i++) {
            if (this.mapGrid[i].x === x && this.mapGrid[i].y === y) {
                this.mapGrid[i].dec = newDec;
                return true;
            }
        }
        return false;
    }

    this.display2D = function() {
        for (var i = 0; i < this.mapGrid.length; i++) {
            this.mapGrid[i].display2D();
        }
    }

    this.displayISO = function() {
        for (var i = 0; i < this.mapGrid.length; i++) {
            this.mapGrid[i].displayISO();
        }
    }
}
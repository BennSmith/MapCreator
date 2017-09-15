/**
 * ===== Tile JS =====
 * 
 * Javascript Object that represents a single tile on the map
 * The tile has 3 variables whose values are passed into the Object
 * through parameters
 * 
 *      x    ->      The x coordinate of the tile in the map grid
 *      yPos    ->      The y coordinate of the tile in the map grid
 *      dec     ->      String that determines the type of tile that is drawn
 * 
 * In addition the Tile Object also has several constants
 * 
 *      size    ->      The size of each side of the tile
 *      color   ->      The default color of a tile
 * 
 * The Object also contains methods that display the Tile in 2D or
 * in an Isometric Projection
 */

function Tile(x, y, dec) {

    // === parameters ===
    this.x = x;
    this.y = y;
    this.dec = dec;

    // === constants ===
    this.s = 50;
    this.color2D = '#8bc34a';


    /**
     * ===== 2D Projection =====
     * The following methods assist in displaying the Tile in
     * a 2 Dimensional Projection
     */
    this.display2D = function() {
        noStroke();
        if (this.dec === 'mtn') {
            fill('#BDBDBD');
        } else
        if (this.dec === 'tree') {
            fill('#81c784');
        } else if (this.dec === 'city') {
            fill('#EF5350');
        } else if (this.dec === 'land') {
            fill('#aed581');
        } else if (this.dec === 'sea') {
            fill('#26C6DA');
        } else {
            fill('#000000');
        }
        rect(this.x * this.s, this.y * this.s, this.s, this.s);
    }

    /**
     * ===== Isometric Projection =====
     * 
     * The following methods assist in displaying the Tile in
     * an Isometric Projection
     */
    this.displayISO = function() {
        noStroke();
        if (this.dec === 'mtn') {
            this.mtnISO();
        } else if (this.dec === 'tree') {
            this.treeISO();
        } else if (this.dec === 'city') {
            this.landISO();
            this.cityISO();
        } else if (this.dec === 'land') {
            this.landISO();
        } else if (this.dec === 'sea') {
            this.seaISO();
        } else {

        }
    }

    /**
     * === mtnISO ===
     * 
     * Function which displays a mountain tile in an Isometric Projection
     */
    this.mtnISO = function() {
        fill('#BDBDBD');
        triangle(
            this.x * this.s, this.y * this.s,
            this.x * this.s + 5 * this.s / 2, this.y * this.s - 3 * this.s / 2,
            this.x * this.s, this.y * this.s + this.s
        );
        fill('#9E9E9E');
        triangle(
            this.x * this.s + this.s, this.y * this.s + this.s,
            this.x * this.s + 5 * this.s / 2, this.y * this.s - 3 * this.s / 2,
            this.x * this.s, this.y * this.s + this.s
        );
    }

    /**
     * === treeISO ===
     * 
     * Function which displays a forest tile in an Isometric Projection
     */
    this.treeISO = function() {
        var b = this.s / 4;
        for (var i = 4; i > 0; i--) {
            for (var j = 0; j < 4; j++) {
                this.oneISO(this.x * this.s + (i - 1) * b, this.y * this.s + j * b, b);
            }
        }
    }

    /**
     * == oneISO ==
     * 
     * Helper function for treeISO which displays on isometric tree
     */
    this.oneISO = function(x, y, b) {
        fill('#66BB6A');
        triangle(
            x, y,
            x + 5 * b / 2, y - 3 * b / 2,
            x, y + b
        );
        fill('#4CAF50');
        triangle(
            x + b, y + b,
            x + 5 * b / 2, y - 3 * b / 2,
            x, y + b
        );
    }

    /**
     * === cityISO ===
     * 
     * Function which displays a city tile in an Isometric Projection
     * 
     *      note to self:  In v2 - add walls
     */
    this.cityISO = function() {
        fill('#BDBDBD');
        quad(
            this.x * this.s + 3 / 8 * this.s, this.y * this.s + 3 / 8 * this.s,
            this.x * this.s + 3 / 8 * this.s, this.y * this.s + 5 / 8 * this.s,
            this.x * this.s + 7 / 8 * this.s, this.y * this.s + 1 / 8 * this.s,
            this.x * this.s + 7 / 8 * this.s, this.y * this.s - 1 / 8 * this.s
        );
        fill('#9E9E9E');
        quad(
            this.x * this.s + 5 / 8 * this.s, this.y * this.s + 5 / 8 * this.s,
            this.x * this.s + 3 / 8 * this.s, this.y * this.s + 5 / 8 * this.s,
            this.x * this.s + 7 / 8 * this.s, this.y * this.s + 1 / 8 * this.s,
            this.x * this.s + 9 / 8 * this.s, this.y * this.s + 1 / 8 * this.s
        );
        fill('#E0E0E0');
        quad(
            this.x * this.s + 7 / 8 * this.s, this.y * this.s - 1 / 8 * this.s,
            this.x * this.s + 7 / 8 * this.s, this.y * this.s + 1 / 8 * this.s,
            this.x * this.s + 9 / 8 * this.s, this.y * this.s + 1 / 8 * this.s,
            this.x * this.s + 9 / 8 * this.s, this.y * this.s - 1 / 8 * this.s
        );
        fill('#FF5722');
        triangle(
            this.x * this.s + 10 / 8 * this.s, this.y * this.s - 2 / 8 * this.s,
            this.x * this.s + 9 / 8 * this.s, this.y * this.s - 1 / 8 * this.s,
            this.x * this.s + 11 / 8 * this.s, this.y * this.s - 1 / 8 * this.s
        );
        stroke('#795548');
        strokeWeight(1.125);
        line(
            this.x * this.s + 8 / 8 * this.s, this.y * this.s - 0 / 8 * this.s,
            this.x * this.s + 10 / 8 * this.s, this.y * this.s - 2 / 8 * this.s
        );
        noStroke();
    }

    /**
     * === landISO ===
     * 
     * Function which displays a land tile in Isometric Projection
     */
    this.landISO = function() {
        fill('#9CCC65');
        rect((this.x * this.s), (this.y * this.s), this.s, this.s);
    }

    /**
     * === seaISO ===
     * 
     * Function which displays a sea tile in Isometric Projection
     */
    this.seaISO = function() {
        fill('#00BCD4');
        rect((this.x * this.s), (this.y * this.s), this.s, this.s);
    }
}
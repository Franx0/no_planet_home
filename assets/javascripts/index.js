var game = new Phaser.Game(1200, 720, Phaser.CANVAS);

var SHIP_IMAGE = "space_ship";

//DEFAULT PLANET PROPERTIES
var planet = { 
  jupiter: {
    cord_x: 800,
    cord_y: 200,
    image: 'jupiter_planet',
    radius: 1/5,
    gravity: 100
  },
  mars: {
    cord_x: 250,
    cord_y: 250,
    image: 'mars_planet',
    radius: 1/10,
    gravity: 50
  }
};

var images = [
  SHIP_IMAGE,
  planet.mars.image,
  planet.jupiter.image
];

var initialState = {
  preload: function() {
    var ship;
    loadImages(images);
  },

  create: function() {
    game.stage.scale.pageAlignHorizontally = true;
    game.stage.scale.pageAlignVertically = true;

    this.cursors = game.input.keyboard.createCursorKeys();

    this.planets = this.add_planets([planet.mars, planet.jupiter]);
    this.ship = game.add.sprite(100, 360, SHIP_IMAGE);
    
    //  Enable p2 physics
    this.game.physics.startSystem(Phaser.Physics.P2JS);
  },

  update: function() {
    this.game.physics.p2.enable(this.ship);

    // Ship sprite properties
    this.ship.scale.setTo(1/10, 1/10);
    this.ship.body.angle = 45;
    this.ship.body.velocity.x = 100;
  },

  add_planets: function(planets) {
    var sprite = [];

    planets.forEach(function(planet, index){
      sprite[index] = game.add.sprite(planet.cord_x, planet.cord_y, planet.image);
      sprite[index].scale.setTo(planet.radius, planet.radius);
    });

    //set physics
    //http://phaser.io/examples/v2/p2-physics/accelerate-to-object
    return sprite;
  }
}

//LOAD IMAGES
function loadImages(images) {
  images.forEach(function(image){
    game.load.image(image, 'assets/images/' + image + '.png');
  });
}

game.state.add('play', initialState);
game.state.start('play');
var game = new Phaser.Game(1200, 720, Phaser.CANVAS);

var SHIP = "space_ship";

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
    cord_x: 100,
    cord_y: 450,
    image: 'mars_planet',
    radius: 1/10,
    gravity: 50
  }
};

var initialState = {
  preload: function() {
    loadImage(SHIP);
    loadImage(planet.mars.image);
    loadImage(planet.jupiter.image);
  },

  create: function() {
    var initial_planets = [planet.mars, planet.jupiter];
    //ADD PLANETS
    add_planets(initial_planets);
  }
}

function loadImage(image) {
  game.load.image(image, 'assets/images/' + image + '.png');
}

//ADD PLANETS
function add_planets(planets){
  planets.forEach(function(planet){
    var sprite = game.add.sprite(planet.cord_x, planet.cord_y, planet.image);
    sprite.scale.setTo(planet.radius, planet.radius);
  });
};

game.state.add('play', initialState);
game.state.start('play');
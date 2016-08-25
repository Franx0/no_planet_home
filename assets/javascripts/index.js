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

    cursors = game.input.keyboard.createCursorKeys();
    
    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);

    var speed;
    var iplanet = add_planets([planet.mars, planet.jupiter]);;
    ship = game.add.sprite(100, 360, SHIP_IMAGE);
    
    game.physics.p2.enable(ship);
    game.physics.p2.enable(iplanet);

    ship.scale.setTo(1/10, 1/10);

    //ADD PLANETS
    //add_planets(iplanet);

    if (distanceBetween(ship, iplanet) < 300) { 
      speed = 30;   
    }else if (distanceBetween(ship, iplanet) < 600) { 
      speed = 20; 
    }else if (distanceBetween(ship, iplanet) < 900) { 
      speed = 10;  
    };

    accelerateToObject(ship, iplanet, speed);
  },

  update: function() {
    ship.body.velocity.x = 0;
    ship.body.velocity.y = 0;

    //  This checks if the up or down keys are pressed and moves the camera accordingly.
    if (cursors.down.isDown) {
      ship.body.reverse(Math.pow(10, 4));
    } else if (cursors.up.isDown) {
      ship.body.thrust(Math.pow(10, 4));
    };

    if (cursors.left.isDown) {
      ship.body.rotateRight(200);
    } else if (cursors.right.isDown) {
      ship.body.rotateLeft(200);
    } else {
      ship.body.setZeroRotation();
    };
  }
}

//LOAD IMAGES
function loadImages(images) {
  images.forEach(function(image){
    game.load.image(image, 'assets/images/' + image + '.png');
  });
}

//ADD PLANETS
function add_planets(planets){
  var sprite;

  planets.forEach(function(planet){
    sprite = game.add.sprite(planet.cord_x, planet.cord_y, planet.image);
    sprite.scale.setTo(planet.radius, planet.radius);
  });


  return sprite;
};

function distanceBetween(spriteA, spriteB){    
  var dx = spriteA.body.x - spriteB.body.x;  
  //distance ship X to planet X    
  var dy = spriteA.body.y - spriteB.body.y;  
  //distance ship Y to planet Y    
  var dist = Math.sqrt(dx*dx + dy*dy);     
  //pythagoras ^^  (get the distance to each other)    
  return dist;
};

function accelerateToObject(obj1, obj2, speed) {    
  if (typeof speed === 'undefined') { 
    speed = 20;  
  }  

  var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);    

  obj1.body.rotation = angle + game.math.degToRad(180);  
  // correct angle if wanted    
  obj1.body.force.x = Math.cos(angle) * speed;    
  // accelerateToObject    
  obj1.body.force.y = Math.sin(angle) * speed;
};


game.state.add('play', initialState);
game.state.start('play');
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var gameState = "Play";

var bgImg;
var scoreImg;

var dart1;
var target1, target2, target3;
var slingy;
var wall;
var edge1, edge2, edge3, edge4;

var birdAnim, bird;

var dartS;

var score = 0;

function preload() {

    bgImg = loadImage("Design/bg.jpg");
    scoreImg = loadImage("Design/Score.png");

    birdAnim = loadAnimation("Design/bird_1.png", "Design/bird_2.png", "Design/bird_1.png");

    dartS = loadSound("Design/dartSound.mp3");
}

function setup() {
    createCanvas(displayWidth, displayHeight-111);

    engine = Engine.create();
    world = engine.world;

    edge1 = new Ground(0, 1536/2, 5, 1536);
    edge2 = new Ground(1536, 1536/2, 5, 1536);
    edge3 = new Ground(1536/2, 0, 1536, 5);
    edge4 = new Ground(1536/2, 753, 1536, 5);

    dart1 = new Dart(400, 450);

    slingy = new SlingShot(dart1.body, {x:400, y:450})

}


function draw() {

    if (gameState === "Play") {

    background(bgImg);

    Engine.update(engine);

    image(scoreImg, 30, 20);

    fill(0);
    textFont("Comic Sans MS");
    textSize(60);
    text(+score, 280, 94);

    drawTargets();

    spawnBirds();

    drawSprites();

    edge1.display();
    edge2.display();
    edge3.display();
    edge4.display();

    slingy.display();
    dart1.display();

    if (dart1.body.position.x > 1200) {
        Matter.Body.setPosition(dart1.body, {x: 400, y: 450});
        slingy.attach(dart1.body);
    }

    if (dart1.body.position.x > 1170 && dart1.body.position.y > 180 && dart1.body.position.y < 660) {
        dartS.play();
    }

    if (dart1.body.position.x > 1150 && dart1.body.position.y > 200 && dart1.body.position.y < 290) {
       score+= 50;
    }
    if (dart1.body.position.x > 1150 && dart1.body.position.y > 570 && dart1.body.position.y < 650) {
        score+= 50;
     }

    if (dart1.body.position.x > 1150 && dart1.body.position.y > 290 && dart1.body.position.y < 370) {
        score+= 100;
     }
     if (dart1.body.position.x > 1150 && dart1.body.position.y > 490 && dart1.body.position.y < 570) {
        score+= 100;
     }

     if (dart1.body.position.x > 1150 && dart1.body.position.y > 370 && dart1.body.position.y < 490) {
        score+= 200;

     }

}

}

function drawTargets() {
    target1 = createSprite(1200, 430);

    target1.draw = function() { 
        fill("#CC0000");
        ellipse(0,0,400,450) 
    };

    target2 = createSprite(1200, 430);

    target2.draw = function() { 
        fill(255);
        ellipse(0,0, 250,280) 
    };

    target3 = createSprite(1200, 430);

    target3.draw = function() { 
        fill("#CC0000");
        ellipse(0,0,100,120) 
    };
}

function mouseDragged(){
    Matter.Body.setPosition(dart1.body, {x: mouseX , y: mouseY});
  }
  
  function mouseReleased(){
    slingy.fly();
  }

  function keyPressed() {
      if (keyCode === 32) {
        Matter.Body.setPosition(dart1.body, {x: 400, y: 450});
        slingy.attach(dart1.body);
      }
  }

function spawnBirds() {

    if (frameCount % 130 === 0) {
        bird = createSprite(displayWidth, random(100, 170), 20, 20);
        bird.addAnimation("bird_flying", birdAnim);
        bird.scale = (0.7);
        bird.velocityX = random(-8, -10);
    }
}
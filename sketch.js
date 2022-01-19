var p = [];
var G = 9.81;

function setup() {
  createCanvas(windowWidth, windowHeight); 
} 

function draw() {
  background(0, 20);
  if (mouseIsPressed) {
    p[p.length-1].m += 1;
    p[p.length-1].pos.set(mouseX, mouseY);
    p[p.length-1].drag();
  }
  for (var i = 0; i <= p.length -1; i++) {
    p[i].display();
    if (p[i].physics) {
      p[i].update();
      p[i].edges();
      for (var j = 0; j <= p.length -1; j++) {
        if (i != j && p[j].physics) {
          p[i].isAttracted(p[j]);
        }
      }
    }
  }
}

function mousePressed() {
  p.push(new Planet());
}

function mouseReleased() {
  p[p.length-1].physics = true;
}
function Planet() {
  this.physics = false;
  this.m = 0;
  this.vel = createVector(0, 0);
  this.pos = createVector(mouseX, mouseY);
  this.prev = createVector(mouseX, mouseY);
  this.force = createVector(0, 0);
  this.c = random(360);
 
  this.display = function() {
    noStroke();
    fill(this.c, 300, 200);
    if (this.physics) {
      ellipse(this.pos.x, this.pos.y, pow(10000*this.m/4.2, 1/3));
    } else {
      ellipse(mouseX, mouseY, pow(10000*this.m/4.2, 1/3));
    }
  }
  
  this.update = function() {
    this.force.div(this.m);
    this.vel.add(this.force);
    this.pos.add(this.vel);
    this.force.mult(0);
  }
  
  this.isAttracted = function(a) {
    this.f = p5.Vector.sub(a.pos, this.pos);
    this.d = this.f.magSq();
    this.f.normalize();
    this.f.mult(G * this.m * a.m / this.d);
    this.f.normalize();
    this.force.add(this.f);
  }
  
  this.edges = function() {
    if (this.pos.x >=  width || this.pos.x <= 0) {this.vel.x = -this.vel.x;}
    if (this.pos.y >= height || this.pos.y <= 0) {this.vel.y = -this.vel.y;}
  }
  
  this.drag = function() {
    this.vel = p5.Vector.sub(this.pos, this.prev);
    this.prev = this.pos.copy();
    this.vel.mult(0.2);
  }
}
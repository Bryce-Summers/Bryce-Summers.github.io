var scene;

var room_w;
var room_h;
var unit;

function setup() {
  room_w = 832;	
  room_h = 640;
  sorting_w = 800;
  unit = 64;
  
  createCanvas(room_w, room_h);
 
  scene = new StationScene();
  
  //noLoop();
}

function draw()
{
	scene.update();
	scene.draw();
}


function keyPressed()
{
  if (keyCode === RIGHT_ARROW)
  {

  }
  
  redraw();
}
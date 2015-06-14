var scene;

var room_w;
var room_h;
var text_x;
var text_y;

// pages : Page[];
var pages;
// int, an index into the pages array.
var current_page;

var backgrounds;

// Proload all of the images.
function preload()
{
	backgrounds = [];
	backgrounds.push(loadImage("./images/image0.png"));
	backgrounds.push(loadImage("./images/image1.png"));
	backgrounds.push(loadImage("./images/image2.png"));
	
}

function setup() {
  room_w = 800;	
  room_h = 800;
  
  unit = 64;
  
  createCanvas(room_w, room_h);
  
  createPages();
 
  noLoop();
}

function createPages()
{
	pages = [];
	current_page = 0;
	pages.push(createPage(backgrounds[0]));
}

// int*int*int --> Page
function createPage(background)
{	
		
	var sprites = [];
	
	// A Particular Sprite.
	var spr = new Sprite(rectImage(20, 20, 255, 0, 0), 50, 50);
	sprites.push(spr);
	
	return new Page(background, sprites);
}

// width, height, red, green, blue.
// int*int*int*int*int --> p5JS Image
function rectImage(w, h, r, g, b)
{
	var img = createImage(w, h);
	img.loadPixels();
	for (i = 0; i < img.width; i++) {
	for (j = 0; j < img.height; j++) {
		img.set(i, j, color(r, g, b));
	}
	}
	img.updatePixels();
	return img;
}

// void root of the drawing system.
function draw()
{
	pages[current_page].draw();
}

// Root of the keyPressed system.
function keyPressed()
{
  if (keyCode === RIGHT_ARROW)
  {

  }
  
  if (keyCode === LEFT_ARROW)
  {

  }
  
  redraw();
}
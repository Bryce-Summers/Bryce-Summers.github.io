var scene;

var room_w;
var room_h;
var text_x;
var text_y;

// pages : Page[];
var pages;
// int, an index into the pages array.
var current_page;

// p5Image[].
var backgrounds;

var button_next;
var button_prev;

// Proload all of the images.
function preload()
{
	backgrounds = [];
	
	
	backgrounds.push(loadImage("./images/image0.png"));
	backgrounds.push(loadImage("./images/image1.png"));
	backgrounds.push(loadImage("./images/image2.png"));
	backgrounds.push(loadImage("./images/image3.png"));
	backgrounds.push(loadImage("./images/image4.png"));
	backgrounds.push(loadImage("./images/image5.png"));
	backgrounds.push(loadImage("./images/image6.png"));
	backgrounds.push(loadImage("./images/image7.png"));
	backgrounds.push(loadImage("./images/image8.png"));
	
	/*
	var len = 5;
	for(var i = 0; i < len; i++)
	{
		backgrounds.push(rectImage(45, 45, i*255/len, 0, 0));
	}
	//*/
}

function setup() {
	room_w = 800;	
	room_h = 800;
  
	unit = 64;
  
	createCanvas(room_w, room_h);
  
	createPages();
 
	// -- Navigation Buttons.
	button_next = createButton('Next Page');
	button_next.position(room_w, room_h);
	button_next.mousePressed(nextPage);
	
	button_prev = createButton('Previous Page');
	button_prev.position(0, room_h);
	button_prev.mousePressed(prevPage);
	 
	noLoop();
}

function createPages()
{
	pages = [];
	current_page = 0;
	
	var len = backgrounds.length;
	for(var i = 0; i < len; i++)
	{
		pages.push(createPage(backgrounds[i]));
	}
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
		nextPage();
	}
	
	if (keyCode === LEFT_ARROW)
	{
		prevPage();
	}
  
  redraw();
}

function nextPage()
{
	current_page = (current_page + 1) % pages.length;
	redraw();
}

function prevPage()
{
	current_page = (current_page + pages.length - 1) % pages.length;
	redraw();
}
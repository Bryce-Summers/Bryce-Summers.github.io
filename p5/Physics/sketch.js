/*
 * Physics Pedegogical Web App entry point.
 */
 
// Current room.
var room;
var rooms = [];
var room_w;
var room_h;

// The specification for all of the rooms.
var spec;

// Game Specific Variables.

//var info_circles = new List();

function preload()
{
  /*
  data_names = loadStrings('data/names.txt');
  data_goals = loadStrings('data/goals.txt');
  */

  sphere_image = loadImage("sphere.png");

}

function setup() {


  room_w = window.innerWidth - 1;
  room_h = window.innerHeight - 1;

  view_x = 0;
  view_y = 0;


  // We route to specific 'fake' pages by parsing the URL's hash value:
  // "/index.html#energy" --> "energy"
  // The substring function removes the '#' symbol.
  var page = window.location.hash.substring(1);
  console.log("The Page's hash is: " + page);
  
  createCanvas(room_w*23/24 + 4, room_h*3/4 + 4);
 
  room = new Room(0);
      
  button = new gui_Button(room_w/2 - 100, room_h/2-20, 200, 40);
  button.setMouseAction(noop);
  button.message = "TEST";
  
  room.addButtonOBJ(button);
  
  /*
  button = createButton('Previous Station');
  button.position(room_w, 530);
  button.mousePressed(prevStation);
  */
  
  // Create all of the content rooms.
  spec = new room_specifications();
  spec.setup();

  // We could potentially optimize the drawing by disabling looping.
  //noLoop();

  // Goto a specific 'fake' room if the user supplied a hash in their url.
  // Page is a string.
  if(page)
  {
	// spec.rooms is an associative array that converts from string names to room objects.
	room.goto(spec.rooms[page]);
  }

}

// A bogus function that is here for the time being. It doesn't do anything.
function noop()
{

}

function draw()
{
	// Clear the screen to white.
	fill(255); // White.
	rect(0, 0, room_w, room_h);

	// Update and handle the room's visual.
	if(room.show_visual && room.visual)
	{
		room.visual.update();
		
		// Bounds conform to the specification.
		room.visual.draw(room_w/24, room_h/4, room_w*23/25, room_h/2);
	}	
	
	room.update();
	room.draw();
	
}

// int * int * boolean --> void.
function addCircle(x, y, isGood)
{
	info_circles.enq(new CircleFloat(x, y, isGood, 10));
}

function mousePressed()
{
	if(room)
	{
		room.mousePressed();
		
		// Send mouse pressed events to the visuals.
		if(room.visual)
		{
			if(room.visual.mousePressed)
			{
				room.visual.mousePressed();
			}
		}
	}
}

function mouseReleased()
{
	if(room)
	{	
		room.mouseReleased();
	}
	
	// Send mouse pressed events to the visuals.
	if(room.visual)
	{
		if(room.visual.mouseReleased)
		{
			room.visual.mouseReleased();
		}
	}
}

function keyPressed()
{
  if (keyCode === RIGHT_ARROW)
  {

  }
  
  redraw();
}


/*
 * Subway Game entry point.
 *
 */

var scene;

var room_w;
var room_h;
var unit;

// Needs to be at least 2;
var station_count = 10;

var info_circles = new List();

var current_person = null;

var data_names;
var data_goals;
var description;

function preload()
{
  data_names = loadStrings('data/names.txt');
}

function setup() {
  room_w = 832;	
  room_h = 640;
  sorting_w = 800;
  unit = 64;
  
  createCanvas(room_w, room_h);
 
  scene = new Station(0);
  
  // Form the loop of stations.
  var station = scene;
  for(var i = 1; i < station_count; i++)
  {
	  var station_next = new Station(i);
	  station.nextStation = station_next;
	  station_next.prevStation = station;
	  station = station_next;
  }
  
  station.nextStation = scene;
  scene.prevStation   = station;

  
  var button = createButton('Next Station');
  button.position(room_w, 500);
  button.mousePressed(nextStation);
  
  /*
  button = createButton('Previous Station');
  button.position(room_w, 530);
  button.mousePressed(prevStation);
  */
  
  //noLoop();
  
}

function nextStation()
{
	scene = scene.nextStation;
}

function prevStation()
{
	scene = scene.prevStation;
}

function draw()
{
	fill(255); // White.
	rect(0, 0, room_w, room_h);
	scene.update();
	scene.draw();
	
	// Draw and handle info circles.
	var iter = info_circles.iterator();
	
	// Draw decorative info circles.
	while(iter.hasNext())
	{
		var circle = iter.next();

		circle.draw();
		if(circle.done())
		{
			iter.remove();
		}
		
	}
	
	// Draw information about the selected person.
	if(current_person !== null)
	{
		textSize(20);
		var text_y = 20;
		var text_x = 20;
		var text_y_inc = 25;
		
		fill(0);
		
		text("Name : " + current_person.name, text_x, text_y);
		text_y += text_y_inc;

		text("Eyes : " + current_person.getText(current_person.eyes), text_x, text_y);
		text_y += text_y_inc;
		text("Nose : " + current_person.getText(current_person.nose), text_x, text_y);
		text_y += text_y_inc;
		text("Mouth : " + current_person.getText(current_person.mouth), text_x, text_y);
		text_y += text_y_inc;
		text("Body : " + current_person.getText(current_person.body), text_x, text_y);
		text_y += text_y_inc;
		
	}
}

// int * int * boolean --> void.
function addCircle(x, y, isGood)
{
	info_circles.enq(new CircleFloat(x, y, isGood, 10));
}

function mousePressed()
{
	if(scene)
		scene.mousePressed();
}

function mouseReleased()
{
	if(scene)
		scene.mouseReleased();
}

function keyPressed()
{
  if (keyCode === RIGHT_ARROW)
  {

  }
  
  redraw();
}


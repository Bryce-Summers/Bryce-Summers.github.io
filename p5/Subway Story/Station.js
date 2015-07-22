/* 
 * Button Class.
 * Written on 7/6/2015 by Bryce Summers
 *
 * Specifies the components of a room.
 */
 
var train = [];
var row_num = 2;
var col_num = 13;


 
 // Constructor.
function Station(index)
{
	this.buttons = [];
	this.nextStation = null;
	this.prevStation = null;
	
	// Every Station has an index that defines itself as
	// a destination for passengers.
	this.index = index;
	

	// -- Initialization.
	var size = 50;
	var sep = 10;// Separation.
		
	// The waiting person buttons.
	for(var r = 0; r < 3; r++)
	for(var c = 0; c < col_num; c++)
	{
		var button = new Button(20 + (size+sep)*c, room_h - sep -(r + 1)*(size+sep), size, size);
		this.buttons.push(button);
		
		var person = new Person()
	
		if(person.station == index)
		{
			person.station = station_count - 1;
		}
		
		button.person = person;
	}

	if(train.length === 0)
	{
		this.defineTrain(size, sep);
	}
	
	// Add the train buttons to this station room.
	for(var r = 0; r < row_num; r++)
	for(var c = 0; c < col_num; c++)
	{
		this.buttons.push(train[r][c]);
	}

}

Station.prototype =
{
	draw: function()
	{
		var len = this.buttons.length;
		  
		for(var i = 0; i < len; i++)
		{
		  this.buttons[i].draw();
		}
		
		for(var i = 0; i < len; i++)
		{
		  this.buttons[i].draw2();
		}
	},
	  
	update()
	{
		var len = this.buttons.length;
		  
		for(var i = 0; i < len; i++)
		{
		  this.buttons[i].update();
		}
	},
	
	mousePressed()
	{
		var len = this.buttons.length;
		  
		for(var i = 0; i < len; i++)
		{
		  this.buttons[i].mousePressed();
		}
	},
	
	mouseReleased()
	{
		var len = this.buttons.length;
		  
		for(var i = 0; i < len; i++)
		{
		  this.buttons[i].mouseReleased();
		}
	},
	
	// Initializes the global train.
	defineTrain(size, sep)
	{
		for(var row = 0; row < row_num; row++)
		{
			train[row] = [];
		}

		// The On Train Buttons.
		for(var r = 0; r < row_num; r++)
		for(var c = 0; c < col_num; c++)
		{
			var button = new Button(20 + (size+sep)*c, room_h/2 - row_num*(size+sep)/2 + r*(size+sep), size, size);
			train[r][c] = button;
		}
	}
}
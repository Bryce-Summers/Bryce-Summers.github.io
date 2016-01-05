/* 
 * Room Class, defines the functionality for a particular room.
 * 
 * Adapted on 1/4/2016 by Bryce Summers
 *
 * Specifies the components of a room.
 */

// Constructor.
function Room()
{
	// Objects the User can interact with.
	this.buttons = [];
	
	// Objects the User cannot interact with.
	this.statics  = [];
	this.dynamics = [];
	
	this.index = rooms.length;
	rooms.push(this);
	
	// A function that activates when the user goes to this room.
	// It will probably be somthing that sets the html text elements or something else that only happens once.
	this.start_function = function(){};
}

Room.prototype =
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
		
		// Draw the statics.
		len = this.statics.length;
		for(var i = 0; i < len; i++)
		{
		  this.statics[i].draw();
		}
		
		
		// Draw the dynamic objects.
		len = this.statics.length;
		for(var i = 0; i < len; i++)
		{
		  this.dynamics[i].draw();
		}
	},
	  
	update()
	{
		var len = this.buttons.length;
		  
		for(var i = 0; i < len; i++)
		{
		  this.buttons[i].update();
		}
		
		
		// Draw the statics.
		len = this.dynamics.length;
		for(var i = 0; i < len; i++)
		{
		  this.dynamics[i].draw();
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
	
	addButtonOBJ(button)
	{
		this.buttons.push(button);
	},
	
	addStaticOBJ(obj)
	{
		this.statics.push(obj);
	},
	
	addDynamicOBJ(obj)
	{
		this.dynamics.push(obj);
	},
	
	goto(room_in)
	{
		room = room_in;
		room_in.start_function();
	}
}
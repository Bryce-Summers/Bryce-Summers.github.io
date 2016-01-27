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
		
		
		len = this.dynamics.length;
		for(var i = 0; i < len; i++)
		{
		  this.dynamics[i].update();
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
	
	// In general normal callers won't need to pass a second argument,
	// because undefined gets transribed to false.
	goto(room_in, dont_store_history)
	{		
		room = room_in;
		room_in.start_function();
		
		var stateObj = { room_index: room.index};
		
		if(!dont_store_history)
		{
			history.pushState(stateObj, "", "index.html");
		}
		
		// Replace the current state instead.
		if(dont_store_history === true)
		{
			history.replaceState(stateObj, "", "index.html");
		}
	}	
};


window.onpopstate = function(event)
{
	if(event.state)
	if(event.state.room_index)
	{
		room.goto(rooms[event.state.room_index], true);
	}
	//alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
}
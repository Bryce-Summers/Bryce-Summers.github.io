/* 
 * Slider class.
 * Written by Bryce Summers on 1/26/2016.
 *
 * A sliding bar with a handle that the user can drag.
 *
 * The knob is specified by the upper left hand corner of the knob.
 * It goes in the range (0,0) - (w - knob_size), h - knob_size);
 *
 * Buttons can be given action functions of type foo(float, float) --> ()
 *
 * It might be prefferable to have the knob size be an even number.
 */

// -- The current button that is clicked on.
// These might be shared with other gui elements.
buttonClickedOn = null;
buttonReleased = false;
 
 // Constructor.
function gui_Slider(x, y, w, h, knob_size)
{ 
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	
	this.x2 = this.x + w;
	this.y2 = this.y + h;
	
	this.knob_x = this.x;
	this.knob_y = this.y;
	this.knob_size = knob_size;
	
	this.action = null;
	this.text_size = 20;
	this.message = "";
	
	this.alive = true;
}

gui_Slider.prototype =
{

	update()
	{
		// Handle bogus releases.
		if(buttonReleased)
		{
			buttonClickedOn = null;
			buttonReleased  = false;
		}
		
		// Send mouse dragged events.
		if(buttonClickedOn === this)
		{
			this.mousePressed();
			
			// Perform the scroll signal action on drag events.
			if(this.action)
			{
				this.action(this.getXPer(), this.getYPer());
			}
		}
	},
	
	draw()
	{
		fill(255);// White.
		rect(this.x, this.y, this.w, this.h);
	  
		textSize(this.text_size);
		fill(0);
		textAlign(CENTER, CENTER);
		text(this.message, this.x + this.w/2, this.y + this.h/2 + this.text_size/2 - 2);
		
		if(buttonClickedOn === this)
		{
			fill(0, 0, 0, 100);
		}
		
		// hover color.
		else if(buttonClickedOn === null && this.mouseIn())
		{
			fill(20, 20, 20, 100);
		}
		else // Normal, resting.
		{			
			fill(255, 255, 255, 100);
		}
		
		// Draw the overlay.
		rect(this.x, this.y, this.w, this.h);

		// Draw the movable knob.
		fill(255);
		//rect(this.knob_x, this.knob_y, this.knob_size, this.knob_size);
		ellipse(this.knob_x + this.knob_size/2, this.knob_y + this.knob_size/2, this.knob_size, this.knob_size);
	},
	
	draw2()
	{
		
	},

	setMouseAction(action)
	{
		this.action = action;
	},
  
	mousePressed()
	{
		if(this.mouseIn() || buttonClickedOn === this)
		{
			buttonClickedOn = this;
			this.knob_x = constrain(mouseX - this.knob_size/2, this.x, this.x2 - this.knob_size);
			this.knob_y = constrain(mouseY - this.knob_size/2, this.y, this.y2 - this.knob_size);
		}
	},
	
	mouseReleased()
	{
		if(this.mouseIn())
		{
			if(buttonClickedOn === this)
			{
				if(this.action)
				{
					this.action(this.getXPer(), this.getYPer());
				}
				buttonClickedOn = null;
			}			
		}
				
		buttonReleased = true;
	},
	
	// Retrieves the slider's x and y percentages.
	getXPer()
	{
		return (this.knob_x - this.x) / (this.w - this.knob_size);
	},	
	
	getYPer()
	{
		return (this.knob_y - this.y) / (this.h - this.knob_size);
	},
	
	// Sets the knob to be at the given percentages.
	setPer(x, y)
	{
		this.knob_x = this.x + (this.w - this.knob_size)*x;
		this.knob_y = this.y + (this.w - this.knob_size)*y;
	},

	// Returns true if the mouse is inside of this button.
	mouseIn()
	{

		var output = 
			this.x <= mouseX && mouseX <= this.x2 &&
			this.y <= mouseY && mouseY <= this.y2;

		return output;

	},
	
	dead()
	{
		return !this.alive;
	}	
}
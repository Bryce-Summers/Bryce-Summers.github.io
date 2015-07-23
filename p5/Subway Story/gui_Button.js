/* 
 * Button Class.
 * Written on 7/22/2015 by Bryce Summers
 *
 * Genaric Text buttons.
 */

// -- The current button that is clicked on.
buttonClickedOn = null;
buttonReleased = false;
 
 // Constructor.
function Button(x, y, w, h)
{
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.x2 = this.x + w;
	this.y2 = this.y + h;
	
	this.action = null;
	this.text_size = 20;
	this.message = "";
}

Button.prototype =
{

	update()
	{
		// Handle bogus releases.
		if(buttonReleased)
		{
			buttonClickedOn = null;
			buttonReleased = false;
		}
		
	},
	
	draw()
	{
		fill(255);// White.
		rect(this.x, this.y, this.w, this.h);
	  
		textSize(this.text_size);
		text(message, x, y);
		
		if(buttonClickedOn === this)
		{
			fill(0, 0, 0, 100);
		}
		else if(buttonClickedOn === null && this.mouseIn())
		{
			fill(0, 0, 0, 0);
		}
		else
		{			
			fill(255, 255, 255, 100);
		}
		
		// Draw the overlay.
		rect(this.x, this.y, this.w, this.h);
	},

	setMouseAction(action)
	{
		this.action = action;
	},
  
	mousePressed()
	{
		if(this.mouseIn())
		{
			buttonClickedOn = this;
		}
	},
	
	mouseReleased()
	{
		if(this.mouseIn())
		{
			if(buttonClickedOn === this)
			{
				this.action();
				buttonClickedOn = null;
			}			
		}
				
		buttonReleased = true;
	},

	// Returns true if the mouse is inside of this button.
	mouseIn()
	{

		var output = 
			this.x <= mouseX && mouseX <= this.x2 &&
			this.y <= mouseY && mouseY <= this.y2;

		return output;

	}	
	

}
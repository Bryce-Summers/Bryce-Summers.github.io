/* 
 * Button Class.
 * Written on 6/11/2015 by Bryce Summers
 *
 * Buttons used to represent people.
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
	
	// Every button may have a person associated with it.
	this.person = null;

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
		
		// Destroying People who are dead.
		if(this.person !== null && this.person.done())
		{
			this.person = null;
		}	
		
	},
	
	draw()
	{
		fill(255);// White.
		rect(this.x, this.y, this.w, this.h);
	  
		if(!(this.person === null))
		{
			this.person.draw(this.x, this.y);
		}
		
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
	
	draw2()
	{
		if(buttonClickedOn === this && this.person !== null)
		{
			this.person.draw(mouseX - this.w/2, mouseY - this.h/2);
		}
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
			current_person = this.person;
		}
	},
	
	mouseReleased()
	{
		if(this.mouseIn())
		{
			if(buttonClickedOn === this)
			{
				this.click_action();
			}
			else if (this.person === null)
			{
				this.move_action();
				buttonClickedOn = null;
			}
			else
			{
				// Emit some error feedback.
				for(var i = 0; i < 20; i++)
				{
					addCircle(mouseX, mouseY, false);
				}
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

	},

	click_action()
	{
		
	},
	
	move_action()
	{
		if(buttonClickedOn !== null)
		{
			this.person = buttonClickedOn.person;
			buttonClickedOn.person = null;
		}
	}

}
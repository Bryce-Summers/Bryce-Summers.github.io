/* 
 * Example Visual structure.
 *
 * Written on 2/3/2016 by Bryce Summers
 * 
 */
 
// Constructor.
function visual_()
{
	// Worlds are pretty much always useful.
	this.world = new ObjContainer();
}

visual_.prototype =
{
	// This class displays two visualizations on the screen. One on the left side and one on the right side.
	// The Title that will be displayed on the screen for the left visualization.
	
	title_left()
	{
		return "left_title";
	},
	
	// The Title that will be displayed on the screen for the right visualization.
	title_right()
	{
		return "right_title";
	},
	
	// The text that will accompany the left visualization as a description.
	text_left()
	{
		return "text_left";
	},
	
	// The text that will accompany the right visualization as a description.
	text_right()
	{
		return  "text_right";
	},
	
	// All visualizations can be restarted.
	restart()
	{
		this.world.make_empty();
		this.time = 0;
		
		// -- Initialize values here.
		
		// Parameters that control the animation.
		this.value;
		
		
		// -- Slider 1 : 
		var slider_h = 20;
		var slider;
		slider = new gui_Slider(room_w/24, room_h/4 + room_h/8, slider_h, room_h/8, slider_h);
		slider.setPer(1, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			var min = 0;
			var max = 1;
			this.value = min + (max - min)*x;
		}
		this.world.push(slider);
		
				
	},

	// Update's this OBJ's internal states.
	update()
	{
		this.world.update();
		this.time++;
		
	
	},

	// Draws the given OBJ to the screen.
	// Variables in represent the region on the screen that this visualization should be drawn on.
	draw(x_in, y_in, w, h)
	{		
		/*
		fill(255*heat, 0, 255*(1 - heat));
		rect(x, y - bar_h, bar_w, bar_h*2);
		*/
			
		
		this.world.draw(x_in, y_in);
	},
	
	// Returns true iff this OBJ should be deleted.
	dead()
	{
		return false;
	},
	
	mousePressed()
	{
		this.world.mousePressed();
	},
	
	mouseReleased()
	{
		this.world.mouseReleased();
	}
}
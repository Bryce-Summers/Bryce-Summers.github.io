/* 
 * Example Visual structure.
 *
 * Written on 2/3/2016 by Bryce Summers
 * 
 */
 
// Constructor.
function visual_amount()
{
	// Worlds are pretty much always useful.
	this.world = new ObjContainer();
}

visual_amount.prototype =
{
	// This class displays two visualizations on the screen. One on the left side and one on the right side.
	// The Title that will be displayed on the screen for the left visualization.
	
	title_left()
	{
		return "Varying amount of particles.";
	},
	
	// The Title that will be displayed on the screen for the right visualization.
	title_right()
	{
		return "";
	},
	
	// The text that will accompany the left visualization as a description.
	text_left()
	{
		return  "Many properties of physical systems can be related to the amount of a substance. <br>" +
				"For example, the desity is directly porportional to the amount of substance when volume remains constant.";
	},
	
	// The text that will accompany the right visualization as a description.
	text_right()
	{
		return  "";
	},
	
	// All visualizations can be restarted.
	restart()
	{
		this.world.make_empty();
		this.time = 0;
		var slider_h = 20;
		
		// -- Initialize values here.
		
		// Parameters that control the animation.
		this.max_amount = 200;
		this.current_amount = 100;
		this.particles = [];
		
		for(var i = 0; i < this.max_amount; i++)
		{
			this.particles.push(createVector(room_w/24 + slider_h + random(room_w*22/24 - slider_h*2), room_h/4 + slider_h + random(room_h/2 - slider_h*2)));
		}
		
		
		// -- Slider 1 : 
		var slider;
		slider = new gui_Slider(room_w/24, room_h*3/4 - slider_h, room_w*22/24, slider_h, slider_h);
		slider.setPer(1, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			var min = 0;
			var max = this.world.max_amount;
			this.world.current_amount = min + (max - min)*x;
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
		
		for(var i = 0; i < this.current_amount; i++)
		{
			// Get the relevant vector location.
			var v = this.particles[i];
			ellipse(v.x - 10, v.y - 10, 20, 20);
		}
		
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
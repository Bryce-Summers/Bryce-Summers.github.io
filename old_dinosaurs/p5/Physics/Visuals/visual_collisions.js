/* 
 * Collisions Visualization.
 * Written on 2/3/2016 by Bryce Summers
 * 
 */

// Constructor.
function visual_collisions()
{
	// Worlds are pretty much always useful.
	this.world = new ObjContainer();
}

visual_collisions.prototype =
{
	// This class displays two visualizations on the screen. One on the left side and one on the right side.
	// The Title that will be displayed on the screen for the left visualization.
	
	title_left()
	{
		return "Red Object";
	},
	
	// The Title that will be displayed on the screen for the right visualization.
	title_right()
	{
		return "Green Object";
	},
	
	// The text that will accompany the left visualization as a description.
	text_left()
	{
		return "The two objects will perfectly invert their momentum when they hit a wall and will resolve collisions with each " +
		"other in a way that conserves momentum and kinetic energy. " +
		"Please try changing the masses. An object with more " +link("mass", "room_kilogram") + " will be more resistant to altering its velocity. " +
		"The objects collide with the left and right walls causing pressure equal to their entire momentum. "
	},
	
	// The text that will accompany the right visualization as a description.
	text_right()
	{
		return  "";//text_right";
	},
	
	// All visualizations can be restarted.
	restart()
	{
		this.world.make_empty();
		this.time = 0;
		
		// -- Initialize values here.
		
		// Parameters that control the animation.
		this.p1_original = 0;
		this.p1 = 0;
		this.p2_original = 1;
		this.p2 = 1;
		
		this.v1_original = .001;
		this.v1 = this.v1_original;
		this.v2_original = -.001;
		this.v2 = this.v2_original;
		
		this.mass1 = room_h/4;
		this.mass2 = room_h/4;
		
		this.coef = 1.0;// Coeficient of restitution.
		
		this.play = false;
		
		
		// -- Slider 1 : 
		var slider_h = 20;
		
		var button = new gui_Button(room_w*11/24, room_h*3/4 - slider_h, room_w*2/24, slider_h);
		this.world.push(button);
		button.message = "Play";
		button.world = this;
		button.action = function(){
			
			this.world.play = !this.world.play;
			if(this.world.play)
			{
				this.message = "Stop";
			}
			else // Stopped state.
			{				
				this.message = "Go";
				this.world.stop();
			}
				
		}
		
		var slider;
		
		// Coeficient of Restitution Slider.
		slider = new gui_Slider(room_w/2 - room_w*3/24, room_h*3/4 - 2*slider_h, room_w*6/24, slider_h, slider_h);
		slider.setPer(1.0, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			var min = 0;
			var max = 1.0;
			this.world.coef = min + (max - min)*x;
			this.message = "Coeficient of Restitution = " + Math.floor(this.world.coef*100)/100;
			this.world.stop();
		}
		slider.message = "Coeficient of Restitution: 1.0";
		this.world.push(slider);
		
		
		// Position Sliders.
		slider = new gui_Slider(room_w/24, room_h*3/4 - slider_h, room_w*10/24, slider_h, slider_h);
		slider.setPer(0, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			var min = 0;
			var max = .5;
			this.world.p1_original = min + (max - min)*x;
			this.world.stop();
		}
		slider.message = "Left Initial Position.";
		this.world.push(slider);
		
		slider = new gui_Slider(13*room_w/24, room_h*3/4 - slider_h, room_w*10/24, slider_h, slider_h);
		slider.setPer(1, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			var min = .5;
			var max = 1.0;
			this.world.p2_original = min + (max - min)*x;
			this.world.stop();
		}
		slider.message = "Right Initial Position.";
		this.world.push(slider);
		
		// Velocity Sliders.
		slider = new gui_Slider(room_w/24, room_h*3/4 - slider_h*2, room_w*5/24, slider_h, slider_h);
		slider.setPer(0, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			var min = -.01;
			var max = .02;
			this.world.v1_original = min + (max - min)*x;
			this.world.stop();
		}
		slider.message = "Left Initial Velocity";
		this.world.push(slider);
		
		slider = new gui_Slider(13*room_w/24 + room_w*5/25, room_h*3/4 - slider_h*2, room_w*5/24, slider_h, slider_h);
		slider.setPer(1, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			var min = -.02;
			var max = .01;
			this.world.v2_original = min + (max - min)*x;
			this.world.stop();
		}
		slider.message = "Right Initial Velocity";
		this.world.push(slider);
		
		// -- Mass Sliders.
		slider = new gui_Slider(room_w/24, room_h/4, slider_h, room_h/4, slider_h);
		slider.setPer(1, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			var min = 1;
			var max = room_h/4;
			this.world.mass1 = min + (max - min)*(1.0 - y);
			this.world.stop();
		}
		this.world.push(slider);
		
		
		slider = new gui_Slider(room_w*23/24 - slider_h, room_h/4, slider_h, room_h/4, slider_h);
		slider.setPer(1, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			var min = 1;
			var max = room_h/4;
			this.world.mass2 = min + (max - min)*(1.0 - y);
			this.world.stop();
		}
		this.world.push(slider);
	},

	stop()
	{
		this.p1 = this.p1_original;
		this.p2 = this.p2_original;

		this.v1 = this.v1_original;
		this.v2 = this.v2_original;
		this.play = false;
	},
	
	// Update's this OBJ's internal states.
	update()
	{
		this.world.update();
		this.time++;
		
		// Don't do any movement when we are not playing.
		if(!this.play)
		{
			return;
		}
		
		// Integrate velocities over time.
		// This leads to the positions being updated.
		this.p1 += this.v1;
		this.p2 += this.v2;

		// Collision.
		if(this.p1 > this.p2)
		{
			this.p1 = this.p2;
			
			var u1 = this.v1;
			var u2 = this.v2;
			var m1 = this.mass1;
			var m2 = this.mass2;
			
			this.v1 = (this.coef*m2*(u2 - u1) + m1*u1 + m2*u2)/(m1 + m2);
			this.v2 = (this.coef*m1*(u1 - u2) + m2*u2 + m1*u1)/(m2 + m1);
		}

		// Bounce the left object off of the left wall.
		if(this.p1 <= 0 && this.v1 < 0)
		{
			this.v1 *= -1;
		}

		// Bounce the right object off of the right wall.
		if(this.p2 >= 1 && this.v2 > 0)
		{
			this.v2 *= -1;
		}
	},

	// Draws the given OBJ to the screen.
	// Variables in represent the region on the screen that this visualization should be drawn on.
	draw(x_in, y_in, w, h)
	{		
		
		var box_w = room_w/30;
		
		var box_x1 = 20 + room_w/24 + box_w + (room_w*22/24 - box_w*2 - 40)*this.p1;
		var box_x2 = 20 + room_w/24 + box_w + (room_w*22/24 - box_w*2 - 40)*this.p2;
				
		// Left box.
		fill(255, 0, 0);
		rect(box_x1 - box_w, room_h/2 - this.mass1, box_w, this.mass1);
		
		// Right box.
		fill(0, 255, 0);
		rect(box_x2,         room_h/2 - this.mass2, box_w, this.mass2);
		
		var y = room_h/2 - this.mass1/2;
		this.drawArrow(box_x1, y, box_x1 + this.v1*room_w*22/24*5, y, 20);
		var y = room_h/2 - this.mass2/2;
		this.drawArrow(box_x2, y, box_x2 + this.v2*room_w*22/24*5, y, 20);

		this.world.draw(x_in, y_in);
	},
	
	drawArrow(x1, y1, x2, y2, size)
	{
		line(x1, y1, x2, y2);

		var len = dist(x1, y1, x2, y2);
		
		var par_x = (x1 - x2)/len;
		var par_y = (y1 - y2)/len;
		
		var perp_x = -par_y*size;
		var perp_y =  par_x*size;
		
		par_x *= size;
		par_y *= size;
				
		// Arrow head.
		line(x2, y2, x2 + par_x + perp_x, y2 + par_y + perp_y);
		line(x2, y2, x2 + par_x - perp_x, y2 + par_y - perp_y);
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
/* 
 * Speed of Light Visualization.
 *
 * Written on 1/18/2016 by Bryce Summers
 *
 * 
 */
 
// Constructor.
function visual_speed_of_light()
{
	this.world = new ObjContainer();
}

visual_speed_of_light.prototype =
{
	// This class displays two visualizations on the screen. One on the left side and one on the right side.
	// The Title that will be displayed on the screen for the left visualization.
	title_left()
	{
		return "Constant Speed";
	},
	
	// The Title that will be displayed on the screen for the right visualization.
	title_right()
	{
		return "Wavelength vs. Frequency."
	},
	
	// The text that will accompany the left visualization as a description.
	text_left()
	{
		return "Light moves at a constant speed while in a constant medium. " +
		"In the visualization light starts moving in a vacuum ($\\eta = 1$), moves through two mediums with variable refractive indices, then finishes once more in a vacuum. " +
		"Please try dragging the sliders to manipulate the refractive indices of the two gray mediums.";
	},
	
	// The text that will accompany the right visualization as a description.
	text_right()
	{
		return "Because the speed of light is constant, and $v = f \\cdot \\lambda$, light waves with larger frequencies have smaller wavelengths and light waves with smaller frequencies have larger wavelengths.";
	},
	
	// All visualizations can be restarted.
	restart()
	{
		this.world.make_empty();
		this.time = 0;
		
		// -- Make sliders that control the wavelengths.
		
		/*
		this.drawWaveform(wavelength,   x, room_h/4,              w, room_h/6);
		this.drawWaveform(wavelength/2, x, room_h/4 + room_h/6,   w, room_h/6);
		this.drawWaveform(wavelength/4, x, room_h/4 + room_h*2/6, w, room_h/6);
		*/
		var x = room_w*13/24; // (10/24 + 2/24) / (22/24)
		var w = room_w*10/24;
		
		this.wavelength1 = room_w*10/24;
		this.wavelength2 = this.wavelength1/2;
		this.wavelength3 = this.wavelength2/2;
		
		// -- Slider 1.
		this.slider1 = new gui_Slider(x, room_h/4 + room_h/6 - 20 + 2,   w, 20, 20);
		this.slider1.setPer(1, 0);
		this.slider1.world = this;
		this.slider1.action = function(x, y)
		{
			this.world.wavelength1 = max(1, room_w*10/24 * x);
		}
		this.world.push(this.slider1);
		
		// -- Slider 2.		
		this.slider2 = new gui_Slider(x, room_h/4 + room_h*2/6 - 20 + 2, w, 20, 20);
		this.slider2.setPer(.5, 0);
		this.slider2.world = this;
		this.slider2.action = function(x, y)
		{
			this.world.wavelength2 = max(1, room_w*10/24 * x);
		}
		this.world.push(this.slider2);
		
		// -- Slider 3.
		this.slider3 = new gui_Slider(x, room_h/4 + room_h*3/6 - 20 + 2, w, 20, 20);
		this.slider3.setPer(.25, 0);
		this.slider3.world  = this;
		this.slider3.action = function(x, y)
		{
			this.world.wavelength3 = max(1, room_w*10/24 * x);
		}
		this.world.push(this.slider3);
		
		
		
		
		// -- Make sliders that control the index of refraction.
		
		/* Here are the refractive medium's locations.
		rect(x + medium_w, y, medium_w, h);// Medium 1.
		rect(x + 2*medium_w, y, medium_w, h); // Medium 2.
		*/

		this.refractive_index1 = 2.0;
		this.refractive_index2 = 4.0;
		
		
		var left_w = room_w*10/24;
		this.medium_w = left_w/4;
		var x = room_w/24;
		
		// -- Medium 1 (light gray slider).
		var slider = new gui_Slider(x + this.medium_w, room_h*3/4 - 20, this.medium_w, 20, 20);
		slider.setPer(2/10.0, 0);
		slider.world  = this;
		slider.action = function(x, y)
		{
			// 1 - 10 range.
			this.world.refractive_index1 = 1 + 9*x;
		}
		this.world.push(slider);
		
		
		// -- Medium 2 (dark gray slider).
		var slider = new gui_Slider(x + this.medium_w*2, room_h*3/4 - 20, this.medium_w, 20, 20);
		slider.setPer(4/10.0, 0);
		slider.world  = this;
		slider.action = function(x, y)
		{
			// 1 - 10 range.
			this.world.refractive_index2 = 1 + 9*x;
		}
		this.world.push(slider);
		
		
		
	},
	// Update's this OBJ's internal states.
	update()
	{
		
		var n = 1; // 5
		// Add a bunch of particles.
		for(var i = 0; i < n; i++)
		{
			var dir = random(PI/4);
			
			dir -= PI/8;
			
			var dx = cos(dir);
			var dy = sin(dir);
			var life_span = 400;
			
			// Fast enough for a photon to pass through each of the 4 mediums.
			// Each medium is weighted by its index of refraction to determine the entire "vaccuum length it would need to travel",
			// then it is coverted to a velocity via the particle's intended lifespan.
			// I have changed it now to have a constant velocity and variable lifespan.
			var v = this.medium_w/20;
			
			life_span = (this.medium_w*(2 + this.refractive_index1 + this.refractive_index2))/v;
			
			
			var rand = random(v);
			

			
			var photon = new Photon(0 + dx*rand, room_h/4 + dy*rand, dx*v, dy*v, life_span);
			photon.world = this;						
			photon.action1 = function(thiss)
			{
				if(thiss.state == 0 && thiss.p.x > thiss.medium1_x)
				{
					thiss.state = 1;// Slower medium.
					// older / newer change.
					thiss.v.mult(1.0 / thiss.world.refractive_index1);
								
					// The normal direction of the boundary wall.
					var N = createVector(-1, 0);
					// Transition from a vacuum to medium1.
					thiss.refract(N, 1, thiss.world.refractive_index1);
				}
				
				if(thiss.state == 1 && thiss.p.x > thiss.medium2_x)
				{
					thiss.state = 2;// Slower medium.
					thiss.v.mult(thiss.world.refractive_index1 / thiss.world.refractive_index2);//old / new.
									
					// The normal direction of the boundary wall.
					var N = createVector(-1, 0);
					// Transition from medium 1 to medium 2.
					thiss.refract(N, thiss.world.refractive_index1, thiss.world.refractive_index2);
					
				}
				
				if(thiss.state == 2 && thiss.p.x > thiss.medium3_x)
				{
					thiss.state = 3;// Slower medium.
					thiss.v.mult(thiss.world.refractive_index2 / 1.0);
					
					// The normal direction of the boundary wall.
					var N = createVector(-1, 0);
					thiss.refract(N, thiss.world.refractive_index2, 1);// Back to a vaccuum.
				}
			}
			
			photon.medium1_x = this.medium1_x;
			photon.medium2_x = this.medium2_x;
			photon.medium3_x = this.medium3_x;
			
			this.world.push(photon);
		}
		
		this.world.update();
		this.time++;
	},

	// Draws the given OBJ to the screen.
	// Variables in represent the region on the screen that this visualization should be drawn on.
	draw(x, y, w, h)
	{
				
		
		// -- Calculate useful spatial measurments.
		
		var left_w = w*10/22;
		var medium_w = this.medium_w;
		
		// 0 is air.
		this.medium1_x = medium_w;
		this.medium2_x = medium_w*2;
		this.medium3_x = medium_w*3; // Air.
		
		
		// -- Draw Rectangles to represent different mediums.
		
		// Medium 1.
		fill(200);
		rect(x + medium_w, y, medium_w, h);
	
		// Medium 2.
		fill(150);
		rect(x + 2*medium_w, y, medium_w, h);
		
		// Draw the photon particles.
		this.world.draw(x, y);
		
		var x = room_w*13/24; // (10/24 + 2/24) / (22/24)
		var w = room_w*10/24;
		
		this.drawWaveform(this.wavelength1, x, room_h/4 - 20,             w, room_h/6);
		this.drawWaveform(this.wavelength2, x, room_h/4 - 20 + room_h/6,  w, room_h/6);
		this.drawWaveform(this.wavelength3, x, room_h/4 - 20+ room_h*2/6, w, room_h/6);
	},
	

	drawWaveform(wavelength, x, y, w, h)
	{
		var x_in = x;
		var y_in = y;
		var w_in = w;
		var h_in = h;
		
		// Draw Black lines.
		fill(0);
		
		var len = 200;
		var x_inc = w/len;
		
		// Velocity in pixel lengths / time.
		var velocity = 5;
		
		// 1 interval length = w/len pixel lengths.
		// pixels/intervals  = w/len
		// Note: interval length/time = * pixel length/time.
		var i_velocity = velocity*len/w;
		
		var last_y = this.f1(this.time*velocity);
		
		for(var i = 0; i < len; i++)
		{
			var x  = x_in + i*x_inc;
			var x2 = x + x_inc;
			
			// Speed of light is contant --> time is linear in the x coordinate on screen.
			// We still need to scale it linearly from screen space to interval space.
			var i2 = i + this.time*i_velocity;
			
			
			var y2 = this.f1(i2, len, w, wavelength);
			line(x,  y_in + h/2 + h/4*last_y,
				 x2, y_in + h/2 + h/4*y2);
			last_y = y2;
		}
		
		// Draw a line indicating the wavelength.
		var x1 = x_in;
		var h  = 20;// Height of line.
		var y  = y_in + h_in - h;
		var x2 = x1 + wavelength;
		line(x1, y - h, x1, y + h);
		line(x2, y - h, x2, y + h);
		line(x1, y, x2, y);
		
		// Draw particular points traveling along the waveform.
		var radius = 7;
		var n = w_in / wavelength;
		for(var i = 0; i < n; i++)
		{
			// Draw equally spaced dots on the screen at wavelength intervals.
			
			var x = radius + x_in + w_in -  i*wavelength - (this.time*velocity % wavelength);
			if(x > x_in)
			ellipse(x, y, radius, radius);
		}
		
		var offset = (this.time*velocity) % wavelength;
		radius = h/2 + h/2*sin(offset*PI/wavelength);
		ellipse(x_in, y, radius, radius);
				
	},
	
	// Waveform function.
	f1(i, len, w, wavelength)
	{
		return cos( i/len*TWO_PI  // Scale range to a 1 period per width.
				   *w/wavelength  // Scale the function 1 period per wavelength.
					);
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
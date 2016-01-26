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
		"In the visualization light starts moving in a vacuum ($\\eta = 1$), slows down by a factor of 2 in the lighter gray medium ($\\eta = 2$), slows down again by a factor of 2 in the dark gray medium ($\\eta = 4$) and then speed back up in another vacuum at the end.";
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
			
			// Long enough to cover 8 quarter screens. the index=2 region and index=4 regions
			// Make up 1 and 3 extra quarters respectively, which comes out to 8 in total.
			var v = (room_w*10.0/24)*2/life_span;
			var rand = random(v);
			
			var photon = new Photon(0 + dx*rand, room_h/4 + dy*rand, dx*v, dy*v, life_span);
			
			photon.action1 = function(thiss)
			{
				if(thiss.state == 0 && thiss.p.x > thiss.medium1_x)
				{
					thiss.state = 1;// Slower medium.
					thiss.v.mult(.5);
					
					// The normal direction of the boundary wall.
					var N = createVector(-1, 0);
					thiss.refract(N, 1, 2);
				}
				
				if(thiss.state == 1 && thiss.p.x > thiss.medium2_x)
				{
					thiss.state = 2;// Slower medium.
					thiss.v.mult(.5);
									
					// The normal direction of the boundary wall.
					var N = createVector(-1, 0);
					thiss.refract(N, 2, 4);
					
				}
				
				if(thiss.state == 2 && thiss.p.x > thiss.medium3_x)
				{
					thiss.state = 3;// Slower medium.
					thiss.v.mult(4);
					
					// The normal direction of the boundary wall.
					var N = createVector(-1, 0);
					thiss.refract(N, 4, 1);
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
		var medium_w = left_w/4;
		
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
		var wavelength = w;
		this.drawWaveform(wavelength,   x, room_h/4,              w, room_h/6);
		this.drawWaveform(wavelength/2, x, room_h/4 + room_h/6,   w, room_h/6);
		this.drawWaveform(wavelength/4, x, room_h/4 + room_h*2/6, w, room_h/6);
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
			ellipse(radius + x_in + w_in - (this.time*velocity + i*(wavelength)) % w, y, radius, radius);
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
	}
}
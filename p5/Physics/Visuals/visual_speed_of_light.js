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
	// All visualizations can be restarted.
	restart()
	{
		this.world.make_empty();
		this.time = 0;
	},
	// Update's this OBJ's internal states.
	update()
	{
		// Add a bunch of particles.
		for(var i = 0; i < 5; i++)
		{
			var dir = random(TWO_PI);
			var dx = cos(dir);
			var dy = sin(dir);
			var life_span = 100;
			var v = room_h/4 / life_span;
			var rand = random(v);
			
			this.world.push(new Photon(room_w/4 + dx*rand, room_h/2 + dy*rand, dx*v, dy*v, life_span));
		}
		
		this.world.update();
		this.time++;
	},

	// Draws the given OBJ to the screen.
	draw(x, y)
	{
		this.world.draw(x, y);

		var wavelength = room_w/3;

		var x = room_w*13/24;
		var w = room_w*10/24;
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
			ellipse(x_in + w_in - (this.time*velocity + i*(wavelength)) % w, y, radius, radius);
		}
	},
	
	// Waveform function.
	f1(i, len, w, wavelength)
	{
		return cos( i/len*TWO_PI  // Scale range to a 1 period per width.
				   *w/wavelength // Scale the function 1 period per wavelength.
					);
	},
	
	// Returns true iff this OBJ should be deleted.
	dead()
	{
		return false;
	}
}

// -- Photons. Used for simulating particles on a screen.
function Photon(x, y, dx, dy, lifespan)
{
	this.p = createVector(x, y);
	this.v = createVector(dx, dy);
	
	this.time = 0;
	this.lifespan = lifespan ? lifespan : 30;
}

Photon.prototype = 
{
	update()
	{
		this.p.add(this.v);
		this.time++;
	},

	draw(x, y)
	{
		x += this.p.x;
		y += this.p.y;
		ellipse(x, y, 5, 5);
		
	},
	
	dead()
	{
		return this.time >= this.lifespan;
	}
}
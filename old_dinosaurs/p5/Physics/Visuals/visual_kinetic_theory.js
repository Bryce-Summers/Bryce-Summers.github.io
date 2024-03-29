/* 
 * Kinetic theory visualization.
 *
 * Written on 1/25/2016 by Bryce Summers
 * 
 */
 
// Constructor.
function visual_kinetic_theory()
{
	// Stores the bouncing photons.
	this.world     = new ObjContainer();
	this.particles = new ObjContainer();
	
	// Stores the collision signal circles.
	this.signal = new ObjContainer();
	this.plots = new List();
	
}

visual_kinetic_theory.prototype =
{
	// This class displays two visualizations on the screen. One on the left side and one on the right side.
	// The Title that will be displayed on the screen for the left visualization.
	
	title_left()
	{
		return "3D Sphere Kinetic Theory Experiment";
	},
	
	// The Title that will be displayed on the screen for the right visualization.
	title_right()
	{
		return "Pressure Measurements";
	},
	
	// The text that will accompany the left visualization as a description.
	text_left()
	{
		return  "As volume decreases or temperature or amount increases, pressure increases. " +
				"In this visualization, uniform mass particles start going in a uniformly random direction in 3D space. " +
				"They then proceed to bounce between each other in perfectly elastic collsions. " +
				"Pressure is measured over discrete time intervals, with a larger time interval cooresponding to more stable measurements.";
	},
	
	// The text that will accompany the right visualization as a description.
	text_right()
	{
		return "You can adjust the average speed of the particles, the number of particles, and the radius or the sphere. " +
				"The histogram displays measurements of pressure over time, which is the total change in " + link("momentum", "room_momentum") + " induced on the particles via perfectly elastic "+
				link("collisions", "room_collisions") +	" with the boundaries of the sphere.";
	},
	
	// All visualizations can be restarted.
	restart()
	{
		this.world.make_empty();
		this.time = 0;
		
		this.particles.make_empty();
		this.world.push(this.particles);

		// System variables. PV = NRT;
		this.radius = (room_h/4); // Volume.
		this.amount = 30; // amount of particles. (In pretend moles.)
		this.kinetic_energy = 1.0; // Temperature. (As a function of kinetic energy.

		this.time_step = 100;

		// Experimentally Derived Variable. The current experiment going on is to determine pressure over a time interval.
		this.pressure = 0.0;

		// A Record of the pressure over previous time periods.
		this.pressure_histogram = new List();
		this.max_histogram_size = 5;
		this.color_index = 0;	
		
		// 1.0 - 7.0;

		this.collider_x = room_h/4;//room_w*5/24;
		this.collider_y = room_h/4;
		
		this.addCollider(this.collider_x, this.collider_y, this.amount);
		//this.addCollider(room_w*18/24, room_h/4);

		var slider;
		var slider_h = 20;
		this.slider_h = slider_h;
		var slider_x = 15/24*room_w;
		this.slider_w = room_w*23/24 - slider_x;
		
		this.slider_y = room_h/2 + slider_h*4;
		var slider_y = this.slider_y;
		
		this.max_kinetic_energy = 10;
		
		// Control the Temperature.
		slider = new gui_Slider(slider_x, slider_y, this.slider_w, slider_h, slider_h);
		slider.setPer(0, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			var min = 1.0;
			var max = this.world.max_kinetic_energy;
			this.world.kinetic_energy = min + (max - min)*x;
			
			this.world.reset_time();
		}
		slider.message = "Kinetic Energy^2";
		this.world.push(slider);
		
		// Control the amount of particles.
		slider = new gui_Slider(slider_x, slider_y + slider_h, this.slider_w, slider_h, slider_h);
		slider.setPer(0, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			var min = 1;
			var max = 100;
			var new_amount = min + (max - min)*x;
			
			// Try to add new particles.
			while(this.world.amount < new_amount)
			{
				this.world.addNewParticle(this.world.amount);
				this.world.amount++;
			}
			// Explicitly set the amount to the correct value 
			// to kill off particles if the amount has decreased.
			this.world.amount = Math.ceil(new_amount);
			
			this.world.reset_time();
		}
		slider.message = "Amount";
		this.world.push(slider);
		
		// Volume slider.
		slider = new gui_Slider(slider_x, slider_y + slider_h*2, this.slider_w, slider_h, slider_h);
		slider.setPer(0, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			var min = room_h/8;
			var max = room_h/4;
			this.world.radius = min + (max - min)*x;
			
			this.world.reset_time();
		}
		slider.message = "Volume";
		this.world.push(slider);

		// Time Step slider.
		slider = new gui_Slider(slider_x, slider_y + slider_h*3, this.slider_w, slider_h, slider_h);
		slider.setPer(0, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			var min = 20;
			var max = 240;
			this.world.time_step = Math.ceil(min + (max - min)*x);
			this.world.reset_time();
		}
		slider.message = "Time Step";
		this.world.push(slider);
		
		// 18/24 would center the button on the histogram, but we have moved it
		// over with the addition of the play button.
		var button = new gui_Button(room_w*17/24, room_h*3/4 - slider_h*2, room_w*2/24, slider_h*2);
		this.world.push(button);
		button.message = "Clear Plot";
		button.world = this;
		button.action = function(){
			this.world.plots.make_empty();
		}

		this.play = false;
		
		// -- Play Button.
		var button = new gui_Button(room_w*19/24, room_h*3/4 - slider_h*2, room_w*2/24, slider_h*2);
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
			}
				
		}
		
	},
	
	reset_time()
	{
		this.time = 1;
		this.pressure = 0;
	},

	addCollider(collider_x, collider_y, amount)
	{
		for(var i = 0; i < amount; i++)
		{
			this.addNewParticle(i);
		}
	},
	
	addNewParticle(index)
	{
		var dir = random(TWO_PI);
		var dx = cos(dir);
		var dy = sin(dir);
		
		var phi = random(PI) - PI/2;
		var dz = sin(phi);
		var r = cos(phi);
		
		dx *= r;
		dy *= r;
		
		var collider_x = this.collider_x;
		var collider_y = this.collider_y;
		
		var photon = new Photon(collider_x + dx*60, collider_y + dy*60, dx, dy, -1, dz*60, dz);
			
		// World is this entire visual.
		photon.world  = this;
		photon.center_x = collider_x;
		photon.center_y = collider_y;
		photon.center_z = 0;
		photon.index = index;
		photon.z_range = this.radius/4;
	
		photon.dead = function()
		{
			return this.index + 1 > this.world.amount;
		}
	
		photon.action1 = function()
		{
			// Scale the speed of the particles by the amount of kinetic energy.
			this.v_scale = this.world.kinetic_energy;
			
			// Compute collisions with circular boundary. This is pressure...
			var center_screen = createVector(this.center_x, this.center_y, this.center_z);
			var offset = p5.Vector.sub(this.p, center_screen);
			if(offset.magSq() > this.world.radius*this.world.radius)
			{
				var N = p5.Vector.mult(offset, -1);
				N.normalize();
				
				// Clamp the position within the ball, in case the volume has changed.
				this.p = p5.Vector.add(center_screen, p5.Vector.mult(offset, this.world.radius/offset.mag()));
								
				var dir_before = this.v.copy();
				if(p5.Vector.dot(this.v, N) < 0)
				{
					this.reflect(N);
				}
				
				// Change in momentum at walls = outgoing pressure.
				this.world.pressure += dir_before.sub(this.v.copy()).mag()*2;
			}
				
			var iter = this.world.particles.iterator();
	
			// Iterate throuh all photons and compute collisions.
			while(iter.hasNext())
			{					
				var photon = iter.next();
					
				// don't collide photons with themselves.
				if(photon === this)
				{
					continue;
				}

				var diff = p5.Vector.sub(photon.p, this.p);
					
				// Detect collision.
				if(p5.Vector.dot(this.v, diff) > 0 && diff.mag() < this.radius + photon.radius)
				{
					// Compute the unit vector in the direction perpendicular to the line of collision.
					// Pointing from this particle to the other particle.
					diff.normalize();

					// 1D Velocities perpendicular to the line of collision.
					var u1 = p5.Vector.dot(this.v, diff);
					var u2 = p5.Vector.dot(photon.v, diff);

					var coef = 1.0; // Coeficient of restitution. 1.0 for perfectly elastic collisions.

					// Masses of the two particles.
					var m1 = 1.0;
					var m2 = 1.0;

					// Computer the outgoing velocities.
					var v1 = (coef*m2*(u2 - u1) + m1*u1 + m2*u2)/(m1 + m2);
					var v2 = (coef*m1*(u1 - u2) + m2*u2 + m1*u1)/(m2 + m1);
						
					// Add the perpendicular velocities back onto the 2D moving particles.
					this.v.add(p5.Vector.mult(diff, v1 - u1));
					photon.v.add(p5.Vector.mult(diff, v2 - u2));
						
				}
			}
		}

		this.particles.push(photon);
	},
	
	// Update's this OBJ's internal states.
	update()
	{
		
		// Don't do anything if the simulation is not currently playing.
		this.particles.enabled = this.play;
		if(!this.play)
		{
			// We still need to update the UI, so we update the world,
			// but with the particle system disabled.
			this.world.update();
			return;
		}
		
		if(this.time % this.time_step === 0)
		{
			var val = this.pressure*100/this.time_step;
			this.pressure_histogram.enq(val);
			var obj = new Object();
			obj.x = this.kinetic_energy;
			obj.y = val;
			console.log(obj.x);
			this.plots.enq(obj);
			if(this.pressure_histogram.size >= this.max_histogram_size)
			{
				this.pressure_histogram.deq();
				this.color_index = (this.color_index + 1) % this.max_histogram_size;
			}
			
			this.pressure = 0.0;
		}
		
		// Add particles here.
		this.world.update();
		this.signal.update();
		this.time++;
	},

	// Draws the given OBJ to the screen.
	// Variables in represent the region on the screen that this visualization should be drawn on.
	draw(x, y, w, h)
	{
		// Draw the photon particles.
		this.sort_z(this.particles.objs);
		this.world.draw(x, y);
		
		// Draw the photon particles.
		this.signal.draw(x, y);
		noFill();
		// Draw the collider bounding sphere.
		ellipse(this.collider_x + room_w/24, room_h/4 + this.collider_y, this.radius*2, this.radius*2);
		
		// Draw the histogram big bars.
		var i = this.color_index;
		var iter = this.pressure_histogram.iterator();
		var c = 0;
		var hist_w = this.slider_w/this.max_histogram_size;
		while(iter.hasNext())
		{
			// Color calculation code.
			i = (i + 1) % this.max_histogram_size;
			var val = i*255/this.max_histogram_size;
			fill(val, val, val);
			
			var pressure_val = iter.next();
			var h = pressure_val*room_h/2*.001; // Height of info bar.
			rect(//room_w*13/24 + hist_w*c,
				 room_w*23/24 - hist_w*(c+1),
				 this.slider_y - h, hist_w,
				 h);
			c++;
		}
		
		i = (i + 1) % this.max_histogram_size;
		var val = i*255/this.max_histogram_size;
		fill(val, val, val);
		
		var pressure_val = this.pressure*100/this.time_step;		
		var h = pressure_val*room_h/2*.001; // Height of info bar.
			rect(//room_w*13/24 + hist_w*c,
				 room_w*23/24 - hist_w*(c+1),
				 this.slider_y - h, hist_w,
				 h);
		
		// Draw the plot of recorded measurements.
		this.drawPlot();
	},
	
	drawPlot()
	{
		// -- Draw the plot.
		fill(200, 200, 200);
		
		var min_x = room_w*7/24;
		var min_y = room_h/4;
		var max_y = room_h*3/4 - this.slider_h*2;
		
		var max_x = room_w*15/24;
		var range_x = max_x - min_x;
		var range_y = 1/2;
		
		var step = 10;
		
		// Here x acts as an offset in both the x and y directions.
		for(var x = 0; x < range_x; x += step)
		{
			if(x % (step*4) === 0)
			{
				strokeWeight(2);				
			}
			else if(x % (step*2) === 0)
			{
				strokeWeight(1);
			}
			else
			{
				strokeWeight(.5);
			}
			
			// Vertical Line.
			line(min_x + x, min_y, min_x + x, max_y);

			
			// Horizontal Line.
			if(min_y + x < max_y)
			line(min_x, min_y + x, max_x, min_y + x);
		}
		
		strokeWeight(1);
		
		var iter = this.plots.iterator();
		while(iter.hasNext())
		{
			var val = iter.next();
			rect(min_x + (val.x - .5)*range_x/this.max_kinetic_energy, max_y - val.y*range_y - this.slider_h*3, 30, 30);
		}
		
		stroke(0, 0, 0);
		fill(0, 0, 0);
		textSize(20);
		text("y = pressure, x = Kinetic Energy", room_w*10/24, room_h*3/4 - this.slider_h);
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
	},
	
	// Insertion Sort for a list of particles with z location components.
	sort_z(list)
	{
		var array = [];
		
		// Load the world's linked list into this array.
		while(!list.isEmpty())
		{
			array.push(list.deq());
		}
		
		var start = 0, end = array.length;
		
		// Insertion Sort the array.
		for(var i = start + 1; i < end; i++)
		{
			var val = array[i];
			var insert_index = i;
			
			while(insert_index > start && array[insert_index - 1].p.z < val.p.z)
			{
				this.swap(array, insert_index, insert_index - 1);
				insert_index--;
			}
		}
		
		for(var i = 0; i < end; i++)
		{
			list.enq(array[i]);
		}
		
		
	},
	
	swap: function(array, index1, index2)
	{
		var temp = array[index1];
		array[index1] = array[index2];
		array[index2] = temp;
	}
}
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
	this.world   = new ObjContainer();
	this.particles = new ObjContainer();
	
	// Stores the collision signal circles.
	this.signal = new ObjContainer();
}

visual_kinetic_theory.prototype =
{
	// This class displays two visualizations on the screen. One on the left side and one on the right side.
	// The Title that will be displayed on the screen for the left visualization.
	
	title_left()
	{
		return "Kinetic Theory Experiment";
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
				"They then proceed to bounce between each other in perfectly elastic collsions.";
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


		// Experimentally Derived Variable. The current experiment going on is to determine pressure over a time interval.
		this.pressure = 0.0;

		// A Record of the pressure over previous time periods.
		this.pressure_histogram = new List();
		this.max_histogram_size = 5;
		
		
		// 1.0 - 7.0;

		this.collider_x = room_w*5 /24;
		this.collider_y = room_h/4;
		
		this.addCollider(this.collider_x, this.collider_y, this.amount);
		//this.addCollider(room_w*18/24, room_h/4);

		var slider;
		var slider_h = 20;
		var slider_x = 13/24*room_w;
		
		// Control the Temperature.
		slider = new gui_Slider(slider_x, room_h/2, room_w*10/24, slider_h, slider_h);
		slider.setPer(0, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			var min = 1.0;
			var max = 10.0;
			this.world.kinetic_energy = min + (max - min)*x;
		}
		slider.message = "Kinetic Energy^2";
		this.world.push(slider);
		
		// Control the amount of particles.
		slider = new gui_Slider(slider_x, room_h/2 + slider_h, room_w*10/24, slider_h, slider_h);
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
			this.world.amount = new_amount;
		}
		slider.message = "Amount";
		this.world.push(slider);
		
		
		slider = new gui_Slider(slider_x, room_h/2 + slider_h*2, room_w*10/24, slider_h, slider_h);
		slider.setPer(0, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			var min = room_h/8;
			var max = room_h/4;
			this.world.radius = min + (max - min)*x;
		}
		slider.message = "Volume";
		this.world.push(slider);
		
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
		if(this.time % 100 === 0)
		{
			this.pressure_histogram.enq(this.pressure);
			if(this.pressure_histogram.size > this.max_histogram_size)
			{
				this.pressure_histogram.deq();
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
		this.world.draw(x, y);
		
		// Draw the photon particles.
		this.signal.draw(x, y);
		noFill();
		ellipse(room_w*6 /24, room_h/2, this.radius*2, this.radius*2);

		var iter = this.pressure_histogram.iterator();
		var c = 0;
		var hist_w = room_w*10/24/this.max_histogram_size;
		while(iter.hasNext())
		{
			var pressure_val = iter.next();
			var h = pressure_val*room_h/2*.001; // Height of info bar.
			rect(//room_w*13/24 + hist_w*c,
				 room_w*23/24 - hist_w*(c+1),
				 room_h/2 - h, hist_w,
				 h);
			c++;
		}
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
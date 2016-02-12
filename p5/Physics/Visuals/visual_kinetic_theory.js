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
		return "Cold Temperature";
	},
	
	// The Title that will be displayed on the screen for the right visualization.
	title_right()
	{
		return "Hot Temperature";
	},
	
	// The text that will accompany the left visualization as a description.
	text_left()
	{
		return "As volume decreases or temperture or amount increases, pressure increases.";
	},
	
	// The text that will accompany the right visualization as a description.
	text_right()
	{
		return "";
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

		// 1.0 - 7.0;

		this.collider_x = room_w*5 /24;
		this.collider_y = room_h/4;
		
		this.addCollider(this.collider_x, this.collider_y, this.amount);
		//this.addCollider(room_w*18/24, room_h/4);

		var slider;
		var slider_h = 20;
		
		// Control the Temperature.
		slider = new gui_Slider(room_w/2, room_h/2, room_w*10/24, slider_h, slider_h);
		slider.setPer(0, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			var min = 1.0;
			var max = 10.0;
			this.world.kinetic_energy = min + (max - min)*x;
		}
		slider.message = "Temperature";
		this.world.push(slider);
		
		// Control the amount of particles.
		slider = new gui_Slider(room_w/2, room_h/2 + slider_h, room_w*10/24, slider_h, slider_h);
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
		
		
		slider = new gui_Slider(room_w/2, room_h/2 + slider_h*2, room_w*10/24, slider_h, slider_h);
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
		var collider_x = this.collider_x;
		var collider_y = this.collider_y;
			
		var photon = new Photon(collider_x + dx*60, collider_y + dy*60, dx, dy, -1);
			
		// World is this entire visual.
		photon.world  = this;
		photon.center_x = collider_x;
		photon.center_y = collider_y;
		photon.index = index;
	
		photon.dead = function()
		{
			return this.index + 1 > this.world.amount;
		}
	
		photon.action1 = function()
		{
			// Scale the speed of the particles by the amount of kinetic energy.
			this.v_scale = this.world.kinetic_energy;
			
			// Compute collisions with circular boundary. This is pressure...
			var center_screen = createVector(this.center_x, this.center_y);
			var offset = p5.Vector.sub(this.p, center_screen);
			if(offset.magSq() > this.world.radius*this.world.radius)
			{
				var N = p5.Vector.mult(offset, -1);
				N.normalize();
					
				if(p5.Vector.dot(this.v, N) < 0)
				{
					this.reflect(N);
				}
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
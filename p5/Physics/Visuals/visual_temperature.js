/* 
 * Temperature visualization.
 *
 * Written on 1/25/2016 by Bryce Summers
 * 
 */
 
// Constructor.
function visual_temperature()
{
	// Stores the bouncing photons.
	this.world   = new ObjContainer();
	
	// Stores the collision signal circles.
	this.signal = new ObjContainer();
}

visual_temperature.prototype =
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
		return "A system with low energy will not have as many collisions and will therefore not release as much heat and will be colder";
	},
	
	// The text that will accompany the right visualization as a description.
	text_right()
	{
		return "A system with higher energy will have more collisions and will therefore release more thermal energy and will be warmer.";
	},
	
	// All visualizations can be restarted.
	restart()
	{
		this.world.make_empty();
		this.time = 0;

		var cold_speed = 1;
		var warm_speed = 7;
		
		this.addCollider(room_w*5 /24, room_h/4, cold_speed);
		this.addCollider(room_w*18/24, room_h/4, warm_speed);
	},
	
	addCollider(collider_x, collider_y, speed)
	{
		for(var i = 0; i < 30; i++)
		{
			var dir = random(TWO_PI);
			var dx = cos(dir);
			var dy = sin(dir);
			
			var photon = new Photon(collider_x + dx*60, collider_y + dy*60, dx*speed, dy*speed, -1);
			
			photon.world = this.world;
			photon.world2 = this.signal;
			photon.center_x = collider_x;
			photon.center_y = collider_y;
			
			photon.action1 = function(thiss)
			{
				// In local coordinate space.
				var center_screen = createVector(thiss.center_x, thiss.center_y);
				var offset = p5.Vector.sub(thiss.p, center_screen);
				if(offset.magSq() > (room_h/4)*(room_h/4))
				{
					var N = p5.Vector.mult(offset, -1);
					N.normalize();
					
					if(p5.Vector.dot(thiss.v, N) < 0)
					{
						thiss.reflect(N);
					}
				}
				
				var iter = this.world.iterator();
	
				// Iterate throuh all photons and compute collisions.
				while(iter.hasNext())
				{					
					var photon = iter.next();
					
					// don't collide photons with themselves.
					if(photon === thiss)
					{
						continue;
					}

					var diff = p5.Vector.sub(photon.p, thiss.p);
					
					if(p5.Vector.dot(photon.v, thiss.v) < 1 && diff.mag() < 20)
					{
						diff.normalize();
						
						// Reflect both objects off each other.
						photon.reflect(diff);
						diff.mult(-1);						
						thiss.reflect(diff);
						
						var signal = new Photon(thiss.p.x, thiss.p.y, 0, 0, 30);
						
						signal.action1 = function(this2)
						{
							this2.radius += 5;
						}
						
						thiss.world2.push(signal);
						
					}
				}
			}

			this.world.push(photon);
		}
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
	},
	
	// Returns true iff this OBJ should be deleted.
	dead()
	{
		return false;
	}
}
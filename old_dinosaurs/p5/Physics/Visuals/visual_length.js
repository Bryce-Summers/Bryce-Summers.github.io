/* 
 * Lengths Visualization.
 * Written on 2/3/2016 by Bryce Summers
 * 
 */

// Constructor.
function visual_length()
{
	// Worlds are pretty much always useful.
	this.world = new ObjContainer();
}

visual_length.prototype =
{
	// This class displays two visualizations on the screen. One on the left side and one on the right side.
	// The Title that will be displayed on the screen for the left visualization.
	
	title_left()
	{
		return "Measurement of Length";
	},
	
	// The Title that will be displayed on the screen for the right visualization.
	title_right()
	{
		return "";
	},
	
	// The text that will accompany the left visualization as a description.
	text_left()
	{
		return "Please click and drag to trace a curve through space. <br>" +
				"We can measure the length of the curve by copying it with a string and then deforming it to a straight line. We can then define length in terms of how much time it " +
				"takes for a photon to travel along the straight line in a vacuum.";
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
		
		// -- Initialize values here.
		
		// Parameters that control the animation.

		this.drawing = false;
		this.last_x;
		this.last_y;
		
		this.points = [];
		this.distances = []; // distances[i] specifies the distance from points[i - 1] to points[i].
		
		this.scale = 1.0;
		this.displacement_mag;
		this.total_distance = 0.0;
	},

	stop()
	{
	},
	
	// Update's this OBJ's internal states.
	update()
	{
		this.world.update();
		this.time++;

		if(this.drawing)
		{
			if(dist(this.last_x, this.last_y, mouseX, mouseY) > 5)
			{
				this.addMousePoint();			
			}
		}
		else if (this.points.length > 0) // Flow the curve to straight.
		{
			var start_x = room_w/24;
			var	start_y = room_h/2;
			var p0 = createVector(start_x - 2, start_y);
			var p1 = createVector(start_x - 1, start_y);
				
			for(var i = 0; i < this.points.length; i++)
			{
				// Move the currvent point a distance of 1 towards the location of a proper distance away from the previous point in the direction of p1 - p0.
				var diff = p5.Vector.sub(p1, p0);
				diff.normalize();
				if(abs(diff.y) < .0001)
				{
					diff.y = 0.0;
				}
				diff.mult(this.distances[i]);
				if(i > 0)
				{
					diff.mult(this.scale);
				}

				var target_position = p5.Vector.add(p1, diff);
				
				var p2 = this.points[i];
				var vel = p5.Vector.sub(target_position, p2);
				vel.mult(.8);
				/*
				if(vel.mag() > 2)
				{
					vel.normalize();
					vel.mult(2);
				}
				*/
				
				p2.add(vel);
				
				// Cycle the trailing points.
				p0 = p1;
				p1 = p2;		
			}
			
		}
	},
	
	addMousePoint()
	{
		if(!this.distances)
		{
			return;
		}
		
		this.last_x = mouseX;
		this.last_y = mouseY;
		
		// Store individual segment magnitudes.
		if(this.points.length < 1)
		{
			this.distances.push(1.0);
		}
		else
		{
			var last_point = this.points[this.points.length - 1];
			var segment_length = dist(last_point.x, last_point.y, mouseX, mouseY);
			this.total_distance += segment_length;
			this.distances.push(segment_length);
		}		
		
		// Store the new point.
		this.points.push(createVector(this.last_x, this.last_y));
		
		// Update the total displacement magnitude.
		this.displacement_mag = dist(this.points[0].x, this.points[0].y,
									 this.last_x, this.last_y);
									 
	},

	// Draws the given OBJ to the screen.
	// Variables in represent the region on the screen that this visualization should be drawn on.
	draw(x_in, y_in, w, h)
	{
		fill(0, 0, 0);

		// Draw the curve.
		noFill();

		var length = 0.0;

		var len = this.points.length;
		if(len > 0)
		{
			beginShape();
			var vec_last = this.points[0];
			vertex(vec_last.x, vec_last.y);
			for(var i = 1; i < len; i++)
			{
				/*
				var vec0 = this.points[i - 2];
				var vec1 = this.points[i - 1];
				var vec2 = this.points[i];
				var vec3 = this.points[i + 1];
				*/
				
				var vec = this.points[i];
				
				/*				
				var control_1 = p5.Vector.sub(vec2, vec0);
				control_1.mult(.5);
				control_1.add(vec1);

				var control_2 = p5.Vector.sub(vec3, vec1);
				control_2.mult(-.5);
				control_2.add(vec2);
				*/

				//bezierVertex(control_1.x, control_1.y, control_2.x, control_2.y, vec2.x, vec2.y);
				vertex(vec.x, vec.y);

				length += dist(vec_last.x, vec_last.y, vec.x, vec.y);
				vec_last = vec;
			}
			endShape();
		}

		// Draw the displacement.
		if(len >= 2)
		{
			fill(255, 0, 0);
			stroke(255, 0, 0, 100);
			strokeWeight(5);
			var p1 = this.points[0];
			var p2 = this.points[len - 1];
			
			var displacement = p2.copy();
			displacement.sub(p1);
			displacement.normalize();
			displacement.mult(this.displacement_mag*this.scale);
			
			// Draw the displacement vector.
			line(p1.x, p1.y, p1.x + displacement.x, p1.y + displacement.y);
					
			strokeWeight(1);
			textSize(32);
			var y = room_h/2;
			
			stroke(0, 255, 0, 100);
			fill(0, 0, 0);
			var x1 = room_w/24;
			var h  = room_h/2 - 64;
			var x2 = room_w/24 + room_w/11*this.scale;
			line(x1, h, x2, h);
			line(x1, h - 16, x1, h + 16);
			line(x2, h - 16, x2, h + 16);
			text("Reference length", x1 + 16, h - 16);
			
		}
		else
		{
			strokeWeight(1);
			textSize(32);
			text("Please Click and draw a path!", room_w*10/24, room_h/2);
		}
		
	},
	
	round(input)
	{
		return Math.floor(input * 100) / 100;		
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
		
		this.drawing = true;
		this.points = [];
		this.addMousePoint();
		this.time = 1;
		
		this.distances = []; // distances[i] specifies the distance from points[i - 1] to points[i].
		
		this.scale = 1.0;
		this.displacement_mag;
		this.total_distance = 0.0;
		
	},
	
	mouseReleased()
	{
		this.world.mouseReleased();
		
		this.drawing = false;
		
		this.scale = room_w*22/24 / this.total_distance;
		
	}
}
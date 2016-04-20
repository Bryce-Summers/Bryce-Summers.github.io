/* 
 * A visualization of the conservation of Energy.
 * Written on 2/3/2016 by Bryce Summers
 * New version written on 3/21/2016.
 *
 *
 * Here are some thoughts on how to prgress on this animation.
 * I could replace the simple rolling ball with roller coaster cars.
 * I should fix the interaction with the friction.
 *
 */

// Constructor.
function visual_conservation_of_energy()
{
	// Worlds are pretty much always useful.
	this.world = new ObjContainer();
}

visual_conservation_of_energy.prototype =
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
		return "";
	},
	
	// The text that will accompany the right visualization as a description.
	text_right()
	{
		return  "";
	},
	
	/* Let us define the coordinate system we are working in.
	 * max_y = minnimum elevation = room_h*3/4
	 * min_y = maximum  elevation = room_h/4.
	 * 
	 * We will be evaluating positions in one to one coorespondense with the
	 * dimensions of the screen.
	 */

	// All visualizations can be restarted.
	restart()
	{
		this.world.make_empty();
		this.time = 0;
		
		// -- Define local variables.
		this.coaster_radius = 40;

		this.min_x = room_w/24;
		this.max_x = room_w*23/24;
		this.min_y = room_h/4;
		this.max_y = room_h*3/4;

		this.low_y  = this.max_y;
		this.high_y = this.min_y + this.coaster_radius*2;

		this.mid_x = room_w/2;
		this.mid_y = room_h/2;

		this.control_pts = [];
		this.initialize_control_points(this.control_pts);
		
		this.generatePath();
		
		//this.computeOffsetCurve(this.lines, this.offsets);

		this.initialize_ui();
	},
	
	generatePath()
	{
		
		this.catmull_rom_control_pts(this.control_pts);
		
		this.splines = [];
		this.createSplines(this.control_pts, this.splines);

		this.lines = [];
		this.offsets = [];
		this.discretize_splines(this.splines, this.lines, this.offsets);

		this.line_index = 0;
		this.line_percentage = 0;
		
		this.last_line_index      = this.line_index;
		this.last_line_percentage = this.line_percentage;
		
		// Rollercoaster positioning.
		this.coaster_position = this.control_pts[this.line_index].pos;
				
		// Roller coaster dynamics.
		this.total_energy = (room_h - this.coaster_position.y) + 30; // Unit mass, unit gravity.

		this.angle = 0;

		this.direction = 1;
		this.friction = .001;
	},
	
	// INPUT : An array of ctrl points.
	// Changes the tangents of each of the points to catmull rom tangents.
	catmull_rom_control_pts(pts)
	{
		var len = pts.length;

		pts[0].tangent = p5.Vector.sub(pts[1].pos, pts[0].pos);

		for(var i = 1; i < len - 1; i++)
		{
			pts[i].tangent = p5.Vector.sub(pts[i + 1].pos, pts[i - 1].pos).mult(.5);
		}

		pts[len - 1].tangent = p5.Vector.sub(pts[len - 1].pos, pts[len - 2].pos);
	},

	stop()
	{
		
	},
		
	// Update's this OBJ's internal states.
	update()
	{
		this.world.update();
		
		if(this.lines)
		{
					
			this.potential_energy = (room_h - this.coaster_position.y); // Unit mass, unit gravity.
			var k_energy = this.total_energy - this.potential_energy;

			// Account for friction.
			k_energy -= this.friction*k_energy;
			this.total_energy = this.potential_energy + k_energy;
			
			if(k_energy < .1)
			{
				this.direction *= -1;
				k_energy = 0; // Just teleport to the last location.
				this.line_index = this.last_line_index;
				this.line_percentage = this.last_line_percentage;
			}
			
			this.last_line_index = this.line_index;
			this.last_line_percentage = this.line_percentage;
			
			// NOTE: This fails for negative kinetic energy.
			var vel = sqrt(k_energy);

			// angular distance is percentage of circumference the velocity travels over a unit time interval.
			// We then unnormalize this quantity by multiplying by a further 2 PI.
			this.angle += this.direction*vel / (this.coaster_radius*2*PI) * TWO_PI;
									
			// Note: by passing the line discretization in as an argument,
			// We can easily switch between doing roller coaster kinematics on the track position or the offset position.
			if(this.direction > 0)
			{
				this.move_forward(vel, this.offsets);
			}
			else
			{
				this.move_backward(vel, this.offsets);
			}

			this.updatePosition(this.offsets);
		}
		
	},

	// Update the cached location of the coaster car.
	updatePosition(lines)
	{
		if(0 <= this.line_index && this.line_index < this.lines.length - 1)
		{	
			var p0 = lines[this.line_index];
			var p1 = lines[this.line_index + 1];
			this.coaster_position = this.lerp(p0, p1, this.line_percentage);
		}
	},
	
	// Move the determining variables forward by the given velocity.
	move_forward(v, lines)
	{
		if(this.line_index >= lines.length - 1)
		{
			this.line_index -= 1;
		}
		
		var p0 = lines[this.line_index];
		var p1 = lines[this.line_index + 1];

		if(!p0 || !p1)
		{
			console.log(this.line_index + " " + p0 + ", " + p1);
			return;
		}
		
		// We lerp the p0 term, to treat it like a full line,
		// This allows us to prevent special casing for the beginning.
		p0 = this.lerp(p0, p1, this.line_percentage);

		var dist;

		// Iterate through lines by distance until we get to the final one.
		do
		{
			dist = p0.dist(p1);
			if(dist > v)
			{
				break;
			}

			v -= dist;
			this.line_index += 1;

			if(this.line_index >= lines.length - 1)
			{
				this.line_index = lines.length - 2;
				this.line_percentage = 0.0;
				break;
			}

			p0 = p1;
			p1 = lines[this.line_index + 1];
			this.line_percentage = 0.0;
		}while(true);

		p0 = lines[this.line_index];
		p1 = lines[this.line_index + 1];
		dist = p0.dist(p1);

		// Determine the percentage of the last one.
		if(dist > .001)
		this.line_percentage += v/dist;
	},
	
	move_backward(v, lines)
	{
		if(this.line_index < 0)
		{
			this.line_index = 0;
		}
		if(this.line_index > lines.length - 2)
		{
			this.line_index = lines.length - 2;
		}
		
		var p0 = lines[this.line_index];
		var p1 = lines[this.line_index + 1];

		// We lerp the p1 term, to treat it like a full line,
		// This allows us to prevent special casing for the right beginning.
		p1 = this.lerp(p0, p1, this.line_percentage);

		var dist;

		// Iterate through lines by distance until we get to the final one.
		do
		{
			dist = p0.dist(p1);
			if(dist > v)
			{
				break;
			}

			v -= dist;
			this.line_index -= 1;

			if(this.line_index <= 0)
			{
				this.line_index = 1;
				this.line_percentage = 1.0;
				break;
			}

			p1 = p0;
			p0 = lines[this.line_index];
			this.line_percentage = 1.0;
		}while(true);

		p0 = lines[this.line_index];
		p1 = lines[this.line_index + 1];
		dist = p0.dist(p1);

		// Determine the percentage of the last one.
		if(dist > .001)
		this.line_percentage -= v/dist;
	},
	
	// Move backward by the given velocity.
	lerp(p0, p1, per_1)
	{
		return p0.copy().mult(1.0 - per_1).add
			  (p1.copy().mult(per_1));
	},
	
	// -- Here are the mathematical worker functions.
	
	// This populates the control points to their original values.
	// ASSUMES that cpts is an empty list.
	initialize_control_points(cpts)
	{
		// Beginning of chain lift.
		var c0 = new control_point(createVector(this.min_x, this.low_y),
							  this.unit_vector(PI/4));

		c0.chain_lift = true;

		// End of chain lift and hill.
		var c1 = new control_point(createVector(this.mid_x, this.high_y),
							  this.unit_vector(0).mult(room_w/4));

		var x_2 = this.mid_x*.5 + this.max_x*.5;
		var y_2 = this.mid_y;
		var angle_2 = 0;
								   
		var c2 = new control_point(createVector(x_2, y_2),
							  this.unit_vector(angle_2).mult(room_w/4));


		var x_3 = this.mid_x*0 + this.max_x*1;
		var y_3 = this.high_y;
		var angle_3 = PI/4;

		var c3 = new control_point(createVector(x_3, y_3),
							  this.unit_vector(angle_3).mult(room_w/4));

		/*
		cpts.push(c0);
		cpts.push(c1);
		cpts.push(c2);
		cpts.push(c3);
		*/

		// Simply generate an array of control points.
		var min = 10;
		var max = room_w - 10;
		var len = 10;
		for(var i = 0; i < len; i++)
		{
			var pt = new control_point(createVector(min + (max - min)*i/len, room_h/4 + (room_h/2 - min)*sin(i*1.0/(len - 1)*PI)),
										this.unit_vector(0).mult(room_w/len));
			cpts.push(pt);
		}
	},

	// ASSUMES: splines should be empty.
	// cpts contains the relevant control points.
	createSplines(cpts, splines)
	{
		var len = cpts.length;
		for(var i = 0; i < len - 1; i++)
		{
			var c0 = cpts[i];
			var c1 = cpts[i + 1];
			splines.push(new spline(c0.pos, c0.tangent, c1.pos, c1.tangent));
		}
	},
	
	// Converts from splines to lines.
	// Note: we represent lines as a list of vector positions.
	discretize_splines(splines, lines, offsets)
	{
		// Start the positions.
		var p0 = splines[0].evaluate(0);
		lines.push(p0);
		
		// Start the offsets.
		var o0 = splines[0].eval_offset(0, this.coaster_radius/2);
		offsets.push(o0);
		
		var tolerance = 10;
		
		for(var index = 0; index < splines.length; index++)
		{
			var spline = splines[index];
			this.discretize_spline(p0, spline, lines, tolerance);
			this.discretize_spline_offset(o0, spline, offsets, tolerance);
		}
	},

	// Converts one spline to a line.
	// p0 is the first vector point,
	// which is assumed to be already at the end 
	// of the lines array.
	// the spline is sampled sufficiently tolerance ('tol').
	// all points are appended to lines.
	discretize_spline(p0, spline, lines, tol)
	{
		var S = [];// Stack.
		S.push(1.0);
		var low = 0;
		var p_low = spline.evaluate(low);
		// The stack stores the right next upper interval.
		// The lower interval starts at 0 and is set to the upper interval
		// every time an interval is terminated after subdivision is sufficient.

		// Left to right subdivision loop.
		while(S.length != 0)
		{
			var high   = S.pop();
			var p_high = spline.evaluate(high);
		
			// Subdivision is sufficient, move on to the next point.
			while(p_low.dist(p_high) > tol)
			{
				// Otherwise subdivide the interval and keep going.
				S.push(high);
				high = (low + high)/2.0;
				p_high = spline.evaluate(high);
			}		
		
			lines.push(p_high);
			low = high;
			p_low = p_high;
			continue;
		}
	},
	
	discretize_spline_offset(o0, spline, lines, tolerance)
	{
		var S = []; // Stack.
		S.push(1.0);
		var low = 0;
		var p_low = spline.eval_offset(low, this.coaster_radius/2);
		// The stack stores the right next upper interval.
		// The lower interval starts at 0 and is set to the upper interval.
		// every time an interval is terminated after subdivision is sufficient.

		// Left to right subdivision loop.
		while(S.length != 0)
		{
			var high   = S.pop();
			var p_high = spline.eval_offset(high, this.coaster_radius/2);

			// Subdivision is sufficient, move on to the next point.
			while(p_low.dist(p_high) > tolerance)
			{
				// Otherwise subdivide the interval and keep going.
				S.push(high);
				high = (low + high)/2.0;
				p_high = spline.eval_offset(high, this.coaster_radius/2);
			}

			lines.push(p_high);
			low = high;
			p_low = p_high;
			continue;
		}
		
	},

	unit_vector(angle)
	{
		return createVector(cos(angle), -sin(angle));
	},

	// Draws the given OBJ to the screen.
	// Variables in represent the region on the screen that this visualization
	// should be drawn on.
	draw(x_in, y_in, w, h)
	{
		this.drawCoasterBody();
		this.drawDiscreteTrack();
		
		this.world.draw(x_in, y_in);
	},
	
	// -- Drawing methods.
	drawCoasterBody()
	{
		// Draw The coaster body.
		var pos    = this.coaster_position;
		var radius = this.coaster_radius;
		
		noFill();
		stroke(0, 0, 0);
				
		ellipse(pos.x, pos.y, radius, radius);
		
		// The radius of the ellipse.
		var e_rad = radius / 2;
		
		arc(pos.x, pos.y, e_rad, e_rad, this.angle, this.angle + PI/8);
		arc(pos.x, pos.y, e_rad, e_rad, this.angle + PI, this.angle + PI + PI/8);
	},
	
	drawDiscreteTrack()
	{
		
		fill(0, 0, 0);

		noFill();
		beginShape();
		var points = this.lines;
		for(var i = 0; i < points.length; i++)
		{
			var point = points[i];
			vertex(point.x, point.y);
		}
		endShape();
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
	},
	
	initialize_ui()
	{

		// Make a slide for every control point in this.control_pts;
		var len = this.control_pts.length;

		for(var i = 0; i < len; i++)
		{
			// Get the Current Control point.
			var pt = this.control_pts[i];
			
			var knob_size = 10;
			
			// The position slider.
			var pos = new gui_Slider(pt.pos.x, pt.pos.y, knob_size, knob_size, knob_size, true);// Note: the true at the end makes it unbounded.
			pos.setPer(1.0, 0);
			pos.world_pt = pt;// Give the slider a reference to this point.
			pos.world = this;
			pos.action = function(x, y)
			{
				this.world_pt.pos.x = x;
				this.world_pt.pos.y = y;
				this.world.generatePath();
			}
			//pos.message = "Coeficient of Restitution: 1.0";
			this.world.push(pos);
		}

		var knob_size = 20;
		
		// The position slider.
		var slider = new gui_Slider(100, room_h/4, 100, knob_size, knob_size);// Note: the true at the end makes it unbounded.
		slider.setPer(0.0, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			var min = .001;
			var max = .1;
			this.world.friction = min + x*(max - min);
		}
		slider.message = "Friction";
		this.world.push(slider);

		var button = new gui_Button(200, room_h/4, 100, knob_size);
		this.world.push(button);
		button.message = "Reset";
		button.world = this;
		button.action = function(){
			
			this.world.generatePath();
		}
	
	}
	
}


// loc is a P5js vector.
// Location and a tangent.
function control_point(loc, tan)
{
	this.pos = loc;
	this.tangent = tan;
	this.chain_lift = false;
}

//control_point.prototype =

// Two points and two tangents.
function spline(p1, t1, p2, t2)
{
	// Please see https://brycesummers.wordpress.com/2014/09/24/cubic-spline/
	// for details about this change of basis from geometrically intuitive objects
	// to polynomial coeficients.
	this.A = p5.Vector.add(p5.Vector.add(p5.Vector.sub(p5.Vector.mult(p1, 2), p5.Vector.mult(p2, 2)), t1), t2);
	this.B = p5.Vector.sub(p5.Vector.sub(p5.Vector.add(p5.Vector.mult(p1, -3), p5.Vector.mult(p2, 3)),
			 p5.Vector.mult(t1, 2)), t2);
	this.C = t1.copy();
	this.D = p1.copy();
}

spline.prototype =
{
	evaluate(time)
	{
		// Evaluate the polynomial.
		var t = time;
		// return this.A*t_3 + this.B*t_2 + this.C*t_1 + this.D;

		var out = this.A.copy();
		
		// ((A*t + B)*t + C)*t + D.
		return out.mult(t).add(this.B).mult(t).add(this.C).mult(t).add(this.D);
	},

	eval_tangent(t)
	{
		var out = this.A.copy();
		return out.mult(3).mult(t).add(this.B.copy().mult(2)).mult(t).add(this.C);
	},
	
	eval_offset(t, amount)
	{
		var tan = this.eval_tangent(t);
		tan.normalize();
		tan.mult(amount);
		var x = tan.x;
		var y = tan.y;
		tan.x =  y;
		tan.y = -x;
		
		return this.evaluate(t).add(tan);
	}
}


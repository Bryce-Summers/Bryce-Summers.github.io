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
		return "Distance vs. Displacement.";
	},
	
	// The Title that will be displayed on the screen for the right visualization.
	title_right()
	{
		return "";
	},
	
	// The text that will accompany the left visualization as a description.
	text_left()
	{
		return "Please click and drag to specify an example movement.";
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
	},
	
	addMousePoint()
	{
		this.last_x = mouseX;
		this.last_y = mouseY;
		this.points.push(createVector(this.last_x, this.last_y));
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
			for(var i = 0; i < len; i++)
			{
				var vec = this.points[i];
				vertex(vec.x, vec.y);

				length += dist(vec_last.x, vec_last.y, vec.x, vec.y);
				vec_last = vec;
			}
			endShape();
		}

		if(len >= 2)
		{
			fill(255, 0, 0);
			strokeWeight(10);
			var p1 = this.points[0];
			var p2 = this.points[len - 1];
			line(p1.x, p1.y, p2.x, p2.y);
			var displacement = dist(p1.x, p1.y, p2.x, p2.y);
			
			strokeWeight(1);
			textSize(32);
			var y = room_h/2;
			text("Displacement = " +  "<" + this.round(p2.x - p1.x) + ", " +
				this.round(p2.y - p1.y) + ">",
					room_w*10/24, y); y += 64;
			text("Distance = " +     this.round(length), room_w*10/24, y); y += 64;
			text("Average_speed = " + this.round(length/this.time), room_w*10/24, y); y += 64;
			text("Average_velocity = " + "<" + this.round((p2.x - p1.x)/this.time) + ", " +
				this.round((p2.y - p1.y)/this.time) + ">", room_w*10/24, y); y += 64;
			
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
	},
	
	mouseReleased()
	{
		this.world.mouseReleased();
		
		this.drawing = false;
	}
}
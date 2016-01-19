/* 
 * Fluid Circulation Visualization.
 *
 * Written on 1/14/2016 by Bryce Summers
 *
 * Shows a non divergant vector field.
 */
 
// Constructor.
function visual_fluid_incompressibility()
{
  this.vectors = [];
  
  this.w = 8;
  this.h = 8;
  this.len = this.w*this.h;
  
  for(var i = 0; i < this.len; i++)
  {
	  var random_number = random(TWO_PI);
	  this.vectors.push(random_number);  // createVector(cos(random_number), sin(random_number)));
  }
}

visual_fluid_incompressibility.prototype =
{
	// Update's this OBJ's internal states.
	update()
	{
		for(var i = 0; i < this.len; i++)
		{
			this.vectors[i] = (this.vectors[i] + .01) % TWO_PI;
		}		
	},

	// Draws the given OBJ to the screen.
	draw(x, y)
	{
		stroke(0);
				
		for(var i = 0; i < this.len; i++)
		{
			var x = i % this.w;
			var y = ~~(i / this.h);
			
			//var vec = this.vectors[i];
			var val = this.vectors[i];
			var vec = createVector(cos(val), sin(val));
			
			// Extract and fix these values in the future.
			x *= 100;
			y *= 100;
			
			x += room_w/2 - 100*4 + 50;
			y += room_h - 100*8;
			
			var x_perp = -vec.y;
			var y_perp = vec.x;
			
			strokeWeight(1);
			fill(abs(val - PI)*255/PI);
			rect(x - 50, y - 50, 100, 100);
		
			strokeWeight(5);		
			// Arrow shaft.
			line(x, y, x + vec.x*25, y + vec.y*25);
			
			// Arrow head.
			line(x + vec.x*25, y + vec.y*25, x + vec.x*20 + x_perp*5, y + vec.y*20 + y_perp*5);
			line(x + vec.x*25, y + vec.y*25, x + vec.x*20 - x_perp*5, y + vec.y*20 - y_perp*5);
		}
	},
	
	// Returns true iff this OBJ should be deleted.
	dead()
	{
		return false;
	}
}
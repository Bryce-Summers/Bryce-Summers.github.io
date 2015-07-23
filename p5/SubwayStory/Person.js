/* 
 * Person Class.
 * Written on 7/6/2015 by Bryce Summers
 *
 * Represents the appearance and individual traits of people.
 */
 
 // Constructor.
 // Constructs a random person.
function Person()
{

	var index1 = this.randInt(data_names.length);
	var index2 = this.randInt(data_names.length);
	this.name = data_names[index1] + " " + data_names[index2];
		
	
	index1 = this.randInt(data_goals.length);
	index2 = this.randInt(data_goals.length);
	this.goal = data_goals[index1] + " and " + data_goals[index2];

	
	this.eyes = this.randInt(2);
	this.eye_color = this.randInt(200) + 55;
	
	this.nose = this.randInt(2);
	
	
	this.mouth = this.randInt(2);
	this.ears = this.randInt(2);
	this.skin_color = this.randInt(200) + 55;
	this.body = this.randInt(2);

	this.station = this.randInt(station_count - 1);
	
	
}

Person.prototype =
{
	randInt(range)
	{
		return Math.floor(Math.random()*range);
	},
	
	update()
	{

	},

	// Assuming it is drawn on a square of size 50 by 50.
	draw(x, y)
	{
		ellipseMode(CORNER);
		
		stroke(0);
		fill(this.skin_color);
		
		
		var draw_function;
		
		// Body.
		draw_function = this.body === 0 ? ellipse : rect;
		draw_function(x + 10, y + 10, 30, 30);

		// Eyes.
		draw_function = this.eyes === 0 ? ellipse : rect;
		fill(this.eye_color);
		draw_function(x, y, 20, 20);
		draw_function(x + 50 - 20, y, 20, 20);
		
		draw_function = this.mouth === 0 ? ellipse : rect;
		fill(this.eye_color);
		draw_function(x + 15, y + 30, 20, 10);
		
		draw_function = this.nose === 0 ? ellipse : rect;
		fill(this.eye_color);
		draw_function(x + 20, y + 20, 10, 10);
	},
	
	// The predicate that determines whether a Person has completed their journey.
	done()
	{
		if(scene.index === this.station)
		{
			return true;
		}
		
		return false;
	},
	
	getText(value)
	{
		if(value === 0)
		{
			return "circle";
		}
		else
		{
			return "square";
		}	
	}
}
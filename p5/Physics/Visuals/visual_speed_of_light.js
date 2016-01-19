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
  this.time = 0;
}

visual_speed_of_light.prototype =
{
	// Update's this OBJ's internal states.
	update()
	{
		this.time = (this.time + 1) % room_h;
	},

	// Draws the given OBJ to the screen.
	draw(x, y)
	{
		
		stroke(0,0,0);
		
		ellipse(room_w/2, room_h/2, this.time, this.time);
		
		text("constant", room_w/2, room_h/2);
		
	},
	
	// Returns true iff this OBJ should be deleted.
	dead()
	{
		return false;
	}
}
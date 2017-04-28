/* 
 * Object Class
 * Written on 7/6/2015 by Bryce Summers
 * Represents genaric entities that can be updated and drawn to a screen.
 */
 
 // Constructor.
 // Constructs a random person.
function OBJ()
{

}

OBJ.prototype =
{
	// Update's this OBJ's internal states.
	update()
	{

	},

	// Draws the given OBJ to the screen.
	draw(x, y)
	{
	
	},
	
	// Returns true iff this OBJ should be deleted.
	dead()
	{
		return false;
	}
}
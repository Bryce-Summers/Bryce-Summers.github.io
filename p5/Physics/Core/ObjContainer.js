/* 
 * Object container.
 * Abstracts out the update, destroying,
 * and updating loops for simulations and scenes involving lots of different objects.
 * 
 * REQUIRES: The Bryce Linked List data structure.
 * Written on 1/20/2016 by Bryce Summers.
 * 
 */
 
// Constructor.
function ObjContainer()
{
	this.objs = new List();
}

ObjContainer.prototype =
{
	// elem : OBJ.
	push(elem)
	{
		this.objs.push(elem);
	},
	
	make_empty()
	{
		this.objs.make_empty();
	},
	
	iterator()
	{
		return this.objs.iterator();
	},
	
	// Update's this OBJ's internal states.
	update()
	{
		var iter = this.objs.iterator();
	
		// Update all elements, remove dead ones.
		while(iter.hasNext())
		{		
			var elem = iter.next();
			elem.update();
			if(elem.dead())
			{
				iter.remove();
			}
		}
	},

	// Draws the given OBJ to the screen.
	draw(x, y)
	{
		var iter = this.objs.iterator();
	
		// Update all elements, remove dead ones.
		while(iter.hasNext())
		{		
			var elem = iter.next();
			elem.draw(x, y);
		}
	},
	
	// Returns true iff this OBJ should be deleted.
	dead()
	{
		return false;
	},
	
	mousePressed()
	{
		var iter = this.objs.iterator();
	
		// Call the mouse pressed function on every element if it has a mousePressed function.
		while(iter.hasNext())
		{		
			var elem = iter.next();
			if(elem.mousePressed)
			{
				elem.mousePressed();
			}
		}
	},
	
	mouseReleased()
	{
		var iter = this.objs.iterator();
		
		// Call the mouse pressed function on every element if it has a mousePressed function.
		while(iter.hasNext())
		{		
			var elem = iter.next();
			if(elem.mouseReleased)
			{
				elem.mouseReleased();
			}
		}
	}
	
}
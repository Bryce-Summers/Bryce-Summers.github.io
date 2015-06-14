/* 
 * Car Class.
 * Written on 6/11/2015 by Bryce Summers
 */
 
 
 // Constructor.
function Car(y)
{
	this.x = 0;
	this.y = y;
}

Car.prototype =
{  
	update()
	{
		this.x += 1;
	},
	
	draw()
	{
		fill(255, 0, 0);
		rect(this.x, this.y, unit*5, unit*3);
	}
}
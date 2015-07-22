/*
 * Circle Float class.
 *
 * Written by Bryce Summers on 7/21/2015.
 */
function CircleFloat(x, y, good, radius)
{
	this.x = x;
	this.y = y;
	this.good = good;
	
	angleMode(RADIANS);
	this.angle = Math.floor(Math.random()*TWO_PI);
	
	this.x_offset = sin(this.angle);
	this.y_offset = cos(this.angle);
	
	this.radius = radius;
	
	this.offset = 0;
}

CircleFloat.prototype =
{
	draw()
	{
		if(this.good)
		{
			fill(0, 255, 0);
		}
		else
		{
			fill(255, 0, 0);
		}
		
		this.offset += .4;

		ellipse(this.x - this.radius + this.x_offset*this.offset,
				this.y - this.radius + this.y_offset*this.offset, this.radius, this.radius);
	},
	
	done()
	{
		return this.offset >= this.radius*3/2;
	}
}
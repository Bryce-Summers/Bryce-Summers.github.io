/* Station Description Class.
 * Written on 6/11/2015 by Bryce Summers
 */
 
// Constructor.
function StationScene()
{
	this.car_list = [];
}

StationScene.prototype =
{
  
  update()
  {

	for (var i = 0; i < this.car_list.length; i++)
	{
		this.car_list[i].update();
	}
	
	if(Math.random() < .1)
	{
		this.car_list.push(new Car(unit*1));
	}
  },
  
  draw()
  {
	fill(0);
	background();
  
	// Upper Platform.
	this.platform(0);
	
	// Middle Platform.
	this.platform(4*unit);
	
	// Lower Platform.
	this.platform(8*unit);

	for (var i = 0; i < this.car_list.length; i++)
	{
		this.car_list[i].draw();
	}
	
  },
  
  // Draws a Platform.
  platform(y)
  {
	fill(170);
	rect(0, y, room_w, unit*2);
	
	fill(200);
	var u2 = unit/2;
	var u4 = unit/4;
	var u8 = unit/8;
	for(var c = 0; c < room_w; c += unit)
	for(var r = y; r <= y + unit; r += unit)
	{
		rect(c + u8, r + u8, u2, u2, u8);
	}
	
	fill(50);
	rect(0, y + unit*2, room_w, unit);
  
  }
}
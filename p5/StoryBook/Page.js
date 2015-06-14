/*
 * Page Class.
 * 
 * Written By Bryce Summers on 6-14-2015.
 *
 * This class handles the information for a particular page.
 */
 
 // background : p5JS image, sprites : Sprite[]
 function Page(background, sprites, story)
 {
	this.background = background;
	this.sprites = sprites;
	this.story = story;
 }
 

Page.prototype =
{
	// void.
	draw()
	{
		image(this.background, 0, 0);
		
		var len = this.sprites.length;
		for(var i = 0; i < len; i++)
		{
			this.sprites[i].draw();
		}
		
		this.story.draw();
	}
}
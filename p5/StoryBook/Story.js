/*
 * Story Class.
 * 
 * Written By Bryce Summers on 6-14-2015.
 *
 * Contains information about each verse.
 */
 
// String*String*String[] .
function Story(verse1, verse2, choices)
{
	this.verse1 = verse1;
	this.verse2 = verse2;
	this.choices = choices;
}

Story.prototype =
{
	draw()
	{
		textSize(32);
		fill(0);
		text(this.verse1 + this.choices[0] + this.verse2, 0, room_h - 50);
		
		console.log(this.verse1 + this.choices[0] + this.verse2);
	}
}
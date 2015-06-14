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
	this.verse2 = verse1;
	this.choices = choices;
}
 
Story.prototype =
{
	draw()
	{
		textSize(32);
		text(this.verse1 + choices[0] + this.verse2);	
	}
}
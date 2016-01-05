/*
 * Physics Room Specifications.
 * Written by Bryce Summers on 1/4/2016.
 *
 * Purpose: Forms the Graph of different information rooms in my physics information repository.
 */
 
function room_specifications()
{
	this.text_size = 20;
	
	this.button_w = 200;
	
	// Half button width.
	this.button_hw = this.button_w/2;
	
	this.button_h = 30;
	this.button_hh = this.button_h/2;
	
	this.text_height = 20;
	
}

room_specifications.prototype =
{
	setup: function()
	{
		// Here are the rooms, note: They are defined at global scope.
		room_menu = new Room();
		room_kinetic_energy = new Room();
		room_energy = new Room();
		room_work   = new Room();
		
		// Create the HTML elements.
		this.createHTML();
		
		//-- Initialize the table of contents room.
		//this.initiateTableOfContents(room_menu);

		room_menu.start_function = function()
		{
			spec.clearText();
			spec.setText(text_center,
				link("Energy", "room_energy") + ", " +
				link("Kinetic Energy", "room_kinetic_energy")
			);
		}		
		room.goto(room_menu);


		// Now instantiate all of the content rooms.
		this.newFormulaRoom(room_kinetic_energy,
			"Kinetic Energy",
			"Kinetic energy is the "+ link("energy", "room_energy") +" an objects possess by virtue of its motion. " +
				"We define the kinetic energy of an object to be as follows: " +
				"$$E_{k} = \\frac{1}{2} \\cdot m \\cdot v^{2}$$",
			"Kinetic Energy = $\\frac{1}{2} \\cdot mass \\cdot velocity^{2}$",
			"$$E_{k} \\left[\\frac{kg \\cdot m^{2}}{s^{2}} \\right] = \\frac{1}{2}*m\\left[kg\\right]*v\\left[\\frac{m}{s}\\right]^{2}$$");
			
		// Now instantiate all of the content rooms.
		this.newFormulaRoom(room_energy,
			"Energy",
			"Energy is the ability for an object to do work (W), where $$W = F \\cdot d$$",
			"Energy is the ability for an object to do work (W), where $$Work = Force \\cdot displacement$$",
			"Energy is Measured in Joueles[J], where $$[J] = \\left[\\frac{kg \\cdot m^{2}}{s^{2}}\\right]$$");
		
		
		
		
	},
	
	initiateTableOfContents: function(room_menu)
	{

	},
	
	// Inputs: Room, String, String, String, String.
	newFormulaRoom: function(room, title_text, formula_text, english_text, units_text)
	{		
		/*
		var title	 = new gui_Button(room_w/2 - this.button_hw, this.button_hh, this.button_w, this.button_h*2);
		title.text_size = 40;
		title.message = title_text;
		room.addButtonOBJ(title);
		*/
		
				
		/*
		var formula = new gui_Button(room_w/2 - this.button_hw, room_h/2 + this.button_hh, this.button_w, this.button_h);
		formula.setMouseAction(noop);
		formula.message = formula_text;
		room.addButtonOBJ(formula);
		*/
		
		var x = this.button_w/2;
		var button_0 = new gui_Button(x, 0, this.button_w, this.button_h);x+= this.button_w;
		var button_1 = new gui_Button(x, 0, this.button_w, this.button_h);x+= this.button_w;
		var button_2 = new gui_Button(x, 0, this.button_w, this.button_h);x+= this.button_w;
		var button_3 = new gui_Button(x, 0, this.button_w, this.button_h);x+= this.button_w;
		
		room.addButtonOBJ(button_0);
		room.addButtonOBJ(button_1);
		room.addButtonOBJ(button_2);
		room.addButtonOBJ(button_3);
		
		button_0.message = "Original";
		button_0.action = function(){spec.setText(text_center, formula_text);}
		
		button_1.message = "Please Use English!";
		button_1.action = function(){spec.setText(text_center, english_text);}
	
		button_2.message = "Please show Units";
		button_2.action = function(){spec.setText(text_center, units_text);}
		
		button_3.message = "Please show Visuals";
		
		room.start_function = function()
		{
			//this.clearText();
			spec.setText(text_center, formula_text);
			spec.setText(text_title, title_text);
		}
		
		
		return room;
	},
	
	createHTML()
	{
		/* Displaying Text. */
		text_title = document.getElementById('title');
		text_title.style.position = 'absolute';
		//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this.
		text_title.style.width  = room_w;
		text_title.style.height = this.button_h;
		text_title.style.backgroundColor = "clear";//"white";"clear";
		text_title.style.color="#000000";//black
		text_title.style.textAlign="center";
		//text_title.style.verticalAlign="center";
		text_title.innerHTML = "";
		text_title.style.fontSize = this.text_height*2 + "px";
		text_title.style.top = 0;
		text_title.style.left = 0 + 'px';
		text_title.style.fontFamily="'Poiret One', cursive";
		//document.body.appendChild(text_title);
		
		
		/* Displaying Text. */
		text_center = document.createElement('div');
		text_center.style.position = 'absolute';
		//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this.
		text_center.style.width  = room_w;
		text_center.style.height = this.button_h;
		text_center.style.backgroundColor = "clear";//"white";"clear";
		text_center.style.color="#000000";//black
		text_center.style.textAlign="center";
		//ttext_center.style.verticalAlign="center";
		text_center.innerHTML = "";
		text_center.style.fontSize = this.text_height + "px";
		text_center.style.top = room_h/2;
		text_center.style.left = 0 + 'px';
		//text2.style.fontFamily="'Play', sans-serif";
		document.body.appendChild(text_center);
		
		// A Text link to go back to the table of contents.
		text_home = document.createElement('div');
		text_home.style.position = 'absolute';
		//text_home.style.zIndex = 1;    // if you still don't see the label, try uncommenting this.
		text_home.style.width  = this.button_w/2;
		text_home.style.height = this.button_h;
		text_home.style.backgroundColor = "clear";//"white";"clear";
		text_home.style.color="#000000";//black
		text_home.style.textAlign="center";
		//ttext_center.style.verticalAlign="center";
		text_home.innerHTML = link("home", "room_menu");
		text_home.style.fontSize = this.text_height + "px";
		text_home.style.top = 0;
		text_home.style.left = 0 + 'px';
		//text2.style.fontFamily="'Play', sans-serif";
		document.body.appendChild(text_home);
		
	},
	
	// Sets all of the html elements to the empty string.
	clearText()
	{
		text_center.innerHTML = "";
		text_title.innerHTML  = "";
	},
	
	// Test is an html element.
	// message is a string.
	setText(text, message)
	{
		// Change the html.
		text.innerHTML = message;
		
		// Typeset the new message usng mathjax.
		MathJax.Hub.Queue(["Typeset",MathJax.Hub,text]);
	},

}

// Returns an html string creating a link that goes to another local page for this web application.
function link(text, page)
{
	return "<a href=\"PleaseEnableJavascript.html\" onclick=\"room.goto(" + page + ");return false;\">" + text + "</a>";
}
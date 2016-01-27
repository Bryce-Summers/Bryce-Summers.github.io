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
		
/* The Plan
		 
Bosons and Fermions
Speed of Light
Standard Units
 - Second. (Time)
 - Meter.  (Displacement)(Based on Speed of light.)
 - 
 */
		
	
		// Here are the rooms, note: They are defined at global scope.
		room_menu = new Room();
		room_kinetic_energy = new Room();
		room_energy = new Room();
		room_work   = new Room();
		room_visual_demo = new Room();
		
		room_speed_of_light = new Room();
		room_si_units = new Room();
		
		// Standard Units (SI) Rooms.
		room_kilograms = new Room();
		room_meters    = new Room();
		room_seconds   = new Room();
		room_ampere    = new Room();
		room_kelvin    = new Room();
		room_mole      = new Room();
		room_candela   = new Room();
						
		
		// Create the HTML elements.
		this.createHTML();
		
		//-- Initialize the table of contents room.
		//this.initiateTableOfContents(room_menu);

		room_menu.start_function = function()
		{
			spec.clearText();
			spec.setText(text_center,
				link("Speed of Light", "room_speed_of_light") + ", " +
				link("SI Units", "room_si_units") + ", " + 
				link("length", "room_meters") + ", " +
				link("mass", "room_kilograms") + ", " +
				link("time", "room_seconds") + ", " +
				link("electric current", "room_ampere") + ", " +
				link("thermodynamic temperature", "room_kelvin") + ", " +
				link("amount of a substance", "room_mole") + ", " +
				link("luminous intensity", "room_candela") + ", " +
				link("Energy", "room_energy") + ", " +
				link("Kinetic Energy", "room_kinetic_energy") + ", " +
				link("Visual Demo", "room_visual_demo")
			);
		}		
		
		room.goto(room_menu, true);

		//newFormulaRoom: function(room, title_text, english_text, formula_text, units_text, visual)
		
		// Now instantiate all of the content rooms.
		this.newFormulaRoom(room_speed_of_light,
			"Speed of Light",
			"All massless particles in the universe travel at a <b>constant</b> speed though any specific medium. " +
			"In particular, light travels at its fastest speed while travelling through a vacuum. <br>"+
			"The speed of light in a vacuum is a theoretical upper bound on the rate information propogates in the universe and is also used " +
			"to define other standard quantities related to our existence such as <br>" +
			"the length of a single " + link("meter", "room_meters") + ".",
			
			"The speed of light in a vacuum is usually denoted as $c$. <br> If the speed of light in a given material is $v$, then the index of refraction $\\eta$ of the material is $$\\eta = \\frac{c}{v}$$" +
			"$\\eta$ may be interpretted as how many times slower light travels in a given material than in a vacuum. <br>" +
			"If $f$ is the frequency of a light wave and $\\lambda$ is the wavelength, then $v = f \\cdot \\lambda$, this means that the frequency of light is inversly proportional to its wavelength.",
			"The speed of light is a speed and is therefore denoted with units of $\\frac{m}{s}$. Please see " + link("meters (m)", "room_meters") + " and " + link("seconds (s)", room_seconds) + "." +
			"<br>The index of refraction $\\eta$ is a unitless number and merely describes a ratio between speeds. " +
			"<br>Frequency $f$ is measured in Hertz which are $\\frac{1}{s}$. <br>Wavelength $\\lambda$ is measured in meters.",
			new visual_speed_of_light());
		
		this.newFormulaRoom(room_meters,
			"Length",
			"Length is a measurement of a dimension in space and is used to compare displacements and sizes in space. " +
			"",
			"",
			"Length is specified in terms of multiples of a <b>meter</b>. A meter is a base " + link("SI unit", "room_si_units") + " defined to be the distance that light travels in a vaccum in $\\frac{1}{299,792,458}$ seconds.",
			"");
			
		this.newFormulaRoom(room_kilograms,
			"Mass",
			"Mass is a property of an object used to describe how it behaves under several phenomena. <b>Inertia mass </b> describes an object's resistance to being accelerated by a force as described by Newtons's second law of motion." +
			"<b> Gravitational mass </b> measures the gravitational force exerted by an object on other objects and how it behaves under the influence of a gravitational field."
			,
			"",
			"Mass is specified in terms of multiples of the base " + link("SI unit", "room_si_units") + " called the Kilogram. The Kilogram is currently defined to be equal to the mass of the Itnernational Prototype Kilogram and as such is subject " +
			"to imprescision and change. The General Conference on Weights and Measures hopes to eventually redefine the kilogram to be a quantity based on a universally stable constant, such as the Planck constant.",
			"Many other SI units are defined in terms of the Kilogram, so the integrity of the consistency of scientific work rests on the fate of the Kilogram.",
			"");
			
		this.newFormulaRoom(room_seconds,
			"Time",
			"Time is a measurement of the ordering of events and which can also be used to measure the duration of events. Some people think of time as the 4th dimension wherebye our entire 3 dimensional " +
			"universe moves through time mush like humans move through space."
			,
			"",
			"Time is specified using the base " + link("SI unit", "room_si_units") + " called the <b>second</b>. The second is defined to be \"the duration of 9192631770 periods of the radiation corresponding to the transition between the two hyperfine levels of the ground state of the caesium 133 atom.\" "+
			"This means that somewhere in the world, our clocks are being synchronized by measurments of the radiation of particles out of a caesium 133, which was probably chosen because the these particles radiate at a very stable and consistent rate."
			,
			"");
			
		this.newFormulaRoom(room_ampere,
			"Electric Current",
			"Electric Current is a measure of the flow of " + link("electric charge", "room_coulombs") + " across a surface per unit of time."
			,
			"",
			"Electric current is specified using the base " + link("SI unit", "room_si_units") + " called the <b>ampere</b>. The ampere is defined to be " +
			" \"the constant current which, if maintained in two straight parallel conductors of infinite length, of negligible circular cross-section, and placed 1 meter apart in a vacuum, would produce between these conductors a force equal to $2 \\cdot 10^{-7}$ newtons per meter of length.\""
			,
			"");
			
		this.newFormulaRoom(room_kelvin,
			"Temperature",
			"Temperature is a measure of the amount of thermal energy present in a system and is usually caused by rapidly vibrating particles. Matter that contains no thermal " +
			" energy is said to be at absolute zero."
			,
			"",
			"Temperature is specified using the base " + link("SI unit", "room_si_units") + " called the <b>kelvin</b>. The kelvin is defined to be " +
			"$\\frac{1}{273.16}$ of the thermodynamic temperature of the triple point of water. Historically, the unit of centigrade was used to measure temperature and it increments at the same rate as Kelvin, "+
			"but 0 degrees celcius cooresponds to the freezing point of water, whereas 0 kelvin cooresponds to absolute zero (an absense of all heat). Kelvin = degrees celcius + 273.15, which reflects celcius's " +
			"water centric positioning and Kelvin's absolute temperature based positioning."
			,
			new visual_temperature());
			
		this.newFormulaRoom(room_mole,
			"Amount of a Substance",
			"In Physics, often we can describe systems in terms of a sum of consituent components. To describe the amout or count of these entities we use the <b>mole</b>. " +
			"It is important to think about the count of object when thinking about theories that try to derive macroscopic properties on the basis of the microscopic behavior " +
			"of a large collection of entities, such as celestial bodies in cosmology, particles in stastistical mechanics, the concept of temperature, and other ways of viewing our universe."
			,
			"",
			"Amount of a substance is specified using the base " + link("SI unit", "room_si_units") + " called the <b>mole</b>. The mole is defined to be " +
			"the amount of substance of a system which contains as many elementary entities as there are atoms in 0.012 kilograms of carbon 12."
			,
			"");
			
		this.newFormulaRoom(room_candela,
			"Luminous intensity",
			"Luminous intensity is a measure of the wavelength-weighted power emitted by a point light source in a particular direction per solid angle. " + 
			"Luminous intensity is a photometric measurement, which means it is a quantity of human perception, rather than objectivly physical value. " +
			"This means that unlike many other standard units of measure used in Physics it is not governed by universal laws of the universe, but rather " +
			"by models of the particular sensitivity of the human eye. Other species with eyes adapted in alternative ways would likely not find luminous intensity very useful. "
			,
			"",
			"Luminous intensity is specified using the base " + link("SI unit", "room_si_units") + " called the <b>candela</b>. " +
			"The candela is defined to be the luminous intensity in a given direction of a source that emits monochromatic radiation of frequency $540 \\cdot 10^{12}$ hertz and that has a radiant intensity in that direction of $\\frac{1}{683}$ watt per steradian."
			,
			"");
		
		this.newFormulaRoom(room_si_units,
			"SI Units",
			"The SI base units include " + link("kilograms", "room_kilograms") + " which measure mass, " + 
			link("meters", "room_meters") +   " which measure portions of space, " + 
			link("seconds", "room_seconds") + " which measure time, " + 
			link("ampere", "room_ampere") +   " which measure electric current, " + 
			link("kelvin", "room_kelvin") +   " which measure temperature, " + 
			link("mole", "room_mole") +       " which measure amount of a substance, " +
			link("candela", "room_candela") + " which measure the luminous intensity."
			,
			"",
			"",
			"");
			
				
/*		
		this.newFormulaRoom(,
			"",
			"",
			"",
			"",
			"");
			
		this.newFormulaRoom(,
			"",
			"",
			"",
			"",
			"");
			
		this.newFormulaRoom(,
			"",
			"",
			"",
			"",
			"");
			
		this.newFormulaRoom(,
			"",
			"",
			"",
			"",
			"");
			
		this.newFormulaRoom(,
			"",
			"",
			"",
			"",
			"");
		*/
		
		
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

		this.newFormulaRoom(room_visual_demo,
			"Visual Demo",
			"This is a symbolic based explanation!",
			"This is an english language based explanation!",
			"This is an explanation with the types and units of quantities explicitly stated.",
			new visual_fluid_incompressibility());


			

		
			
	},
	
	initiateTableOfContents: function(room_menu)
	{

	},
	
	// Inputs: Room, String, String, String, String.
	newFormulaRoom: function(room, title_text, english_text, formula_text, units_text, visual)
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
		
		// Rooms start in non visual mode.
		room.show_visual = false;
		
		// May be undefined.
		room.visual = visual;
		
		button_0.message = "English";
		button_0.action = function(){
			spec.clearTabSpecificText();
			spec.setText(text_center, english_text);
			room.show_visual = false;
		}
		
		button_1.message = "Mathematics";
		button_1.action = function(){
			spec.clearTabSpecificText();
			spec.setText(text_center, formula_text);
			room.show_visual = false;
		}
	
		button_2.message = "Units";
		button_2.action = function(){
			spec.clearTabSpecificText();
			spec.setText(text_center, units_text);
			room.show_visual = false;
		}

		// Specify the behavior that happens when the user clicks on the visualization button.
		button_3.message = "Visualization";
		button_3.action = function(){
			spec.clearTabSpecificText();
			room.show_visual = true;
			if(room.visual)
			{
				room.visual.restart();
				
				spec.setText(text_visual1_title, room.visual.title_left());
				spec.setText(text_visual2_title, room.visual.title_right());
				
				spec.setText(text_visual1, room.visual.text_left());
				spec.setText(text_visual2, room.visual.text_right());
			}
			
		}
		
		// This function determines the initial state of the room when the user navigates to it.
		room.start_function = function()
		{
			spec.setText(text_center, english_text);
			spec.setText(text_title, title_text);
			room.show_visual = false;
		}
		
		
		return room;
	},
	
	createHTML()
	{
		/* Displaying Text. */
		text_title = document.getElementById('title');
		text_title.style.position = 'absolute';
		//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this.
		text_title.style.width  = room_w*22/24;
		text_title.style.height = this.button_h;
		text_title.style.backgroundColor = "clear";//"white";"clear";
		text_title.style.color="#000000";//black
		text_title.style.textAlign="center";
		//text_title.style.verticalAlign="center";
		text_title.innerHTML = "";
		text_title.style.fontSize = this.text_height*2 + "px";
		text_title.style.top = 0;
		text_title.style.left = room_w/24 + 'px';
		text_title.style.fontFamily="'Poiret One', cursive";
		//document.body.appendChild(text_title);
		
		var content_y = room_h/4 - this.button_h*2;
		
		text_visual1_title = this.make_new_text(room_w/24,    content_y, room_w*10/24, this.button_h, this.button_h);
		text_visual2_title = this.make_new_text(room_w*13/24, content_y, room_w*10/24, this.button_h, this.button_h);
		
		text_center = this.make_new_text(room_w/24, content_y, room_w*22/24, room_h - content_y);
		
		
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
		document.body.appendChild(text_home);

		text_visual1 = this.make_new_text(room_w/24,    room_h*3/4, room_w*10/24, this.button_h);
		text_visual2 = this.make_new_text(room_w*13/24, room_h*3/4, room_w*10/24, this.button_h);


	},

	make_new_text(x, y, w, h, font_size)
	{
		/* Displaying Text. */
		text_object = document.createElement('div');
		text_object.style.position = 'absolute';
		//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this.
		text_object.style.width  = w;
		text_object.style.height = this.button_h;
		text_object.style.lineHeight = "200%";
		text_object.style.backgroundColor = "clear";//"white";"clear";
		text_object.style.color="#000000";//black
		text_object.style.textAlign="center";
		//ttext_center.style.verticalAlign="center";
		text_object.innerHTML = "";
		text_object.style.fontSize = this.text_height + "px";
		if(font_size)
		{
			text_object.style.fontSize = font_size + "px";
		}
		text_object.style.top  = y;
		text_object.style.left = x;
		//text2.style.fontFamily="'Play', sans-serif";
		document.body.appendChild(text_object);
		
		return text_object;
	},
	
	// Sets all of the html elements to the empty string.
	clearText()
	{
		text_center.innerHTML  = "";
		text_title.innerHTML   = "";
		
		// The Text that describes the visualizations.
		text_visual1.innerHTML = "";
		text_visual2.innerHTML = "";
		
		// The Titles of the visualizations.
		text_visual1_title.innerHTML = "";
		text_visual2_title.innerHTML = "";
		
	},
	
	// Sets all tab specific elements to the empy string.
	// This is allows one tab of content to clear away all tab specific information from the screen.
	// (Not the title).
	clearTabSpecificText()
	{
		
		//text_title.innerHTML   = "";
		
		// Text that describes the formulas and concepts associated with a topic.
		text_center.innerHTML  = "";
		
		// The Text that describes the visualizations.
		text_visual1.innerHTML = "";
		text_visual2.innerHTML = "";
		
		// The Titles of the visualizations.
		text_visual1_title.innerHTML = "";
		text_visual2_title.innerHTML = "";
		
	},
	
	// Test is an html element.
	// message is a string.
	// Instead of directly manipulating html elements and their inner text,
	// we will route all of the calls through this function.
	// so that appropiate processing (such as latexing the contents) gets done.
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
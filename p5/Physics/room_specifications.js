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
				
		room_collisions = new Room();
		room_ideal_gas_law = new Room();
		
		
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
				link("Collisions", "room_collisions") + ", " +
				link("Ideal Gas Law", "room_ideal_gas_law") + ", " +
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
			"Temperature is a measure of the amount of thermal energy present in a system and is usually caused by rapidly vibrating particles. <br>" +
			"Matter that contains no thermal energy is said to be at absolute zero. <br>" +
			"The energy coming into or out of a system is called heat. You can think of the net heat gained at a given moment as the derivative of temperature over time." +
			"When you feel an object and observe that it is hot, then you are observing that there is a high rate of heat flow from the object to yourself, but you are not necessarily observing anything about the object's temperture."
			,
			"The Heat equation is $\\frac{\\partial u}{\\partial t} - \\alpha \\nabla^{2}u = 0$, where u is the temperature at a location in space, t is the time, " +
			"$\\nabla^{2}u$ is the laplacian of temperature over space, and \\alpha is the thermal diffusivity of the material, which is a measure of what rate the material conducts heat."
			
			,
			
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
			"of a large collection of entities, such as celestial bodies in cosmology, particles in stastistical mechanics, the temperture of gases with regards to kinetic theory, and other ways of viewing our universe."
			,
			// Mathematics.
			"The mass of a Carbon-12 atom is denoted by $M(^{12}C)$ <br>" +
			"Atomic Mass Units (AMU, u), also called Daltons (Da) are used to specify mass at the atomic or molecular scale." +
			"1 Atomic mass unit is defined as follows: $1u = \\frac{1}{12}M(^{12}C)$ <br>" +
			"The invariant mass of an electron is approximatly $5.489 \\times 10^{-4}$ [AMU] <br>" +
			"Molar Mass constant $M_{u} = \\frac{M^{12}C}{A_{r}(^{12}C)} = 1 \\left[\\frac{g}{mol} \\right]$ <br>" +
			"Avogadro's constant $N_{A} = \\frac{A_{r}(e)M_{u}}{m_{e}}$ (unitless)<br>" + 
			"One experimentally derived value for $N_{A}$ is $6.022140857 \\times 10^{23} \\left[\\frac{1}{mol} \\right]$"
			,
			"Amount of a substance is specified using the base " + link("SI unit", "room_si_units") + " called the <b>mole</b>. The mole is defined to be " +
			"the amount of substance of a system which contains as many elementary entities as there are atoms in 0.012 kilograms of carbon 12."
			,
			new visual_amount());
			
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
			
		this.newFormulaRoom(room_collisions, 
			"Collisions",
			"Collisions happen whenever two objects run into each other. Collisions are resolved in nature by changing the velocity of each of the two objects in a way that conserves the total momentum of the two objects and the total " + link("energy. ", "room_energy") +
			"If energy is lost during a collision, for instance through " + link("heat", "room_kelvin") + ", then it is called an inelastic collision. Otherwise it suffices to ensure that the total " + link("kinetic energy", "room_kinetic_energy") + " is conserved, because velocity is the only thing that changes. " +
			"We do not need to worry about potential energy, because position is invariant during the collision."
			,
			"Let the positions of two objects be $p_{1}$ and $p_{2}$. <br> Let $d_{perp} = \\frac{p_{1} - p_{2}}{|p_{1} - p_{2}|}$ <br>" +
			"Let $q_{1}$ and $q_{2}$ be the velocities of the two objects. <br> We can then decompose each of them into components perpendicular and parrallel to the line or plane of collision as follows: <br>" +
			"$perp_{i} = q_{i} \\cdot d_{perp}$, $par_{i} = q_{i} - perp_{i}$ <br>" +
			"Let $m_{1}$ and $m_{2}$ be the masses of two objects. <br>" +
			"Let $u_{1}$ and $u_{2}$ be the velocities of the objects before the collision and " +
			"let $v_{1}$ and $v_{2}$ be equal to $perp_{1}$ and $perp_{2}$ repectivly. <br>" +
			"In a perfectly elastic collision, both momentum and kinetic energy are conserved " +
			"By the conservation of momentum, $m_{1}u_{1} + m_{2}u_{2} = m_{1}v_{1} + m_{1}v_{2}$ <br>" + 
			"By the conservation of energy and because their is no change in potential energy, $\\frac{m_{1}u_{1}^{2}}{2} + \\frac{m_{2}u_{2}^{2}}{2} = \\frac{m_{1}v_{1}^{2}}{2} + \\frac{m_{1}v_{2}^{2}}{2}$ <br>" +
			"You can solve these systems of equations for the for $v_{1}$ and $v_{2}$ after a perfectly elastic collision. <br>" + 
			"$v_{1} = \\frac{u_{1}(m_{1} - m_{2}) + 2m_{2}u_{2}}{m_{1} + m_{2}}$ and $v_{2} = \\frac{u_{2}(m_{2} - m_{1}) + 2m_{1}u_{1}}{m_{2} + m_{1}}$ <br>" +
			"Given a scalar coeficient of restitution $C_{R}$, we solve for $v_{1}$ and $v_{2}$ after an inelastic collision. <br>" +
			"$v_{1} = \\frac{C_{R}m_{2}(u_{2}-u_{1}) + m_{1}u_{1} + m_{2}u_{2}}{m_{1} + m_{2}}$ and " +
			"$v_{2} = \\frac{C_{R}m_{1}(u_{1}-u_{2}) + m_{1}u_{1} + m_{2}u_{2}}{m_{1} + m_{2}}$ <br>" +
			"Please note that $C_{R} = 1$ in a perfectly elastic collision and $C_{R} = 0$ in a perfectly inelastic collision. <br>" +
			"We then add $v_{1}$ and $v_{2}$ to $par_{1}$ and $par_{2}$ respectivly to compute the final result of an arbitrary dimensional collision."
			,
			"The " + link("mass", "room_kilograms") + " of each object is measured in kilograms. <br>" +
			"The velocity of each object is a direction associted with a speed with units of $\\frac{m}{s}$ <br>" +
			"The momentum of each object has units of $\\frac{kg \\cdot m}{s}$. <br>" + 
			"The Kinetic energy of each object is measured in Joueles (J), with units of $\\frac{kg \\cdot m^{2}}{s^{2}}$."
			,
			new visual_collisions());


		this.newFormulaRoom(room_ideal_gas_law,
			"Ideal Gas Law",
			"The Ideal gas law describes the behavior of a mathematically pure \"ideal gas\"."
			,
			"The Ideal gas law is: $PV = nRT$, where $P$ stands for pressure, " +
			"$V$ stands for volume," +
			"$n$ stands for " + link("amount", "room_mole") + " in moles, " +
			"$R$ is the ideal gas constant (Equivalant to the Boltzmann constant), " +
			"and $T$ stands for the temperature of the gas. <br>" +
			"The Universal gas constant is around $8.3144598 \\frac{J}{mol \\cdot K}$"
			,
			"$PV = nRT$ is expressed by the units $\\[\\frac{N}{m^{2}}\\]\\[m^{3}\\]=\\[\\]\\[\\]"
			,
			new visual_kinetic_theory());
			
			
			
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
		
		var content_y = this.button_h*3;
		
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
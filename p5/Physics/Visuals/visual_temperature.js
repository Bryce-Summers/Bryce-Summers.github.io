/* 
 * Temperature visualization.
 *
 * Written on 1/25/2016 by Bryce Summers
 * 
 */
 
// Constructor.
function visual_temperature()
{
	// Worlds are pretty much always useful.
	this.world = new ObjContainer();
}

visual_temperature.prototype =
{
	// This class displays two visualizations on the screen. One on the left side and one on the right side.
	// The Title that will be displayed on the screen for the left visualization.
	
	title_left()
	{
		return "Temperature Conductivity";
	},
	
	// The Title that will be displayed on the screen for the right visualization.
	title_right()
	{
		return "";
	},
	
	// The text that will accompany the left visualization as a description.
	text_left()
	{
		return "In this visualization, heat starts at a stable souce of heat and propogates throughout a conductive medium over time via the heat equation. Notice that temperature varies over time. " +
		"Heat loss to the external environment is represented by small floating bars. Thermal diffusivity represents the rate of heat flow.";
	},
	
	// The text that will accompany the right visualization as a description.
	text_right()
	{
		return  "When the thermal energy is fully conserved, the distriution of heat will eventually level out to a constant temperature. " +
				"Low thermal diffusivity and thermal conservation lead to a steeper ending gradient. High diffusivity and conservation leads to a If thermal diffusivity is low and thermal conservation is also low, then the gradient will be less steep, ";
				"because heat will be able to propogate farther form the input source before it leaves the system."
	},
	
	// All visualizations can be restarted.
	restart()
	{
		this.world.make_empty();
		this.time = 0;
		
		
		// Heat measurements.
		this.heat   = [];
	
		// Heat measurements derivatives.
		this.heat_d = [];
		this.heat_a = [];
		
		this.heat_loss = [];
		
		this.len = 100;
		var len = this.len;
		
		for(var i = 0; i < len; i++)
		{
			this.heat.push(0);
			this.heat_d.push(0);
			this.heat_a.push(0);
			this.heat_loss.push(0);
		}
		
		// Parameters that control the animation.
		this.conductivity_coef  = .5;
		this.thermal_loss_coef  = .9;
		this.initial_temperture = 1.0;
		this.source_index = this.len/2;
		
		
		// -- Slider 1 : Initial temperature.
		var slider_h = 20;
		var slider;
		slider = new gui_Slider(room_w/24, room_h/4 + room_h/8, slider_h, room_h/8, slider_h);
		slider.setPer(1, 0);
		slider.world = this;
		slider.action = function(x, y)
		{
			this.world.initial_temperture = 1.0 - y;
		}
		this.world.push(slider);
		
		// -- Slider 2 : Temperature Source location.
		slider = new gui_Slider(room_w/24 + slider_h, room_h*3/4 - slider_h, room_w*22/24 - slider_h, slider_h, slider_h);
		slider.setPer(.5, 0);
		slider.world = this;
		slider.action = function(x, y) // Function that gives percentage scroll values between 0 and 1 in both dimensions.
		{
			this.world.source_index = Math.floor((this.world.len - 1)*x);
		}
		this.world.push(slider);
		
		// -- Slider 3 : conductivity_coeficient.
		slider = new gui_Slider(room_w/24 + slider_h, room_h*3/4 - slider_h*2, room_w*5/24 - slider_h, slider_h, slider_h);
		slider.setPer(.5, 0);
		slider.world = this;
		slider.action = function(x, y) // Function that gives percentage scroll values between 0 and 1 in both dimensions.
		{
			// Ranges from [min to max].
			var min = .1;
			var max = .5;
			this.world.conductivity_coef = min + (max - min)*x;
		}
		slider.message = "Thermal diffusivity";
		this.world.push(slider);
		
		// -- Slider 4 : 
		slider = new gui_Slider(room_w/24 + slider_h, room_h*3/4 - slider_h*3, room_w*5/24 - slider_h, slider_h, slider_h);
		slider.setPer(0, 0);
		slider.world = this;
		slider.action = function(x, y) // Function that gives percentage scroll values between 0 and 1 in both dimensions.
		{
			// Ranges from [min to max].
			var min = .9;
			var max = 1.0;
			this.world.thermal_loss_coef = min + (max - min)*(x);
		}
		slider.message = "Thermal Conservation";
		this.world.push(slider);
		
	},

	// Update's this OBJ's internal states.
	update()
	{
		this.world.update();
		this.time++;
		
		// Compute heat equation 2nd order curvature.
		for(var i = 1; i < this.len - 1; i++)
		{
			// Compute the curvature using the method of finite differences.
			var h0 = this.heat[i - 1];
			var h1 = this.heat[i];
			var h2 = this.heat[i + 1];
			
			this.heat_a[i] = ((h2 - h1) - (h1 - h0)); // h2 - 2*h1 + h0;
		}
		
		// Handle the endpoints.
		this.heat_a[this.len - 1] = -(this.heat[this.len - 1] - this.heat[this.len - 2]);
		this.heat_a[0] = (this.heat[1] - this.heat[0]);
		
		
		// -- Integrate 1st order gradient.
		for(var i = 0; i < this.len; i++)
		{
			// Compute the curvature using the method of finite differences.
			//this.heat_d[i] = (this.heat_d[i] + this.heat_a[i]*this.conductivity_coef)*.9; // Damped.
			this.heat_d[i] = this.heat_a[i]*this.conductivity_coef; // Damped.
		}
		
		
		// -- Integrate the temeprature values over time.
		for(var i = 0; i < this.len; i++)
		{
			// Heat without external thermal loss.
			var perfect_heat = (this.heat[i] + this.heat_d[i]);
			var heat_with_loss = perfect_heat*this.thermal_loss_coef;
			
			this.heat_loss[i] = perfect_heat - heat_with_loss;

			// Set the heat to the new value.
			this.heat[i] = heat_with_loss;
			
			// Create particles to signify heat escaping.
			//var photon = new Photon(0, -, dx*v, dy*v, life_span);
		}
		
		// Make the left most value the initial temperature.
		this.heat[this.source_index] = max(this.initial_temperture, this.heat[this.source_index]);
	
	},

	// Draws the given OBJ to the screen.
	// Variables in represent the region on the screen that this visualization should be drawn on.
	draw(x_in, y_in, w, h)
	{		
		// -- Integrate the temeprature values over time.
		// Draw all of the bars.
		var bar_w = (w - 20)/this.len;
		for(var i = 0; i < this.len; i++)
		{
			var x = 20 + x_in + bar_w*i;
			var y = y_in + h/2;
			
			// Vertical radius of the bar.
			var heat = this.heat[i];
			var max_heat = h/4;
			var bar_h = heat*max_heat;
			fill(255*heat, 0, 255*(1 - heat));
			rect(x, y - bar_h, bar_w, bar_h*2);
			
			var loss = this.heat_loss[i]*h/2;

			if(loss > .2)
			for(var l = 0; l < max_heat; l += max_heat/4)
			{
				var offset =  bar_h + (l + (this.time % max_heat/4));
				rect(x, y - offset - loss, bar_w, loss);
				rect(x, y + offset, bar_w, loss);
			}
		}

		
		this.world.draw(x_in, y_in);		
	},
	
	// Returns true iff this OBJ should be deleted.
	dead()
	{
		return false;
	},
	
	mousePressed()
	{
		this.world.mousePressed();
	},
	
	mouseReleased()
	{
		this.world.mouseReleased();
	}
}
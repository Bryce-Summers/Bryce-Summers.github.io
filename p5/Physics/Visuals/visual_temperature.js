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
		return "Temperature and Heat Flow";
	},
	
	// The Title that will be displayed on the screen for the right visualization.
	title_right()
	{
		return "";
	},
	
	// The text that will accompany the left visualization as a description.
	text_left()
	{
		return	"This visualization represents a conductive rod where heat steadily flows in at a source and flows out at a sink. " +
				"The Temperature of a given section of the rod is represented by a color, where white represents higher amounts of internal thermal energy and black represents lower amounts of internal thermal energy. " +
				"The amount of heat, flowing locally into and out of sections of the rod is represented by the rod's height. " +
				"Over time the rate of heat flow will become constant at every location between the source and the sink.";
	},
	
	// The text that will accompany the right visualization as a description.
	text_right()
	{
		return  "The floating bars represent energy coming into and out of the system. " +
				"If the incoming heat exceeds the outgoing heat, then the system as a whole will tend towards an infinite amount of temperature. " +
				"Greater conductivity leads to decreased overall temperature, because heat flows more efficiently to the sink and thus there are less build ups in temperature. " + 
				"If the heat intake is no greater than the heat loss, then the system will eventually come to an equilibrium where the heat is constant everywhere and is equal to the heat coming into and out of the system.";
	},
	
	// All visualizations can be restarted.
	restart()
	{
		this.world.make_empty();
		this.time = 0;
		
		
		// Temperature measurments.
		this.heat   = [];
	
		// The derivative is the amount of heat flowing from one bar to another.
		// Heat is therefore the derivative of temperature in this case.
		this.heat_d = [];
		this.heat_a = [];
		
		this.heat_loss = [];
		
		this.len = 30;
		var len = this.len;
		
		for(var i = 0; i < len; i++)
		{
			this.heat.push(0);
			this.heat_d.push(0);
			this.heat_a.push(0);
			this.heat_loss.push(0);
		}
		
		// Parameters that control the animation.
		this.conductivity_coef  = .1;
		this.thermal_loss = .1;// The amount of heat that gets lost from the system at every frame.
		this.thermal_gain = .1;// The amount of heat that gets added to the system at every frame.
		this.source_index = 0;
		this.sink_index   = this.len/2;
		
		
		// -- Slider 1 : Initial temperature.
		var slider_h = 20;
		var slider;
		slider = new gui_Slider(room_w/24, room_h/4 + room_h/8, slider_h, room_h/8, slider_h);
		slider.setPer(1, 0);
		slider.world = this;
		slider.action = function(x, y)
		{			
			var min = 0;
			var max = .1;
			this.world.thermal_gain = min + (max - min)*(1.0 - y);
		}
		this.world.push(slider);
		
		// -- Slider 2 : Temperature Source location.
		slider = new gui_Slider(room_w/24 + slider_h, room_h*3/4 - slider_h, room_w*22/24 - slider_h, slider_h, slider_h);
		slider.setPer(0, 0);
		slider.world = this;
		slider.action = function(x, y) // Function that gives percentage scroll values between 0 and 1 in both dimensions.
		{
			this.world.source_index = Math.floor((this.world.len - 1)*x);
		}
		slider.message = "Heat Source";
		this.world.push(slider);
		
		
		// -- Slider 2.5 : Temperature loss location.
		slider = new gui_Slider(room_w/24 + slider_h, room_h*3/4 - slider_h*2, room_w*22/24 - slider_h, slider_h, slider_h);
		slider.setPer(.5, 0);
		slider.world = this;
		slider.action = function(x, y) // Function that gives percentage scroll values between 0 and 1 in both dimensions.
		{
			this.world.sink_index = Math.floor((this.world.len - 1)*x);
		}
		slider.message = "Heat Sink";
		this.world.push(slider);
		
		// -- Slider 3 : conductivity_coeficient.
		slider = new gui_Slider(room_w/24 + slider_h, room_h*3/4 - slider_h*3, room_w*5/24 - slider_h, slider_h, slider_h);
		slider.setPer(0, 0);
		slider.world = this;
		slider.action = function(x, y) // Function that gives percentage scroll values between 0 and 1 in both dimensions.
		{
			// Ranges from [min to max].
			var min = .1;
			var max = .5;
			this.world.conductivity_coef = min + (max - min)*x;
		}
		slider.message = "Conductivity";
		this.world.push(slider);
		
		// -- Slider 4 : Thermal Loss value.
		slider = new gui_Slider(room_w*23/24 - slider_h, room_h/4 + room_h/8, slider_h, room_h/8, slider_h);
		slider.setPer(1.0, 0);
		slider.world = this;
		slider.action = function(x, y) // Function that gives percentage scroll values between 0 and 1 in both dimensions.
		{
			// Ranges from [min to max].
			var min = 0;
			var max = .1;
			this.world.thermal_loss = min + (max - min)*(1.0 - y);
		}
		//slider.message = "Thermal Loss";
		this.world.push(slider);
		
	},

	// Update's this OBJ's internal states.
	update()
	{
		this.world.update();
		this.time++;
		
		// Inject heat into the system.
		this.heat[this.source_index] += this.thermal_gain;
		
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
		
		
		// -- Integrate the temperature values over time.
		for(var i = 0; i < this.len; i++)
		{
			// Heat without external thermal loss.
			var perfect_heat = (this.heat[i] + this.heat_d[i]);
			var heat_with_loss = perfect_heat;
			
			this.heat_loss[i] = 0;// No heat loss, except at sink.

			// Set the heat to the new value.
			this.heat[i] = heat_with_loss;
			
			// Create particles to signify heat escaping.
			//var photon = new Photon(0, -, dx*v, dy*v, life_span);
		}
			
								
		this.heat_loss[this.sink_index] = min(this.heat[this.sink_index], this.thermal_loss);
		this.heat_loss[this.source_index] = -this.thermal_gain;
				
		this.heat[this.sink_index] -= this.heat_loss[this.sink_index];
		
		this.heat_d[this.source_index] -= this.heat_loss[this.source_index];
		this.heat_d[this.sink_index]   -= this.heat_loss[this.sink_index];
	
	},

	// Draws the given OBJ to the screen.
	// Variables in represent the region on the screen that this visualization should be drawn on.
	draw(x_in, y_in, w, h)
	{		
		// -- Integrate the temeprature values over time.
		// Draw all of the bars.
		var bar_w = (w - 50)/this.len;
		for(var i = 0; i < this.len; i++)
		{
			var x = 20 + x_in + bar_w*i;
			var y = y_in + h/2 - 20*2;
			
			// Vertical radius of the bar.
			var temp = this.heat[i];
			var max_heat = h/4;
			var bar_h = 100*this.heat_d[i]*max_heat;// The height represents heat.
			var scalar = 5;// Scales down the temperature gradient.
			var val = 255*temp/scalar;
			fill(val, val, val);
			rect(x, y - bar_h, bar_w, bar_h + max_heat);
			
			var loss = this.heat_loss[i]*h/2;
			
			if(abs(loss) > 0)
			for(var l = 0; l < max_heat; l += max_heat/4)
			{
				
				if(loss > 0)
				{
					var offset =  bar_h + (l + (this.time % max_heat/4));
					rect(x, y - offset - loss, bar_w, loss);
				}
				else
				{
					var offset =  bar_h + (l - (this.time) % max_heat/4);
					rect(x, y - offset - max_heat/4, bar_w, loss);
				}
				//rect(x, y + offset, bar_w, loss);
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
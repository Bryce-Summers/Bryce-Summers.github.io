// -- Photons. Used for simulating particles on a screen.
// A lifespan <= 0 implies the particle will live forever.
function Photon(x, y, dx, dy, lifespan)
{
	this.p = createVector(x, y);
	this.v = createVector(dx, dy);
	
	this.v_scale = 1.0; // Scales the speed that this particle goes at.
	
	this.p_start = createVector(x, y);// The Original Position.
	
	this.time = 0;
	this.lifespan = lifespan ? lifespan : 30;
	
	// An integer used to maintain a state of behavior for photons.
	this.state  = 0;
	this.radius = 5;
}

Photon.prototype =
{
	// Updates a photon.
	// Calls a custom action update if necessary.
	update()
	{
		this.p.add(p5.Vector.mult(this.v, this.v_scale));
		this.time++;

		if(this.action1)
		{
			this.action1(this);
		}
	},
	
	
	// diverts this photon to go in a refracted direction given an intersection
	// with a surface with the given normal.
	// MODIFIES the velocity.
	// N is a p5 Vector, index1 and index 2 are floats representing the index of 
	// refraction which is how many times slower the photon will travel in this
	// medium than the speed of light in a vacuum.
	refract(N, index1, index2)
	{
		// r >= 1, because speed of light is maximum possible universal speed.
		var r = index1/index2;

		var mag = this.v.mag();
		this.v.div(mag);

		// Non destructive static dot product.
		var c = -p5.Vector.dot(this.v, N);

		var coef = r*c - Math.sqrt(1 - r*r*(1 - c*c));

		var refract_dir = p5.Vector.mult(this.v, r);
		refract_dir.add(p5.Vector.mult(N, coef));

		// Take this out if we don't want internal mutations.
		this.v = refract_dir;

		this.v.mult(mag);

		return refract_dir;
	},
	
	// Assumes that N is a normalized p5 Vector.
	reflect(N)
	{
		this.v.sub(p5.Vector.mult(N, 2*p5.Vector.dot(this.v, N)));
		
		return this.v;
	},

	draw(x, y)
	{
		x += this.p.x;
		y += this.p.y;
		ellipse(x, y, this.radius, this.radius);
	},
	
	dead()
	{
		return this.lifespan > 0 && this.time >= this.lifespan;
	}	
}
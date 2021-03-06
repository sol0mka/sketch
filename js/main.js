// Generated by CoffeeScript 1.6.2
(function() {
  var COLORS, Circle, avoid, avoid2, avoid3, avoid4, avoid5, avoid6, avoid7, avoidMouse, collision, physics, pullToCenter, sketch,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  physics = new Physics();

  physics.integrator = new Verlet();

  avoidMouse = new Attraction();

  avoid = new Attraction();

  avoid2 = new Attraction();

  avoid3 = new Attraction();

  avoid4 = new Attraction();

  avoid5 = new Attraction();

  avoid6 = new Attraction();

  avoid7 = new Attraction();

  pullToCenter = new Attraction();

  collision = new Collision();

  sketch = Sketch.create({
    container: document.body
  });

  Circle = (function(_super) {
    __extends(Circle, _super);

    function Circle(radius) {
      Circle.__super__.constructor.apply(this, arguments);
      this.init(radius);
    }

    Circle.prototype.init = function(x, y, radius) {
      this.alive = true;
      this.radius = radius || 10;
      this.wander = 0.15;
      this.theta = random(TWO_PI);
      this.drag = 0.92;
      this.color = "#222";
      this.x = x || 0.0;
      this.y = y || 0.0;
      this.vx = 0.0;
      return this.vy = 0.0;
    };

    Circle.prototype.move = function() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= this.drag;
      this.vy *= this.drag;
      this.theta += random(-0.5, 0.5) * this.wander;
      this.vx += sin(this.theta) * 0.1;
      this.vy += cos(this.theta) * 0.1;
      this.radius *= 0.96;
      return this.alive = this.radius > 0.5;
    };

    Circle.prototype.draw = function(ctx) {
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.radius / .25, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      return ctx.fill();
    };

    return Circle;

  })(Particle);

  COLORS = ["#69D2E7", "#A7DBD8", "#E0E4CC", "#F38630", "#FA6900", "#FF4E50", "#F9D423"];

  sketch.setup = function() {
    var coeff, halfHeight, halfWidth, i, particle, position, size;

    i = 0;
    halfWidth = this.width / 2;
    halfHeight = this.height / 2;
    coeff = 1000;
    while (i < 150) {
      particle = new Circle(random(.25, .75));
      position = new Vector((50 * i) % this.width, halfHeight + random(-100, 100));
      particle.setRadius(particle.mass * 10);
      particle.moveTo(position);
      particle.color = COLORS[(i % COLORS.length) % 2];
      collision.pool.push(particle);
      particle.behaviours.push(avoidMouse, pullToCenter, collision, avoid, avoid2, avoid3, avoid4, avoid5, avoid6, avoid7);
      physics.particles.push(particle);
      i++;
    }
    pullToCenter.target.x = this.width / 2;
    pullToCenter.target.y = this.height / 2;
    pullToCenter.strength = 50;
    avoidMouse.setRadius(50);
    avoidMouse.strength = -400;
    avoid.setRadius(40);
    avoid.strength = -1000;
    avoid.target.x = this.width / 2;
    avoid.target.y = this.height / 2;
    size = 25;
    avoid2.setRadius(size);
    avoid2.strength = -1000;
    avoid2.target.x = this.width / 2 + (size / 2);
    avoid2.target.y = this.height / 2;
    avoid3.setRadius(size);
    avoid3.strength = -1000;
    avoid3.target.x = this.width / 2 + 2 * (size / 2);
    avoid3.target.y = this.height / 2;
    avoid4.setRadius(size);
    avoid4.strength = -1000;
    avoid4.target.x = this.width / 2 + 3 * (size / 2);
    avoid4.target.y = this.height / 2;
    avoid5.setRadius(size);
    avoid5.strength = -1000;
    avoid5.target.x = this.width / 2 + 4 * (size / 2);
    avoid5.target.y = this.height / 2;
    avoid6.setRadius(size);
    avoid6.strength = -1000;
    avoid6.target.x = this.width / 2 + 5 * (size / 2);
    avoid6.target.y = this.height / 2;
    avoid7.setRadius(size);
    avoid7.strength = -1000;
    avoid7.target.x = this.width / 2 + 6 * (size / 2);
    return avoid7.target.y = this.height / 2;
  };

  sketch.draw = function() {
    var i, n, particle, _results;

    physics.step();
    i = 0;
    n = physics.particles.length;
    _results = [];
    while (i < n) {
      particle = physics.particles[i];
      particle.draw(sketch);
      _results.push(i++);
    }
    return _results;
  };

  sketch.mousemove = function() {
    avoidMouse.target.x = sketch.mouse.x;
    return avoidMouse.target.y = sketch.mouse.y;
  };

}).call(this);

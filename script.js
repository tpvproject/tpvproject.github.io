// setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(ctx);
const gradient = ctx.createLinearGradient(0,0,canvas.width, canvas.height);
gradient.addColorStop(0, 'blue');
gradient.addColorStop(0.5, 'blue');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;
ctx.strokeStyle = 'white';

// particle editor and animator
class Particle {
    constructor (effect){
        this.effect = effect;
        this.radius = Math.random() * 5 + 2;
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() * 1 - 0.5;
        this.vy = Math.random() * 1 - 0.5;
        
    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill()
        //context.stroke();
    }
    update(){
        if (this.effect.mouse.pressed){
            const dx = this.x - this.effect.mouse.x;
            const dy = this.y - this.effect.mouse.y;
            const distance = Math.hypot(dx, dy);
            if (distance < this.effect.mouse.radius){
                const angle = Math.atan2(dy,dx);
                this.x += Math.cos(angle);
                this.y += Math.sin(angle);
            }
        }
        if (this.x < this.radius){
            this.x = this.radius;
            this.vx *= -1;
        } else if (this.x > this.effect.width - this.radius){
            this.x = this.effect.width - this.radius;
            this.vx *= -1;
        }
        if (this.y < this.radius){
            this.y = this.radius;
            this.vy *= -1;
        } else if (this.y > this.effect.height - this.radius){
            this.y = this.effect.height - this.radius;
            this.vy *= -1;
        }
        /*this.x += this.vx;
        if (this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1;

        this.y += this.vy;
        if (this.y > this.effect.height - this.radius || this.y < this. radius) this.vy *= -1;*/
        this.x += this.vx;
        this.y += this.vy;
    }
    reset(){
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
    }
}

// particle generator
class Effect {
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 500;
        this.createParticles();

        this.mouse = {
            x: 0,
            y: 0,
            pressed: false,
            radius: 150
        }

        // ... (previous code)

window.addEventListener('resize', e => {
    this.resize(e.target.innerWidth, e.target.innerHeight);
});

window.addEventListener('mousemove', handleMouse);
window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mouseup', handleMouseUp);

// Add touch event listeners
window.addEventListener('touchmove', handleTouchMove);
window.addEventListener('touchstart', handleTouchStart);
window.addEventListener('touchend', handleTouchEnd);

// ... (continue with previous code)

function handleMouse(e) {
    if (effect.mouse.pressed) {
        effect.mouse.x = e.x;
        effect.mouse.y = e.y;
    }
}

function handleMouseDown(e) {
    effect.mouse.pressed = true;
    effect.mouse.x = e.x;
    effect.mouse.y = e.y;
}

function handleMouseUp() {
    effect.mouse.pressed = false;
}

// Touch event handlers

function handleTouchMove(e) {
    if (effect.mouse.pressed) {
        const touch = e.touches[0];
        effect.mouse.x = touch.clientX;
        effect.mouse.y = touch.clientY;
    }
}

function handleTouchStart(e) {
    const touch = e.touches[0];
    effect.mouse.pressed = true;
    effect.mouse.x = touch.clientX;
    effect.mouse.y = touch.clientY;
}

function handleTouchEnd() {
    effect.mouse.pressed = false;
}

// ... (continue with previous code)


    }
    createParticles(){
        for (let i = 0; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
        }
    }
    handleParticles(context){
        this.connectParticles(context);
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
         });
    }
    connectParticles(context){
        const maxDistance = 100;
        for (let a = 0; a < this.particles.length; a++){
            for(let b = a; b < this.particles.length; b++){
                const dx = this.particles[a].x - this.particles[b].x;
                const dy = this.particles[a].y - this.particles[b].y;
                const distance = Math.hypot(dx, dy);
                if (distance < maxDistance){
                    const opacity = 1 - (distance/maxDistance)
                    context.globalAlpha = opacity;
                    context.beginPath();
                    context.moveTo(this.particles[a].x, this.particles[a].y);
                    context.lineTo(this.particles[b].x, this.particles[b].y);
                    context.stroke();
                    context.restore();
                }
            }
        }
    }
    resize(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width; 
        this.height = height;
        const gradient = this.context.createLinearGradient(0,0, width, height);
        gradient.addColorStop(0, 'blue');
        gradient.addColorStop(0.5, 'blue');
        gradient.addColorStop(1, 'blue');
        this.context.fillStyle = gradient;
        this.context.strokeStyle = 'white';
        this.particles.forEach(particle => {
            particle.reset();
        });
    }
}
const effect = new Effect(canvas, ctx);

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);

}
animate();

let canvas = document.getElementById('topgun');
let context = canvas.getContext('2d');

// asteroid setup
let segments = 24;
let shape = [];
for (let i=0; i < segments; i++) {
    shape.push(Math.random() - 0.5);
}
let radius = 50;
let noise = 0.2;
let x = context.canvas.width * Math.random();
let y = context.canvas.height * Math.random();
let angle = 0;
let x_speed = context.canvas.width * (Math.random() - 0.5);
let y_speed = context.canvas.height * (Math.random() - 0.5);
let rotation_speed = 2 * Math.PI * (Math.random() - 0.5);

function draw(ctx, guide) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    draw_asteroid(ctx, radius, shape, {guide: guide, noise: noise});
    ctx.restore();
}

let previous, elapsed;
function frame(timestamp) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    if (!previous) previous = timestamp;
    elapsed = timestamp - previous;
    //draw(context, true);
    console.log('X', elapsed);
    previous = timestamp;
    window.requestAnimationFrame(frame);
}
//window.requestAnimationFrame(frame);

////////////////////////////////////////////////////////////////////////////////////

function draw_asteroid(ctx, radius, segments) {
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'black';
    ctx.save();
    ctx.beginPath();
    for (let i=0; i < segments; i++) {
        ctx.rotate(2 * Math.PI / segments);
        //ctx.lineTo(radius, 0);
        ctx.lineTo(radius * 0.8 + radius * 0.4 * Math.random(), 0);
        //ctx.lineTo(radius + radius * options.noise * (Math.random() - 0.5), 0);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function draw_gunship() {
    context.beginPath();
    context.strokeStyle = '#FFFFFF';
    context.fillStyle = '#FFFFFF';
    context.lineWidth = 2;
    context.moveTo(500, 500);
    context.lineTo(520, 540);
    context.lineTo(500, 525);
    context.lineTo(480, 540);
    context.fill();
    context.stroke();
}

let dx = 0
let dy_asteroid_dumb = 0;
let dy_small_dumb = 0;
//draw_gunship(dx, dy);
/*for (let x=0.1; x<1; x+=1) {
    for (let y=0.1; y<1; y+=1) {
        context.save();
        let random_x_location = Math.random() * 500;
        let random_y_location = Math.random() * 100;
        let random_radius = 5 + Math.random() * 15;
        let random_segments = 10 + Math.random() * 10;
        context.translate(random_x_location, random_y_location);
        draw_asteroid(context, random_radius, random_segments);
        context.restore();
        noise += 0.025;
    }
}*/
function create_asteroids() {
    context.save();
    let random_x_location = Math.random() * 500;
    let random_y_location = Math.random() * 100;
    let random_radius = 5 + Math.random() * 15;
    let random_segments = 10 + Math.random() * 10;
    context.translate(random_x_location, random_y_location);
    draw_asteroid(context, random_radius, random_segments);
    context.restore();
}
let random_x_location = Math.random() * 600;
let asteroid_y_location = 0;
let random_radius = 5 + Math.random() * 15;
let random_segments = 10 + Math.random() * 10;
function draw_asteroid_dumb(dy) {
    context.save();
    context.translate(random_x_location, asteroid_y_location + dy);
    draw_asteroid(context, random_radius, random_segments);
    context.restore();
}
function draw_enemy_small_dumb(dy) {
    context.beginPath();
    context.strokeStyle = '#FFFFFF';
    context.fillStyle = '#FFFFFF';
    context.lineWidth = 2;
    context.moveTo(300, 0 + dy);
    context.lineTo(310, -20 + dy);
    context.lineTo(290, -20 + dy);
    context.fill();
    context.stroke();
}
function frame(timestamp) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    if (!previous) previous = timestamp;
    elapsed = timestamp - previous;
    //dx--;
    dy_asteroid_dumb += 2;
    dy_small_dumb++;
    draw_gunship();
    //create_asteroids();
    draw_asteroid_dumb(dy_asteroid_dumb);
    draw_enemy_small_dumb(dy_small_dumb);
    previous = timestamp;
    window.requestAnimationFrame(frame);
}
window.requestAnimationFrame(frame);

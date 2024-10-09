let canvas = document.getElementById('topgun');
let context = canvas.getContext('2d');

function draw_shooter(ctx, x, y, radius, options) {
    options = options || {};
    ctx.save();
    if(options.guide) {
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
    ctx.lineWidth = options.lineWidth || 2;
    ctx.strokeStyle = options.stroke || 'white';
    ctx.fillStyle = options.fill || 'black';
    let angle = (options.angle || 0.5 * Math.PI) / 2;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    console.log('moveTo  : ', x+radius, y);
    ctx.lineTo(
        x + Math.cos(Math.PI - angle) * radius,
        y + Math.sin(Math.PI - angle) * radius
    );
    console.log('lineTo 1: ', x + Math.cos(Math.PI - angle) * radius, y + Math.sin(Math.PI - angle) * radius);
    ctx.lineTo(
        x + Math.cos(Math.PI + angle) * radius,
        y + Math.sin(Math.PI + angle) * radius
    );
    console.log('lineTo 2: ', x + Math.cos(Math.PI + angle) * radius, y + Math.sin(Math.PI + angle) * radius);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    // alternative shooter
    /*let x_2 = 100;
    let y_2 = 550;
    ctx.beginPath();
    ctx.moveTo(x_2, y_2);
    ctx.lineTo(x_2-10, y_2+20);
    ctx.lineTo(x_2+10, y_2+20);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();*/
}

function draw_asteroid(ctx, radius, segments, options) {
    options = options || {};
    ctx.strokeStyle = options.stroke || 'white';
    ctx.fillStyle = options.fill || 'black';
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
    if (options.guide) {
        ctx.lineWidth = 0.5;
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    ctx.restore();
}

// drawing shooter
draw_shooter(context, 270, 300, 30, {guide: true});

// drawing asteroids
let segments = 25, noise = 0.4;  // segments = corners
for (let x=0.1; x<1; x+=0.2) {
    for (let y=0.1; y<1; y+=0.2) {
        context.save();
        context.translate(context.canvas.width * x, context.canvas.height * y);
        draw_asteroid(context, context.canvas.width / 12, segments, {noise: noise, guide: true});
        context.restore();
        noise += 0.025;
    }
}

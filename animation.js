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
/*function create_asteroids() {
    context.save();
    let random_x_location = Math.random() * 500;
    let random_y_location = Math.random() * 100;
    let random_radius = 5 + Math.random() * 15;
    let random_segments = 10 + Math.random() * 10;
    context.translate(random_x_location, random_y_location);
    draw_asteroid(context, random_radius, random_segments);
    context.restore();
}*/
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
/*class Asteroid {
    Asteroid() {
        this.x = 100,
        this.y = 100,
        this.radius = 30
    }
    getRadius() {
        return this.radius;
    }
}
let asteroid_object = new Asteroid();
function draw_asteroid_object(asteroid_object) {
    draw_asteroid(context, 20, 20);
}
draw_asteroid_object(asteroid_object)*/
function Asteroid(segments, radius, noise) {
    this.x = context.canvas.width * Math.random();
    this.y = context.canvas.height * Math.random();
    this.angle = 0;
    this.x_speed = context.canvas.width * (Math.random() - 0.5);
    this.y_speed = context.canvas.height * (Math.random() - 0.5);
    this.rotation_speed = 2 * Math.PI * (Math.random() - 0.5);
    this.radius = radius;
    this.noise = noise;
    this.shape = [];
    for (let i=0; i<segments; i++) {
        this.shape.push(Math.random() - 0.5);
    }
}

//let asteroidi = new Asteroid(24, 30, 0.2);
//console.log(asteroidi);
let asteroid_list = [
    new Asteroid(10, 50, 0.2),
    new Asteroid(20, 30, 0.2),
    new Asteroid(40, 40, 0.2)
]
function draw_asteroid_object(asteroidi) {
    context.save();
    context.translate(asteroidi.x, asteroidi.y);
    draw_asteroid(context, asteroidi.radius, 24);
    context.restore();
}

function draw_enemy_small_dumb(dy) {
    context.beginPath();
    context.strokeStyle = '#FFFFFF';
    context.fillStyle = '#FFFFFF';
    context.lineWidth = 2;
    context.moveTo(100, 0 + dy);
    context.lineTo(110, -20 + dy);
    context.lineTo(90, -20 + dy);
    context.fill();
    context.stroke();
}

let enemyList = [[350,0], [400,0], [450,0]];
function draw_three_small_dumb_enemies(dy) {
    for (let i=0; i<enemyList.length; i++) {
        console.log('---> ', enemyList[i][0], enemyList[i][1])
        context.beginPath();
        context.strokeStyle = '#FFFFFF';
        context.fillStyle = '#FFFFFF';
        context.lineWidth = 2;
        context.moveTo(enemyList[i][0] + 0, 0 + dy);
        context.lineTo(enemyList[i][0] + 10, -20 + dy);
        context.lineTo(enemyList[i][0] - 10, -20 + dy);
        context.fill();
        context.stroke();
    }
}

function Shooter() {
    this.x = 200;
    this.y = 520;
}
let shooter = new Shooter();

function draw_shooter(shooter) {
    context.beginPath();
    context.strokeStyle = '#FFFFFF';
    context.fillStyle = '#FFFFFF';
    context.lineWidth = 2;
    context.moveTo(shooter.x, shooter.y);
    context.lineTo(shooter.x + 10, shooter.y + 30);
    context.lineTo(shooter.x - 10, shooter.y + 30);
    context.fill();
    context.stroke();
}

let bulletList = [];
function Bullet() {
    this.x = shooter.x;
    this.y = shooter.y;
}
let bullet = new Bullet();
bulletList.push(bullet);
function shoot_bullet() {
    let bullet = new Bullet();
    bulletList.push(bullet);
}
function draw_bullet(bullet) {
    context.beginPath();
    context.strokeStyle = '#FFFFFF';
    context.fillStyle = '#FFFFFF';
    context.lineWidth = 2;
    context.moveTo(bullet.x, bullet.y);
    bullet.y -= 10;
    context.lineTo(bullet.x, bullet.y);
    context.fill();
    context.stroke();
}
let bulletListIteratorFirst = 0;
function handle_bullet_positions(bulletList) {
    for (let i=bulletListIteratorFirst; i<bulletList.length; i++) {
        if (bulletList[i].y < -20) {
            bulletListIteratorFirst++;
        }
        draw_bullet(bulletList[i]);
    }
}
handle_bullet_positions(bulletList)

function moveRight() {
    //console.log('shooter position:', shooter.x, shooter.y);
    return shooter.x += 10;
}
function moveLeft() {
    //console.log('shooter position:', shooter.x, shooter.y);
    return shooter.x -= 10;
}
function moveUp() {
    //console.log('shooter position:', shooter.x, shooter.y);
    return shooter.y -= 10;
}
function moveDown() {
    //console.log('shooter position:', shooter.x, shooter.y);
    return shooter.y += 10;
}
//function shootBullet() {}

window.onkeydown = function(e) {
    let key = e.key || e.keyCode;
    //console.log('key: ', key);
    switch(key) {
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 's':
            shoot_bullet();
            //setTimeout(() => shoot_bullet(), 70);
            break;
    }
}

let showTestTarget = true;
let testTargetPosition = {'x': 290, 'y': 200}
function draw_test_target() {
    context.beginPath();
    context.strokeStyle = '#FFFFFF';
    context.fillStyle = '#FFFFFF';
    context.lineWidth = 2;
    context.moveTo(testTargetPosition.x, testTargetPosition.y);
    context.lineTo(testTargetPosition.x + 20, testTargetPosition.y);
    context.lineTo(testTargetPosition.x + 20, testTargetPosition.y + 20);
    context.lineTo(testTargetPosition.x, testTargetPosition.y + 20);
    context.fill();
    context.stroke();
}

function check_collisions_bullets_items() {
    for (let i=bulletListIteratorFirst; i<bulletList.length; i++) {
        //console.log('bullet positions:', bulletList[i].x, bulletList[i].y);
        if (bulletList[i].x > testTargetPosition.x && bulletList[i].x < testTargetPosition.x + 20) {
            if (bulletList[i].y > testTargetPosition.y && bulletList[i].y < testTargetPosition.y + 20) {
                console.log('a bullet hit the test target', bulletList[i].y);
                showTestTarget = false;
            }
        }
    }
}

function frame(timestamp) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    if (!previous) previous = timestamp;
    elapsed = timestamp - previous;
    //dx--;
    dy_asteroid_dumb += 2;
    dy_small_dumb++;
    //draw_gunship();  // original
    draw_shooter(shooter);
    if (showTestTarget == true) draw_test_target();
    draw_asteroid_dumb(dy_asteroid_dumb);
    draw_enemy_small_dumb(dy_small_dumb);
    draw_three_small_dumb_enemies(dy_small_dumb);
    handle_bullet_positions(bulletList);
    check_collisions_bullets_items();
    //draw_asteroid_object(asteroidi);
    //asteroid_list.forEach(a => draw_asteroid_object(a))
    previous = timestamp;
    window.requestAnimationFrame(frame);
}
window.requestAnimationFrame(frame);

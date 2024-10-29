let canvas = document.getElementById('topgun');
let context = canvas.getContext('2d');

let previous, elapsed;

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

let dx = 0;
let dy_asteroid_dumb = 0;
let dy_asteroid_static = 0;
let dy_small_dumb = 0;
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

function AsteroidStatic() {
    this.x = 100;
    this.y = 50;
    this.show = true;
    /*this.shape = [];
    for (let i=0; i<7; i++) {
        this.shape.push(Math.random() - 0.5);
    }*/
}
let static_asteroid = new AsteroidStatic()
function draw_asteroid_static(dy_asteroid_static) {
    context.beginPath();
    context.strokeStyle = '#FFFFFF';
    context.fillStyle = '#FFFFFF';
    context.lineWidth = 2;
    context.moveTo(100+dy_asteroid_static, 100+dy_asteroid_static);
    context.lineTo(110+dy_asteroid_static, 110+dy_asteroid_static);
    context.lineTo(110+dy_asteroid_static, 120+dy_asteroid_static);
    context.lineTo(100+dy_asteroid_static, 130+dy_asteroid_static);
    context.lineTo(90+dy_asteroid_static, 130+dy_asteroid_static);
    context.lineTo(80+dy_asteroid_static, 120+dy_asteroid_static);
    context.lineTo(80+dy_asteroid_static, 110+dy_asteroid_static);
    context.lineTo(90+dy_asteroid_static, 100+dy_asteroid_static);
    context.fill();
    context.stroke();
}

//let asteroidi = new Asteroid(24, 30, 0.2);
//console.log(asteroidi);
let asteroid_list = [
    new Asteroid(10, 50, 0.2),
    new Asteroid(20, 30, 0.2),
    new Asteroid(40, 40, 0.2)
]

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
        //console.log('---> ', enemyList[i][0], enemyList[i][1])
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
    this.hit = false;
}
//let bullet = new Bullet();
//bulletList.push(bullet);
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
//handle_bullet_positions(bulletList)

function moveRight() { return shooter.x += 10; }
function moveLeft() { return shooter.x -= 10; }
function moveUp() { return shooter.y -= 10; }
function moveDown() { return shooter.y += 10; }

/*window.onkeydown = function(e) {
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
}*/

let showTestTarget = true;
let testTarget = {'x': 290, 'y': 200, 'width': 20, 'height': 20}
function draw_test_target() {
    context.beginPath();
    context.strokeStyle = '#FFFFFF';
    context.fillStyle = '#FFFFFF';
    context.lineWidth = 2;
    context.moveTo(testTarget.x, testTarget.y);
    context.lineTo(testTarget.x + testTarget.width, testTarget.y);
    context.lineTo(testTarget.x + testTarget.width, testTarget.y + testTarget.height);
    context.lineTo(testTarget.x, testTarget.y + testTarget.height);
    context.fill();
    context.stroke();
}

let activeTargetList = [];
function ActiveTarget(x, y, hitPoints) {
    this.x = x;
    this.y = y;
    this.hitPoints = hitPoints;
    this.show = true;
}
function create_active_target() {
    let x = 50 + 500 * Math.random();
    let y = -30;
    let hitPoints = 1 + Math.floor(3 * Math.random());
    let new_target = new ActiveTarget(x, y, hitPoints);
    activeTargetList.push(new_target);
    //console.log('activeTargetList:', activeTargetList);
}
/*for (let i=0; i<5; i++) {
    setTimeout(() => create_active_target(), i*20);
}*/
function draw_active_targets() {
    for (let i=0; i<activeTargetList.length; i++) {
        //console.log('draw_active_targets:', activeTargetList[i].hitPoints);
        if (activeTargetList[i].hitPoints < 1) continue;
        context.beginPath();
        context.strokeStyle = '#FFFFFF';
        context.fillStyle = '#FFFFFF';
        context.lineWidth = 2;
        activeTargetList[i].y += 1;
        context.moveTo(activeTargetList[i].x, activeTargetList[i].y);
        context.lineTo(activeTargetList[i].x + 20, activeTargetList[i].y);
        context.lineTo(activeTargetList[i].x + 20, activeTargetList[i].y + 20);
        context.lineTo(activeTargetList[i].x, activeTargetList[i].y + 20);
        context.fill();
        context.stroke();
    }
}

function check_collisions_bullets_items() {
    for (let i=bulletListIteratorFirst; i<bulletList.length; i++) {
        //console.log('bullet positions:', bulletList[i].x, bulletList[i].y);
        /*if (showTestTarget == true) {
            if (bulletList[i].x >= testTarget.x && bulletList[i].x <= testTarget.x + 20) {
                if (bulletList[i].y >= testTarget.y && bulletList[i].y <= testTarget.y + 20) {
                    console.log('a bullet hit the test target', bulletList[i].y);
                    showTestTarget = false;
                    bulletListIteratorFirst++;
                }
            }
        }*/
        if (bulletList[i].hit == true) continue;
        if (activeTargetList[i] == undefined) continue;
        for (let i=0; i<activeTargetList.length; i++) {
            //console.log('activeTargetList hitPoints alussa:', activeTargetList[i].hitPoints)
            if (bulletList[i].x >= activeTargetList[i].x && bulletList[i].x <= activeTargetList[i].x + 20) {
                if (bulletList[i].y >= activeTargetList[i].y && bulletList[i].y <= activeTargetList[i].y + 20) {
                    console.log('x y : hits target')
                    activeTargetList[i].hitPoints--;
                    bulletList[i].hit = true;
                    //bulletListIteratorFirst++;
                    //break;
                }
                //console.log('activeTargetList hitPoints:', activeTargetList[i].hitPoints)
            }
            //console.log('activeTargetList hitPoints lopussa:', activeTargetList[i].hitPoints)
        }
    }
}

function guide_shooter() {
    //console.log('shooter-test_target:', shooter.x - (testTarget.x+testTarget.width/2));
    let difference = shooter.x - (testTarget.x+testTarget.width/2);
    if (difference <= 0) shooter.x++;
    if (difference == 0) {
        let time = 0;
        for (let i=0; i<3; i++) {
            setTimeout(() => shoot_bullet(), time);
            time += 50;
        }
    }
}

let active_target_pointer = 0;
function go_through_active_target_list() {
    /*for (let i=0; i<activeTargetList.length; i++) {
        console.log('active target:', activeTargetList[i]);
    }*/
    if (activeTargetList[active_target_pointer] != undefined) {
        //console.log('active target:', activeTargetList[active_target_pointer]);
        let difference = shooter.x - (activeTargetList[active_target_pointer].x+20/2);
        if (difference < 0) shooter.x += 2;
        else if (difference > 0) shooter.x -= 2;
        if (Math.abs(difference) < 1) {
            let time = 0;
            for (let i=0; i<activeTargetList[active_target_pointer].hitPoints; i++) {
                setTimeout(() => shoot_bullet(), time);
                time += 30;
            }
            active_target_pointer++;
        }
    }
}

let dy_active_targets = 0;
let counter = 0;
function frame(timestamp) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    if (!previous) previous = timestamp;
    elapsed = timestamp - previous;
    //dx--;
    dy_asteroid_dumb += 2;
    dy_asteroid_static += 0.0;
    dy_small_dumb++;
    dy_active_targets++;
    counter++;
    if (counter%120 == 0) {
        //console.log('counter:', counter);
        //counter = 0;
        create_active_target();
    }
    //guide_shooter();
    //draw_gunship();  // original
    draw_shooter(shooter);
    go_through_active_target_list();
    //if (showTestTarget == true) draw_test_target();
    draw_asteroid_static(dy_asteroid_static);
    draw_asteroid_dumb(dy_asteroid_dumb);
    draw_enemy_small_dumb(dy_small_dumb);
    draw_three_small_dumb_enemies(dy_small_dumb);
    draw_active_targets();
    handle_bullet_positions(bulletList);
    check_collisions_bullets_items();
    //draw_asteroid_object(asteroidi);
    //asteroid_list.forEach(a => draw_asteroid_object(a))
    previous = timestamp;
    window.requestAnimationFrame(frame);
}
window.requestAnimationFrame(frame);

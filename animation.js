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

let dx = 0;
let dy_asteroid_dumb = 0;
let dy_asteroid_static = 0;
let dy_small_dumb = 0;
let random_x_location = Math.random() * 600;
let asteroid_y_location = 0;
let random_radius = 5 + Math.random() * 15;
let random_segments = 10 + Math.random() * 10;
let dy_active_targets = 0;
let counter = 0;

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

let asteroid_list = [
    new Asteroid(10, 50, 0.2),
    new Asteroid(20, 30, 0.2),
    new Asteroid(40, 40, 0.2)
]

/*let enemyList = [[350,0], [400,0], [450,0]];
function draw_three_small_dumb_enemies(dy) {
    for (let i=0; i<enemyList.length; i++) {
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
}*/

function Shooter() {
    this.x = 300;
    this.y = 520;
}
let shooter = new Shooter();

function draw_shooter(shooter) {
    context.beginPath();
    context.strokeStyle = '#FFFFFF';
    context.fillStyle = '#FFFFFF';
    context.lineWidth = 2;
    context.moveTo(shooter.x, shooter.y);
    context.lineTo(shooter.x+20, shooter.y+40);
    context.lineTo(shooter.x, shooter.y+25);
    context.lineTo(shooter.x-20, shooter.y+40);
    context.fill();
    context.stroke();
}

let smallDumbEnemyList = [];
function SmallDumbEnemy() {
    this.x = 50 + 500 * Math.random();
    this.y = -30;
    this.hitPoints = 1;
}

function create_small_dumb_enemy() {
    let smallDumbEnemy = new SmallDumbEnemy();
    smallDumbEnemyList.push(smallDumbEnemy);
}

function draw_small_dumb_enemy(enemy) {
    if (enemy.hitPoints > 0) {
        context.beginPath();
        context.strokeStyle = '#FFFFFF';
        context.fillStyle = '#FFFFFF';
        context.lineWidth = 2;
        context.moveTo(enemy.x, enemy.y);
        context.lineTo(enemy.x+10, enemy.y-20);
        context.lineTo(enemy.x-10, enemy.y-20);
        context.fill();
        context.stroke();
        enemy.y++;
    }
}

let mediumSimpleEnemyList = [];
function MediumSimpleEnemy() {
    this.x = -50;
    this.y = 70;
    this.hitPoints = 10;
    this.moveDirection = "right";
}

function create_medium_simple_enemy() {
    let mediumSimpleEnemy = new MediumSimpleEnemy();
    mediumSimpleEnemyList.push(mediumSimpleEnemy);
}

function draw_medium_simple_enemy(enemy) {
    if (enemy.hitPoints > 0) {
        context.beginPath();
        context.strokeStyle = '#FFFFFF';
        context.fillStyle = '#FFFFFF';
        context.lineWidth = 2;
        if (enemy.moveDirection == "right") enemy.x++;
        else if (enemy.moveDirection == "left") enemy.x--;
        if (enemy.x >= 550) enemy.moveDirection = "left";
        else if (enemy.x <= 50) enemy.moveDirection = "right";
        context.moveTo(enemy.x, enemy.y);
        context.lineTo(enemy.x+20, enemy.y-40);
        context.lineTo(enemy.x-20, enemy.y-40);
        context.fill();
        context.stroke();
    }
}

let chapterMainEnemy;
function ChapterMainEnemy() {
    this.x = 300;
    this.y = 0;
    this.hitPoints = 1000;
    this.moveDirection = "left";
}

function create_chapter_main_enemy() {
    chapterMainEnemy = new ChapterMainEnemy();
}

function draw_chapter_main_enemy() {
    if (chapterMainEnemy.hitPoints > 0) {
        context.beginPath();
        context.strokeStyle = '#FFFFFF';
        context.fillStyle = '#FFFFFF';
        context.lineWidth = 5;
        if (chapterMainEnemy.y <= 100) {
            chapterMainEnemy.y = chapterMainEnemy.y + 0.2;
        }
        if (chapterMainEnemy.y >= 99) {
            if (chapterMainEnemy.moveDirection == "right") chapterMainEnemy.x = chapterMainEnemy.x + 0.5;
            else if (chapterMainEnemy.moveDirection == "left") chapterMainEnemy.x = chapterMainEnemy.x - 0.5;
            if (chapterMainEnemy.x >= 400) chapterMainEnemy.moveDirection = "left";
            else if (chapterMainEnemy.x <= 200) chapterMainEnemy.moveDirection = "right";
        }
        context.moveTo(chapterMainEnemy.x, chapterMainEnemy.y);
        context.lineTo(chapterMainEnemy.x+50, chapterMainEnemy.y-20);
        context.lineTo(chapterMainEnemy.x+50, chapterMainEnemy.y-80);
        context.lineTo(chapterMainEnemy.x-50, chapterMainEnemy.y-80);
        context.lineTo(chapterMainEnemy.x-50, chapterMainEnemy.y-20);
        context.lineTo(chapterMainEnemy.x, chapterMainEnemy.y);
        context.fill();
        context.stroke();
    }
}

let enemyBulletList = [];
function EnemyBullet(x) {
    this.x = x;
    this.y = 70;
    this.hit = false;
}
function shoot_enemy_bullet(x) {
    let bullet = new EnemyBullet(x);
    enemyBulletList.push(bullet);
}
function draw_enemy_bullet(bullet) {
    if (bullet.hit == false) {
        context.beginPath();
        context.strokeStyle = '#FFFFFF';
        context.fillStyle = '#FFFFFF';
        context.lineWidth = 6;
        context.moveTo(bullet.x, bullet.y);
        bullet.y += 3;
        context.lineTo(bullet.x, bullet.y);
        context.fill();
        context.stroke();
    }
}
let enemyBulletListIteratorFirst = 0;
function handle_enemy_bullet_positions() {
    for (let i=enemyBulletListIteratorFirst; i<enemyBulletList.length; i++) {
        if (enemyBulletList[i].y > 700) {
            enemyBulletListIteratorFirst++;
        }
        draw_enemy_bullet(enemyBulletList[i]);
    }
}

let bulletList = [];
function Bullet() {
    this.x = shooter.x;
    this.y = shooter.y;
    this.hit = false;
}

function shoot_bullet() {
    let bullet = new Bullet();
    bulletList.push(bullet);
}

function draw_bullet(bullet) {
    if (bullet.hit == false) {
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
}
let bulletListIteratorFirst = 0;
function handle_bullet_positions() {
    for (let i=bulletListIteratorFirst; i<bulletList.length; i++) {
        if (bulletList[i].y < -20) {
            bulletListIteratorFirst++;
        }
        draw_bullet(bulletList[i]);
    }
}

let sideMissileList = [];
function SideMissile(direction, target_pointer) {
    this.x = shooter.x;
    this.y = shooter.y+15;
    this.direction = direction;
    this.target_pointer = target_pointer;
    this.hit = false;
}

function shoot_side_missile(direction, target_pointer) {
    let side_missile = new SideMissile(direction, target_pointer);
    sideMissileList.push(side_missile);
}

function draw_side_missile(side_missile) {
    if (side_missile.hit == false && side_missile.y > -40) {
        context.beginPath();
        context.strokeStyle = '#FFFFFF';
        context.fillStyle = '#FFFFFF';
        context.lineWidth = 2;
        context.moveTo(side_missile.x, side_missile.y);
        console.log("side_missile:", side_missile.x, side_missile.y);
        console.log("0");
        console.log("smallDumbEnemyList[side_missile.target_pointer]", smallDumbEnemyList[side_missile.target_pointer]);
        console.log("side_missile.target_pointer:", side_missile.target_pointer);
        side_missile.y -= 5;
        console.log("1");
        if (smallDumbEnemyList[side_missile.target_pointer] == undefined) {
            console.log("undefined lista  :", smallDumbEnemyList);
            console.log("undefined pointer:", side_missile.target_pointer);
        }
        console.log("2");
        if (smallDumbEnemyList[side_missile.target_pointer].x != undefined) {
            console.log("defined  :", smallDumbEnemyList[side_missile.target_pointer].x);
        }
        console.log("3");
        if (side_missile.x > smallDumbEnemyList[side_missile.target_pointer].x) {
            let difference = side_missile.x - (smallDumbEnemyList[side_missile.target_pointer].x);
            let delta_x = 7 * difference/100;  // missile x change is relative to target x
            if (delta_x > 7) delta_x = 7;      // missile x change is max 7
            side_missile.x -= delta_x;
        }
        console.log("4");
        if (side_missile.x < smallDumbEnemyList[side_missile.target_pointer].x) {
            let difference = (smallDumbEnemyList[side_missile.target_pointer].x) - side_missile.x;
            let delta_x = 7 * difference/100;  // missile x change is relative to target x
            if (delta_x > 7) delta_x = 7;      // missile x change is max 7
            side_missile.x += delta_x;
        }
        console.log("5");
        context.lineTo(side_missile.x, side_missile.y);
        context.fill();
        context.stroke();
    }
}

let sideMissileListIteratorFirst = 0;
function handle_side_missile_positions() {
    for (let i = 0; i < sideMissileList.length; i++) {
        draw_side_missile(sideMissileList[i]);
    }
}

function moveRight() { return shooter.x += 10; }
function moveLeft() { return shooter.x -= 10; }
function moveUp() { return shooter.y -= 10; }
function moveDown() { return shooter.y += 10; }

// active targets can be created manually by pressing 'n'
window.onkeydown = function(e) {
    let key = e.key || e.keyCode
    console.log('key: ', key);
    switch(key) {
        case 'n':
            create_active_target();
            break;
    }
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
}

function draw_active_targets() {
    for (let i=0; i<activeTargetList.length; i++) {
        if (activeTargetList[i].hitPoints < 1) continue;
        context.beginPath();
        context.strokeStyle = '#FFFFFF';
        context.fillStyle = '#FFFFFF';
        context.lineWidth = 2;
        activeTargetList[i].y += 1;
        context.moveTo(activeTargetList[i].x, activeTargetList[i].y);
        context.lineTo(activeTargetList[i].x + 40, activeTargetList[i].y);
        context.lineTo(activeTargetList[i].x + 40, activeTargetList[i].y + 40);
        context.lineTo(activeTargetList[i].x, activeTargetList[i].y + 40);
        context.fill();
        context.stroke();
    }
}

function check_collisions_bullets_items() {
    // bullets - targets
    for (let j=0; j<bulletList.length; j++) {
        if (bulletList[j].hit == true) continue;
        for (let i=0; i<smallDumbEnemyList.length; i++) {
            if (smallDumbEnemyList[i].hitPoints <=0) continue;
            if (bulletList[j].x < smallDumbEnemyList[i].x+10 && smallDumbEnemyList[i].x-10 < bulletList[j].x) {
                if (bulletList[j].y < smallDumbEnemyList[i].y+3 && smallDumbEnemyList[i].y-7 < bulletList[j].y) {
                    smallDumbEnemyList[i].hitPoints--;
                    bulletList[j].hit = true;
                }
            }
        }
    }
    // side missiles - targets
    for (let j=0; j<sideMissileList.length; j++) {
        if (sideMissileList[j].hit == true) continue;
        for (let i=0; i<smallDumbEnemyList.length; i++) {
            if (smallDumbEnemyList[i].hitPoints <=0) continue;
            if (sideMissileList[j].x < smallDumbEnemyList[i].x+10 && smallDumbEnemyList[i].x-10 < sideMissileList[j].x) {
                if (sideMissileList[j].y < smallDumbEnemyList[i].y+3 && smallDumbEnemyList[i].y-7 < sideMissileList[j].y) {
                    smallDumbEnemyList[i].hitPoints--;
                    sideMissileList[j].hit = true;
                }
            }
        }
    }
}

let active_target_pointer = 0;
function go_through_active_target_list() {
    /*if (activeTargetList[active_target_pointer] != undefined) {
        let difference = shooter.x - (activeTargetList[active_target_pointer].x+40/2);
        if (difference > 0 && difference <=200) shooter.x -= 2;
        else if (difference < 0 && difference >= -200) shooter.x += 2;
        else if (difference > 200) {  // shooting left side missile
            let time = 0;
            for (let i=0; i<activeTargetList[active_target_pointer].hitPoints; i++) {
                let target_pointer = active_target_pointer;
                setTimeout(() => shoot_side_missile("left", target_pointer), time);
                time += 30;
            }
            active_target_pointer++;
        }
        else if (difference < -200) {  // shooting right side missile
            let time = 0;
            for (let i=0; i<activeTargetList[active_target_pointer].hitPoints; i++) {
                let target_pointer = active_target_pointer;
                setTimeout(() => shoot_side_missile("right", target_pointer), time);
                time += 30;
            }
            active_target_pointer++;
        }
        if (Math.abs(difference) < 1) {  // shooter pointing at target
            let time = 0;
            for (let i=0; i<activeTargetList[active_target_pointer].hitPoints; i++) {
                setTimeout(() => shoot_bullet(), time);
                time += 30;
            }
            active_target_pointer++;
        }
    }*/
    // smallDumbEnemyList
    if (smallDumbEnemyList[active_target_pointer] != undefined) {
        let difference = shooter.x - (smallDumbEnemyList[active_target_pointer].x);
        if (difference > 0 && difference <=200) shooter.x -= 2;
        else if (difference < 0 && difference >= -200) shooter.x += 2;
        else if (difference > 200) {  // shooting left side missile
            let time = 0;
            for (let i=0; i<smallDumbEnemyList[active_target_pointer].hitPoints; i++) {
                let target_pointer = smallDumbEnemyList;
                setTimeout(() => shoot_side_missile("left", target_pointer), time);
                time += 30;
            }
            active_target_pointer++;
        }
        else if (difference < -200) {  // shooting right side missile
            let time = 0;
            for (let i=0; i<smallDumbEnemyList[active_target_pointer].hitPoints; i++) {
                let target_pointer = active_target_pointer;
                setTimeout(() => shoot_side_missile("right", target_pointer), time);
                time += 30;
            }
            active_target_pointer++;
        }
        if (Math.abs(difference) < 1) {  // shooter pointing at target
            let time = 0;
            for (let i=0; i<smallDumbEnemyList[active_target_pointer].hitPoints; i++) {
                setTimeout(() => shoot_bullet(), time);
                time += 30;
            }
            active_target_pointer++;
        }
    }
    // mediumSimpleEnemyList
}

function draw_new_design() {
    context.beginPath();
    context.strokeStyle = '#FFFFFF';
    context.fillStyle = '#FFFFFF';
    context.lineWidth = 2;
    context.moveTo(100, 50);
    context.lineTo(115, 20);
    context.lineTo(85, 20);
    context.fill();
    context.stroke();
}

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
    if (counter%60 == 0) {  // creating an active target every 3 seconds
        //create_active_target();
        shoot_enemy_bullet(100);
    }
    if (counter%240 == 0) {
        create_small_dumb_enemy();
        //console.log("smallBumbEnemyList:", smallDumbEnemyList.length);
        //console.log("mediumSimpleEnemyList:", mediumSimpleEnemyList[0]);
        shoot_enemy_bullet(mediumSimpleEnemyList[0].x);
    }
    if (counter == 10) {  //(counter%360 == 0) {
        create_medium_simple_enemy();
        create_chapter_main_enemy();
    }
    draw_shooter(shooter);  // moving shooter
    if (smallDumbEnemyList.length > 0) {
        for (let i=0; i<smallDumbEnemyList.length; i++) {
            draw_small_dumb_enemy(smallDumbEnemyList[i]);
        }
    }
    if (mediumSimpleEnemyList.length > 0) {
        for (let i=0; i<mediumSimpleEnemyList.length; i++) {
            if (mediumSimpleEnemyList[i].hitPoints > 0) {
                draw_medium_simple_enemy(mediumSimpleEnemyList[i]);
            }
        }
    }
    go_through_active_target_list();
    //draw_asteroid_static(dy_asteroid_static);
    //draw_asteroid_dumb(dy_asteroid_dumb);
    //draw_enemy_small_dumb(dy_small_dumb);
    //draw_three_small_dumb_enemies(dy_small_dumb);  // uncommented, remove
    draw_new_design();
    draw_active_targets();
    if (chapterMainEnemy != undefined) {
        draw_chapter_main_enemy();
    }
    handle_bullet_positions();
    handle_enemy_bullet_positions();
    handle_side_missile_positions();
    check_collisions_bullets_items();
    //draw_asteroid_object(asteroidi);
    //asteroid_list.forEach(a => draw_asteroid_object(a))
    previous = timestamp;
    window.requestAnimationFrame(frame);
}
window.requestAnimationFrame(frame);

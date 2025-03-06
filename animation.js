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

class Shooter {
    constructor() {
        this.x = 300;
        this.y = 520;
    }
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

let enemyList = [];
class SmallDumbEnemy {
    constructor() {
        this.x = 50 + 500 * Math.random();
        this.y = -30;
        this.type = "small simple";
        this.hitPoints = 1;
    }
}

function create_small_dumb_enemy() {
    enemyList.push(new SmallDumbEnemy());
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
class MediumSimpleEnemy {
    constructor() {
        this.x = -50;
        this.y = 70;
        this.hitPoints = 10;
        this.type = "medium simple";
        this.moveDirection = "right";
    }
}

function create_medium_simple_enemy() {
    let medium_enemy = new MediumSimpleEnemy();
    mediumSimpleEnemyList.push(medium_enemy);
    enemyList.push(medium_enemy);
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
class ChapterMainEnemy {
    constructor() {
        this.x = 300;
        this.y = 0;
        this.hitPoints = 1000;
        this.moveDirection = "left";
    }
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
class EnemyBullet {
    constructor(x) {
        this.x = x;
        this.y = 70;
        this.hit = false;
    }
}

function shoot_enemy_bullet(x) {
    enemyBulletList.push(new EnemyBullet(x));
}

let enemyDirectionalBulletList = [];
class EnemyDirectionalBullet {
    constructor() {
        this.x = mediumSimpleEnemyList[mediumSimpleEnemyList.length-1].x;
        this.y = mediumSimpleEnemyList[mediumSimpleEnemyList.length-1].y;
        this.x_multiplier = (shooter.x - this.x) / 100;
        this.y_multiplier = (shooter.y - this.y) / 100;
        this.hit = false;
    }
}

function shoot_enemy_directional_bullet(x) {
    if (mediumSimpleEnemyList.length > 0) {
        enemyDirectionalBulletList.push(new EnemyDirectionalBullet(x));
    }
}

let enemyChapterMainTripleBulletList = [];
class EnemyChapterMainBullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.hit = false;
    }
}

function shoot_chapter_main_enemy_triple_bullets() {
    enemyChapterMainTripleBulletList.push(new EnemyChapterMainBullet(chapterMainEnemy.x-50, chapterMainEnemy.y-20));
    enemyChapterMainTripleBulletList.push(new EnemyChapterMainBullet(chapterMainEnemy.x, chapterMainEnemy.y));
    enemyChapterMainTripleBulletList.push(new EnemyChapterMainBullet(chapterMainEnemy.x+50, chapterMainEnemy.y-20));
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
function draw_enemy_directional_bullet(bullet) {
    if (bullet.hit == false) {
        context.beginPath();
        context.strokeStyle = '#FFFFFF';
        context.fillStyle = '#FFFFFF';
        context.lineWidth = 6;
        context.moveTo(bullet.x, bullet.y);
        bullet.x += bullet.x_multiplier * 0.95;
        bullet.y += bullet.y_multiplier;
        context.lineTo(bullet.x, bullet.y);
        context.fill();
        context.stroke();
    }
}
function draw_enemy_chapter_main_triple_bullets(bullet) {
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
let enemyDirectionalBulletListIteratorFirst = 0;
function handle_enemy_directional_bullet_positions() {
    for (let i=enemyDirectionalBulletListIteratorFirst; i<enemyDirectionalBulletList.length; i++) {
        if (enemyDirectionalBulletList[i].y > 700) {
            enemyDirectionalBulletListIteratorFirst++;
        }
        draw_enemy_directional_bullet(enemyDirectionalBulletList[i]);
    }
}
let enemyChapterMainTripleBulletListIteratorFirst = 0;
function handle_enemy_chapter_main_triple_bullets_positions() {
    for (let i=enemyChapterMainTripleBulletListIteratorFirst; i<enemyChapterMainTripleBulletList.length; i++) {
        if (enemyChapterMainTripleBulletList[i].y > 700) {
            enemyChapterMainTripleBulletListIteratorFirst++;
        }
        draw_enemy_chapter_main_triple_bullets(enemyChapterMainTripleBulletList[i]);
    }
}

// bullets shot by shooter
let bulletList = [];
class Bullet {
    constructor() {
        this.x = shooter.x;
        this.y = shooter.y;
        this.hit = false;
    }
}

function shoot_bullet() {
    bulletList.push(new Bullet());
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
class SideMissile {
    constructor(direction, target_pointer) {
        this.x = shooter.x;
        this.y = shooter.y+15;
        this.direction = direction;
        this.target_pointer = target_pointer;
        this.hit = false;
    }
}

function shoot_side_missile(direction, target_pointer) {
    sideMissileList.push(new SideMissile(direction, target_pointer));
}

function draw_side_missile(side_missile) {
    if (side_missile.hit == false && side_missile.y > -40) {
        context.beginPath();
        context.strokeStyle = '#FFFFFF';
        context.fillStyle = '#FFFFFF';
        context.lineWidth = 2;
        context.moveTo(side_missile.x, side_missile.y);
        side_missile.y -= 5;
        if (side_missile.x > enemyList[side_missile.target_pointer].x) {
            let difference = side_missile.x - (enemyList[side_missile.target_pointer].x);
            let delta_x = 7 * difference/100;  // missile x change is relative to target x
            if (delta_x > 7) delta_x = 7;      // missile x change is max 7
            side_missile.x -= delta_x;
        }
        if (side_missile.x < enemyList[side_missile.target_pointer].x) {
            let difference = (enemyList[side_missile.target_pointer].x) - side_missile.x;
            let delta_x = 7 * difference/100;  // missile x change is relative to target x
            if (delta_x > 7) delta_x = 7;      // missile x change is max 7
            side_missile.x += delta_x;
        }
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

// active targets can be created manually by pressing 'n'
window.onkeydown = function(e) {
    let key = e.key || e.keyCode
    //console.log('key: ', key);
    switch(key) {
        case 'n':
            create_small_dumb_enemy();
            break;
    }
}

function check_collisions_bullets_missiles_items() {
    // bullets - targets
    for (let j=0; j<bulletList.length; j++) {
        if (bulletList[j].hit == true) continue;
        for (let i=0; i<enemyList.length; i++) {
            if (enemyList[i].hitPoints <=0) continue;
            if (bulletList[j].x <= enemyList[i].x+10 && enemyList[i].x-10 <= bulletList[j].x) {
                if (bulletList[j].y <= enemyList[i].y+3 && enemyList[i].y-10 <= bulletList[j].y) {
                    enemyList[i].hitPoints--;
                    bulletList[j].hit = true;
                }
            }
        }
    }
    // side missiles - targets
    for (let j=0; j<sideMissileList.length; j++) {
        if (sideMissileList[j].hit == true) continue;
        for (let i=0; i<enemyList.length; i++) {
            if (enemyList[i].hitPoints <=0) continue;
            if (sideMissileList[j].x <= enemyList[i].x+10 && enemyList[i].x-10 <= sideMissileList[j].x) {
                if (sideMissileList[j].y <= enemyList[i].y+3 && enemyList[i].y-10 <= sideMissileList[j].y) {
                    enemyList[i].hitPoints--;
                    sideMissileList[j].hit = true;
                }
            }
        }
    }
}

let active_target_pointer = 0;
let active_medium_target_pointer = 0;
let active_chapter_enemy_target_pointer = 0;
function go_through_active_target_list() {
    if (enemyList[active_target_pointer] != undefined) {
        let difference = shooter.x - (enemyList[active_target_pointer].x);
        if (difference > 0 && difference <=200) shooter.x -= 2;
        else if (difference < 0 && difference >= -200) shooter.x += 2;
        else if (difference > 200) {  // shooting left side missile
            let time = 0;
            for (let i=0; i<enemyList[active_target_pointer].hitPoints; i++) {
                let target_pointer = active_target_pointer;
                setTimeout(() => shoot_side_missile("left", target_pointer), time);
                time += 30;
            }
            active_target_pointer++;
        }
        else if (difference < -200) {  // shooting right side missile
            let time = 0;
            for (let i=0; i<enemyList[active_target_pointer].hitPoints; i++) {
                let target_pointer = active_target_pointer;
                setTimeout(() => shoot_side_missile("right", target_pointer), time);
                time += 30;
            }
            active_target_pointer++;
        }
        if (Math.abs(difference) < 1) {  // shooter pointing at target
            let time = 0;
            for (let i=0; i<enemyList[active_target_pointer].hitPoints; i++) {
                setTimeout(() => shoot_bullet(), time);
                time += 30;
            }
            active_target_pointer++;
        }
    }
    // mediumSimpleEnemyList
    // chapter main enemy
    //console.log("chapter main enemy position:", chapterMainEnemy);
}

function enemy_in_front_direct_shooting(active_target_pointer) {
    //console.log("shooter x:", shooter.x);
    for (let i=0; i<enemyList.length; i++) {
        if (i == active_target_pointer) continue;
        if (enemyList[i].hitPoints > 0) {
            //console.log("enemyList:", enemyList[i].x, "shooter.x:", shooter.x);
            if ((enemyList[i].x < shooter.x+2) && (shooter.x-2 < enemyList[i].x)) {
                console.log("in sight:", shooter.x, enemyList[i].x, "SHOOTING");
                shoot_bullet();
            }
        }
    }
    console.log("________________________________");
}

function check_if_enemy_on_shooting_line() {
    for (let i=0; i<enemyList.length; i++) {
        if (enemyList[i].hitPoints > 0) {
            if ((enemyList[i].x < shooter.x+2) && (shooter.x-2 < enemyList[i].x)) {
                //console.log("in sight:", shooter.x, enemyList[i].x, "i&pointer:", i, active_target_pointer);
                if (i+1 != active_target_pointer) {
                    //console.log("shoot extra bullet");
                    shoot_bullet();
                }
            }
        }
    }
}

function go_through_missed_targets() {
    for (let i=0; i<active_target_pointer; i++) {
        if (enemyList[i].hitPoints > 0 && enemyList[i].y < 700) {
            console.log(i, active_target_pointer, "-", enemyList[i]);
        }
    }
    console.log("_________________________________");
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
    dy_asteroid_dumb += 2;
    dy_asteroid_static += 0.0;
    dy_small_dumb++;
    dy_active_targets++;
    counter++;
    if (counter == 10) {  //(counter%360 == 0) {
        create_chapter_main_enemy();
        if (shooter.x < 0) shooter.x++;
    }
    if (counter%3 == 0) {
        check_if_enemy_on_shooting_line();
        //enemy_in_front_direct_shooting(active_target_pointer);
    }
    if (counter%60 == 0) {
        shoot_enemy_bullet(100);
        go_through_missed_targets();
    }
    if (counter%120 == 0) {
        shoot_enemy_directional_bullet();  // medium sideways moving enemy
        shoot_chapter_main_enemy_triple_bullets();
    }
    if (counter%120 == 0) {
        create_small_dumb_enemy();
    }
    if (counter%600 == 0) {
        create_medium_simple_enemy();
        shoot_enemy_bullet(mediumSimpleEnemyList[0].x);
    }
    draw_shooter(shooter);  // moving shooter
    if (enemyList.length > 0) {
        for (let i=0; i<enemyList.length; i++) {
            if (enemyList[i].type == "small simple")
                draw_small_dumb_enemy(enemyList[i]);
        }
    }
    if (mediumSimpleEnemyList.length > 0) {
        for (let i=0; i<mediumSimpleEnemyList.length; i++) {
            if (mediumSimpleEnemyList[i].hitPoints > 0) {
                draw_medium_simple_enemy(mediumSimpleEnemyList[i]);
            }
        }
    }
    if (chapterMainEnemy != undefined) {
        draw_chapter_main_enemy();
    }
    go_through_active_target_list();
    //draw_asteroid_static(dy_asteroid_static);
    //draw_asteroid_dumb(dy_asteroid_dumb);
    //draw_enemy_small_dumb(dy_small_dumb);
    //draw_three_small_dumb_enemies(dy_small_dumb);  // uncommented, remove
    draw_new_design();
    //draw_active_targets();
    handle_enemy_bullet_positions();
    handle_enemy_directional_bullet_positions();
    handle_enemy_chapter_main_triple_bullets_positions();
    handle_bullet_positions();
    handle_side_missile_positions();
    check_collisions_bullets_missiles_items();
    //draw_asteroid_object(asteroidi);
    //asteroid_list.forEach(a => draw_asteroid_object(a))
    previous = timestamp;
    window.requestAnimationFrame(frame);
}
window.requestAnimationFrame(frame);

const score = document.querySelector('.score2'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.st'),
  car = document.createElement('div'),
  leftButton = document.querySelector('.left_button'),
  rightButton = document.querySelector('.right_button');


car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

leftButton.addEventListener("mouseover", left);
rightButton.addEventListener('mousemove', right)




const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

const settings = {
  start: false,
  score: 0,
  speed: 6,
  traffic: 3
}

function enemyElement(height) {
  return document.documentElement.clientHeight / height + 1;
}

function startGame() {
  gameArea.innerHTML = '';
  start.style.display = 'none';
  gameArea.classList.add('game_area');
  score.classList.add('score');
  car.style.left = '125px';
  car.style.top = 'auto';
  car.style.bottom = '10px';
  for (let i = 0; i < enemyElement(100); i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * 100) + 'px';
    line.y = i * 100;
    gameArea.appendChild(line);
  };
  for (let i = 0; i < enemyElement(100 * settings.traffic); i++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -100 * settings.traffic * (i + 1);
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    enemy.style.top = enemy.y + 'px';
    gameArea.appendChild(enemy);
  };

  settings.score = 0;
  settings.start = true;
  gameArea.appendChild(car);
  settings.x = car.offsetLeft;
  settings.y = car.offsetTop;
  requestAnimationFrame(playGame);
}

function playGame() {
  if (settings.start) {
    settings.score += settings.speed;
    score.innerHTML = 'SKORE<br>' + settings.score + '<br><br> SPEED <br>' + settings.speed + '<br><br> TRAFIC <br>' + settings.traffic;
    moveRoad();
    moveEnemy();
    if (keys.ArrowLeft && settings.x > 0) {
      settings.x -= settings.speed;
    };
    if (keys.ArrowRight && settings.x < 250) {
      settings.x += settings.speed;
    };
    if (keys.ArrowUp && settings.y > 0) {
      settings.y -= settings.speed;
    };
    if (keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)) {
      settings.y += settings.speed;
    };

    car.style.left = settings.x + 'px';
    car.style.top = settings.y + 'px';
    requestAnimationFrame(playGame);
  }
};



function startRun(event) {
  event.preventDefault();
  keys[event.key] = true;
}

function stopRun(event) {
  event.preventDefault();
  keys[event.key] = false;
}

function moveRoad() {
  let lines = document.querySelectorAll('.line');
  lines.forEach(function (line) {
    line.y += settings.speed;
    line.style.top = line.y + 'px';
    if (line.y >= document.documentElement.clientHeight + 20) {
      line.y = -100;
    }
  });
}

function moveEnemy() {
  let enemy = document.querySelectorAll('.enemy');
  enemy.forEach(function (item) {
    let carRect = car.getBoundingClientRect();
    let enemyRect = item.getBoundingClientRect();

    if (carRect.right >= enemyRect.left && carRect.left <= enemyRect.right
      && carRect.bottom >= enemyRect.top && carRect.top <= enemyRect.bottom) {
      settings.start = false;
      start.style.display = 'block';

    }

    item.y += settings.speed / 2;
    item.style.top = item.y + 'px';
    if (item.y >= document.documentElement.clientHeight) {
      item.y = -100 * settings.traffic;
      item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    }
  });
}

function left() {
  if (settings.x > 0) {
    settings.x -= settings.speed;
    car.style.left = settings.x + 'px';
  }
}
function right() {
  if (settings.x < 250) {
    settings.x += settings.speed;
    car.style.left = settings.x + 'px';
  }
}

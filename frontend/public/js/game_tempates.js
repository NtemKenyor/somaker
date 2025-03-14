let game_struct_01_obstacle_avoid = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>2D Racing Game</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      font-family: Arial, sans-serif;
    }

    .game-container {
      position: relative;
      width: 100%;
      height: 100vh;
      background-color: #f0f0f0;
    }

    #platformer {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 50px;
      background-color: #3498db;
    }

    .obstacle {
      position: absolute;
      top: -50px;
      width: 50px;
      height: 50px;
      background-color: #e74c3c;
    }

    #score {
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 24px;
      color: #2c3e50;
    }
  </style>
</head>
<body>
  <div class="game-container">
    <div id="platformer"></div>
    <div id="score">Score: 0</div>
  </div>

  <script>
    const platformer = document.getElementById("platformer");
    const scoreDisplay = document.getElementById("score");
    const gameContainer = document.querySelector(".game-container");

    let platformerX = 50; // Initial position of the platformer
    let score = 0;
    let gameSpeed = 5;
    let obstacleSpawnRate = 1000; // Initial obstacle spawn rate (1 second)
    let maxObstacles = 1; // Initial number of obstacles
    let obstacles = [];

    // Move platformer left or right
    function movePlatformer(direction) {
      if (direction === "left" && platformerX > 0) {
        platformerX -= 10;
      } else if (direction === "right" && platformerX < 100) {
        platformerX += 10;
      }
      platformer.style.left = platformerX + "%";
    }

    // Handle touch events for mobile
    document.addEventListener("touchstart", (e) => {
      const touchX = e.touches[0].clientX;
      if (touchX < window.innerWidth / 2) {
        movePlatformer("left");
      } else {
        movePlatformer("right");
      }
    });

    // Handle keyboard input for desktop
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        movePlatformer("left");
      } else if (e.key === "ArrowRight") {
        movePlatformer("right");
      }
    });

    // Create a new obstacle
    function createObstacle() {
      const obstacle = document.createElement("div");
      obstacle.className = "obstacle";
      obstacle.style.left = Math.random() * 80 + 10 + "%"; // Randomize horizontal position
      gameContainer.appendChild(obstacle);
      obstacles.push(obstacle);
    }

    // Move obstacles and check for collisions
    function updateGame() {
      // Move all obstacles
      obstacles.forEach((obstacle, index) => {
        const obstacleTop = parseFloat(getComputedStyle(obstacle).top);

        if (obstacleTop > window.innerHeight) {
          // Remove obstacle when it goes off-screen
          obstacle.remove();
          obstacles.splice(index, 1);
          score++;
          scoreDisplay.textContent = "Score: " + score;

          // Increase difficulty
          if (score % 5 === 0) {
            gameSpeed += 0.5; // Increase game speed
            maxObstacles++; // Increase maximum number of obstacles
            obstacleSpawnRate = Math.max(500, obstacleSpawnRate - 100); // Decrease spawn rate (min 500ms)
          }
        } else {
          obstacle.style.top = obstacleTop + gameSpeed + "px";
        }

        // Check for collision
        const platformerRect = platformer.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
          platformerRect.left < obstacleRect.right &&
          platformerRect.right > obstacleRect.left &&
          platformerRect.top < obstacleRect.bottom &&
          platformerRect.bottom > obstacleRect.top
        ) {
          alert("Game Over! Your score: " + score);
          resetGame();
        }
      });

      requestAnimationFrame(updateGame);
    }

    // Spawn obstacles at intervals
    function spawnObstacles() {
      if (obstacles.length < maxObstacles) {
        createObstacle();
      }
      setTimeout(spawnObstacles, obstacleSpawnRate);
    }

    // Reset game
    function resetGame() {
      // Remove all obstacles
      obstacles.forEach((obstacle) => obstacle.remove());
      obstacles = [];

      // Reset variables
      score = 0;
      gameSpeed = 5;
      maxObstacles = 1;
      obstacleSpawnRate = 1000;

      // Reset display
      scoreDisplay.textContent = "Score: " + score;
    }

    // Start the game
    spawnObstacles();
    updateGame();
  </script>
</body>
</html>`;



let game_struct_02_hit_disappear = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Click the Rat Game</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #ff9a9e, #fad0c4);
    }

    #game-container {
      position: relative;
      width: 100%;
      height: 100vh;
    }

    #object {
      position: absolute;
      font-size: 50px;
      cursor: pointer;
      user-select: none;
    }

    #score {
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 24px;
      color: #2c3e50;
    }

    #timer {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 24px;
      color: #2c3e50;
    }

    #game-over {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 32px;
      color: #e74c3c;
      display: none;
      text-align: center;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div id="game-container">
    <div id="object">🐭</div>
    <div id="score">Score: 0</div>
    <div id="timer">Time Left: 5</div>
    <div id="game-over">Game Over! Final Score: <span id="final-score"></span><br>Click to Restart</div>
  </div>

  <script>
    const object = document.getElementById("object");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const gameOverDisplay = document.getElementById("game-over");
    const finalScoreDisplay = document.getElementById("final-score");

    let score = 0;
    let timeLeft = 5;
    let timer;
    let gameActive = true;

    // List of emojis to use for the object
    const emojis = ["🐭", "🐹", "🐰", "🐻", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸"];

    // Move the object to a random position and change its emoji
    function moveObject() {
      const x = Math.random() * (window.innerWidth - 50);
      const y = Math.random() * (window.innerHeight - 50);
      object.style.left = x + "px";
      object.style.top = y + "px";
      object.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    }

    // Start the timer
    function startTimer() {
      timer = setInterval(function () {
        if (gameActive) {
          timeLeft--;
          timerDisplay.textContent = "Time Left: " + timeLeft;

          if (timeLeft <= 0) {
            endGame();
          }
        }
      }, 1000);
    }

    // Handle object click
    object.addEventListener("click", function () {
      if (gameActive) {
        score++;
        scoreDisplay.textContent = "Score: " + score;
        timeLeft = 5; // Reset the timer
        moveObject();
      }
    });
    

    // End the game
    function endGame() {
      gameActive = false;
      clearInterval(timer);
      object.style.display = "none";
      finalScoreDisplay.textContent = score;
      gameOverDisplay.style.display = "block";
    }

    // Restart the game
    function restartGame() {
      gameActive = true;
      score = 0;
      timeLeft = 5;
      scoreDisplay.textContent = "Score: " + score;
      timerDisplay.textContent = "Time Left: " + timeLeft;
      object.style.display = "block";
      gameOverDisplay.style.display = "none";
      moveObject();
      startTimer();
    }

    // Pause the game when the window is scrolled out of view
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        gameActive = false;
        clearInterval(timer);
      } else {
        gameActive = true;
        startTimer();
      }
    });

    // Start the game
    moveObject();
    startTimer();

    // Allow restarting the game by clicking the game over message
    gameOverDisplay.addEventListener("click", restartGame);
  </script>
</body>
</html>`;

let game_struct_03_gravity =  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Racing Game</title>
    <style>
        body { margin: 0; overflow: hidden; background: #111; color: white; font-family: Arial, sans-serif; }
        #gameCanvas { position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; }
        #hud { position: absolute; top: 20px; left: 20px; font-size: 20px; }
        #hud span { display: block; }
        #pauseBtn { margin-top: 10px; padding: 5px 10px; cursor: pointer; }
    </style>
</head>
<body>
    <canvas id="gameCanvas"></canvas>
    <div id="hud">
        <span>Speed: <span id="speed">0</span> km/h 🚗</span>
        <span>Score: <span id="score">0</span> ⭐</span>
        <span>Time: <span id="timer">0</span> ⏱️</span>
        <button id="pauseBtn">Pause ⏸️</button>
    </div>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        let running = true;
        let speed = 0;
        let score = 0;
        let time = 0;
        let lastFrame = performance.now();
        let isPaused = false;
        let car = { x: canvas.width / 2 - 25, y: canvas.height - 100, width: 50, height: 80 };
        let obstacles = [];
        let keys = {};

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function gameLoop(timestamp) {
            if (!running) return;
            let deltaTime = (timestamp - lastFrame) / 1000;
            lastFrame = timestamp;
            if (!isPaused) {
                speed = Math.min(speed + 0.1, 200);
                score += Math.floor(speed * deltaTime);
                time += deltaTime;
                document.getElementById('speed').textContent = Math.round(speed);
                document.getElementById('score').textContent = score;
                document.getElementById('timer').textContent = time.toFixed(1);
                updateGame(deltaTime);
                drawGame();
            }
            requestAnimationFrame(gameLoop);
        }
        requestAnimationFrame(gameLoop);

        function updateGame(deltaTime) {
            if (keys['ArrowLeft']) car.x -= 200 * deltaTime;
            if (keys['ArrowRight']) car.x += 200 * deltaTime;
            if (keys['ArrowUp']) car.y -= 200 * deltaTime;
            if (keys['ArrowDown']) car.y += 200 * deltaTime;
            car.x = Math.max(0, Math.min(canvas.width - car.width, car.x));
            car.y = Math.max(0, Math.min(canvas.height - car.height, car.y));
            
            if (Math.random() < 0.02) {
                obstacles.push({ x: Math.random() * (canvas.width - 50), y: -50, width: 50, height: 50 });
            }
            obstacles.forEach(obstacle => obstacle.y += speed * deltaTime);
            obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
        }

        function drawGame() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'blue';
            ctx.fillRect(car.x, car.y, car.width, car.height);
            ctx.fillStyle = 'red';
            obstacles.forEach(obstacle => ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height));
        }

        document.getElementById('pauseBtn').addEventListener('click', () => {
            isPaused = !isPaused;
            document.getElementById('pauseBtn').textContent = isPaused ? 'Play ▶️' : 'Pause ⏸️';
        });

        window.addEventListener('keydown', (e) => keys[e.key] = true);
        window.addEventListener('keyup', (e) => keys[e.key] = false);
        window.addEventListener('scroll', () => {
            const rect = canvas.getBoundingClientRect();
            running = rect.top < window.innerHeight && rect.bottom > 0;
        });
    </script>
</body>
</html>
`;


let game_struct_05_aiming_structure = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3D Aiming Game</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      font-family: Arial, sans-serif;
    }

    canvas {
      display: block;
      background: linear-gradient(to bottom, #87CEEB, #1E90FF);
    }

    #score {
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 24px;
      color: white;
    }

    #shots {
      position: absolute;
      top: 40px;
      left: 10px;
      font-size: 24px;
      color: white;
    }

    #pause {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 32px;
      color: white;
      display: none;
    }
  </style>
</head>
<body>
  <canvas id="gameCanvas"></canvas>
  <div id="score">Score: 0</div>
  <div id="shots">Shots: 0</div>
  <div id="pause">Paused</div>

  <script>
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const scoreDisplay = document.getElementById("score");
    const shotsDisplay = document.getElementById("shots");
    const pauseDisplay = document.getElementById("pause");

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Game variables
    let score = 0;
    let shots = 0;
    let isPaused = false;
    let targets = [];
    let bullets = [];

    // Target class
    class Target {
      constructor(x, y, z, size) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
      }

      draw() {
        const scale = 100 / (this.z + 100); // Perspective scaling
        const screenX = this.x * scale + canvas.width / 2;
        const screenY = this.y * scale + canvas.height / 2;
        const screenSize = this.size * scale;

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(screenX, screenY, screenSize, 0, Math.PI * 2);
        ctx.fill();
      }

      isHit(bullet) {
        const scale = 100 / (this.z + 100);
        const screenX = this.x * scale + canvas.width / 2;
        const screenY = this.y * scale + canvas.height / 2;
        const screenSize = this.size * scale;

        return (
          bullet.x > screenX - screenSize &&
          bullet.x < screenX + screenSize &&
          bullet.y > screenY - screenSize &&
          bullet.y < screenY + screenSize
        );
      }
    }

    // Bullet class
    class Bullet {
      constructor(x, y, z, dx, dy, dz) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.dx = dx;
        this.dy = dy;
        this.dz = dz;
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;
        this.z += this.dz;
      }

      draw() {
        const scale = 100 / (this.z + 100);
        const screenX = this.x * scale + canvas.width / 2;
        const screenY = this.y * scale + canvas.height / 2;

        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(screenX, screenY, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create targets
    function createTargets() {
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * 800 - 400;
        const y = Math.random() * 800 - 400;
        const z = Math.random() * 500 + 100;
        const size = Math.random() * 20 + 10;
        targets.push(new Target(x, y, z, size));
      }
    }

    // Shoot a bullet
    function shootBullet() {
      const dx = (Math.random() - 0.5) * 10;
      const dy = (Math.random() - 0.5) * 10;
      const dz = 10;
      bullets.push(new Bullet(0, 0, 0, dx, dy, dz));
      shots++;
      shotsDisplay.textContent = "Shots: " + shots;
    }

    // Update game state
    function update() {
      if (isPaused) return;

      // Update bullets
      bullets.forEach((bullet, index) => {
        bullet.update();

        // Check for collisions with targets
        targets.forEach((target, targetIndex) => {
          if (target.isHit(bullet)) {
            score++;
            scoreDisplay.textContent = "Score: " + score;
            targets.splice(targetIndex, 1);
            bullets.splice(index, 1);
          }
        });

        // Remove bullets that go out of view
        if (bullet.z > 1000) {
          bullets.splice(index, 1);
        }
      });

      // Add new targets if all are hit
      if (targets.length === 0) {
        createTargets();
      }
    }

    // Draw game objects
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw targets
      targets.forEach((target) => target.draw());

      // Draw bullets
      bullets.forEach((bullet) => bullet.draw());
    }

    // Game loop
    function gameLoop() {
      if (!isPaused) {
        update();
        draw();
      }
      requestAnimationFrame(gameLoop);
    }

    // Pause the game
    function pauseGame() {
      isPaused = !isPaused;
      pauseDisplay.style.display = isPaused ? "block" : "none";
    }

    // Event listeners
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        pauseGame();
      }
    });

    document.addEventListener("click", () => {
      if (!isPaused) {
        shootBullet();
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        pauseGame();
      }
    });

    // Start the game
    createTargets();
    gameLoop();
  </script>
</body>
</html>`;


let game_struct_04_3d_mess = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3D Maze Game</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      font-family: Arial, sans-serif;
    }

    canvas {
      display: block;
      background: #87CEEB;
    }

    #pause {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 32px;
      color: white;
      display: none;
    }
  </style>
</head>
<body>
  <canvas id="gameCanvas"></canvas>
  <div id="pause">Paused</div>

  <script>
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const pauseDisplay = document.getElementById("pause");

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Game variables
    let isPaused = false;
    let player = { x: 50, y: 50, z: 0, radius: 10 };
    let goal = { x: 400, y: 400, z: 0, radius: 20 };
    let walls = [
      { x: 100, y: 100, z: 0, width: 200, height: 10, depth: 10 },
      { x: 300, y: 100, z: 0, width: 10, height: 200, depth: 10 },
      { x: 100, y: 300, z: 0, width: 200, height: 10, depth: 10 },
      { x: 100, y: 100, z: 0, width: 10, height: 200, depth: 10 },
    ];

    // Draw a 3D rectangle (wall)
    function drawWall(wall) {
      const scale = 100 / (wall.z + 100); // Perspective scaling
      const screenX = wall.x * scale + canvas.width / 2;
      const screenY = wall.y * scale + canvas.height / 2;
      const screenWidth = wall.width * scale;
      const screenHeight = wall.height * scale;

      ctx.fillStyle = "brown";
      ctx.fillRect(screenX, screenY, screenWidth, screenHeight);
    }

    // Draw the player (ball)
    function drawPlayer() {
      const scale = 100 / (player.z + 100); // Perspective scaling
      const screenX = player.x * scale + canvas.width / 2;
      const screenY = player.y * scale + canvas.height / 2;
      const screenRadius = player.radius * scale;

      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(screenX, screenY, screenRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw the goal
    function drawGoal() {
      const scale = 100 / (goal.z + 100); // Perspective scaling
      const screenX = goal.x * scale + canvas.width / 2;
      const screenY = goal.y * scale + canvas.height / 2;
      const screenRadius = goal.radius * scale;

      ctx.fillStyle = "green";
      ctx.beginPath();
      ctx.arc(screenX, screenY, screenRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Check for collisions with walls
    function checkCollisions() {
      for (const wall of walls) {
        if (
          player.x + player.radius > wall.x &&
          player.x - player.radius < wall.x + wall.width &&
          player.y + player.radius > wall.y &&
          player.y - player.radius < wall.y + wall.height
        ) {
          // Move player back to previous position
          player.x = player.prevX;
          player.y = player.prevY;
        }
      }
    }

    // Check if player reaches the goal
    function checkGoal() {
      const dx = player.x - goal.x;
      const dy = player.y - goal.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < player.radius + goal.radius) {
        alert("You Win!");
        resetGame();
      }
    }

    // Reset the game
    function resetGame() {
      player.x = 50;
      player.y = 50;
    }

    // Update game state
    function update() {
      if (isPaused) return;

      // Save previous position for collision handling
      player.prevX = player.x;
      player.prevY = player.y;

      // Move player
      if (keys.ArrowUp) player.y -= 2;
      if (keys.ArrowDown) player.y += 2;
      if (keys.ArrowLeft) player.x -= 2;
      if (keys.ArrowRight) player.x += 2;

      // Check for collisions and goal
      checkCollisions();
      checkGoal();
    }

    // Draw game objects
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw walls
      walls.forEach((wall) => drawWall(wall));

      // Draw goal
      drawGoal();

      // Draw player
      drawPlayer();
    }

    // Game loop
    function gameLoop() {
      if (!isPaused) {
        update();
        draw();
      }
      requestAnimationFrame(gameLoop);
    }

    // Pause the game
    function pauseGame() {
      isPaused = !isPaused;
      pauseDisplay.style.display = isPaused ? "block" : "none";
    }

    // Handle keyboard input
    const keys = {};
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        pauseGame();
      } else {
        keys[e.code] = true;
      }
    });

    document.addEventListener("keyup", (e) => {
      keys[e.code] = false;
    });

    // Handle touch input (mobile)
    let touchStartX = 0;
    let touchStartY = 0;
    document.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });

    document.addEventListener("touchmove", (e) => {
      if (isPaused) return;

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;

      if (Math.abs(dx) > Math.abs(dy)) {
        player.x += dx > 0 ? 5 : -5;
      } else {
        player.y += dy > 0 ? 5 : -5;
      }

      touchStartX = touchEndX;
      touchStartY = touchEndY;
    });

    // Pause when window is out of view
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        pauseGame();
      }
    });

    // Start the game
    gameLoop();
  </script>
</body>
</html>`;

let game_struct_05_3d_starter = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Racing Game</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
        body { margin: 0; overflow: hidden; background: #111; color: white; font-family: Arial, sans-serif; }
        #hud { position: absolute; top: 20px; left: 20px; font-size: 20px; }
        #hud span { display: block; }
        #pauseBtn { margin-top: 10px; padding: 5px 10px; cursor: pointer; }
    </style>
</head>
<body>
    <div id="hud">
        <span>Speed: <span id="speed">0</span> km/h 🚗</span>
        <span>Score: <span id="score">0</span> ⭐</span>
        <span>Time: <span id="timer">0</span> ⏱️</span>
        <button id="pauseBtn">Pause ⏸️</button>
    </div>
    <script>
        let scene, camera, renderer, car, obstacles = [];
        let speed = 0, score = 0, time = 0, isPaused = false;

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            // Add ambient light
            const light = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(light);

            // Add directional light
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(0, 1, 1);
            scene.add(directionalLight);

            // Create a material design car
            car = createCar();
            car.position.z = -5;
            scene.add(car);

            camera.position.set(0, 2, 5);
            camera.lookAt(car.position);

            animate();
        }

        // Function to create a material design car
        function createCar() {
            const car = new THREE.Group();

            // Car body
            const bodyGeometry = new THREE.BoxGeometry(2, 1, 4);
            const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, flatShading: true });
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            body.position.y = 0.5;
            car.add(body);

            // Car roof
            const roofGeometry = new THREE.BoxGeometry(1.5, 0.5, 2);
            const roofMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });
            const roof = new THREE.Mesh(roofGeometry, roofMaterial);
            roof.position.y = 1.25;
            car.add(roof);

            // Wheels
            const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 16);
            const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333, flatShading: true });

            const wheelPositions = [
                { x: -1, y: -0.5, z: 1.5 },
                { x: 1, y: -0.5, z: 1.5 },
                { x: -1, y: -0.5, z: -1.5 },
                { x: 1, y: -0.5, z: -1.5 },
            ];

            wheelPositions.forEach(pos => {
                const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
                wheel.rotation.x = Math.PI / 2; // Rotate to make it look like a wheel
                wheel.position.set(pos.x, pos.y, pos.z);
                car.add(wheel);
            });

            return car;
        }

        function animate() {
            if (!isPaused) {
                speed += 0.01;
                score += Math.floor(speed);
                document.getElementById('speed').textContent = Math.round(speed);
                document.getElementById('score').textContent = score;
                document.getElementById('timer').textContent = (time += 0.01).toFixed(1);
            }
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        document.getElementById('pauseBtn').addEventListener('click', () => {
            isPaused = !isPaused;
            document.getElementById('pauseBtn').textContent = isPaused ? 'Play ▶️' : 'Pause ⏸️';
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') car.position.x -= 0.2;
            if (e.key === 'ArrowRight') car.position.x += 0.2;
            if (e.key === 'ArrowUp') car.position.z -= 0.2;
            if (e.key === 'ArrowDown') car.position.z += 0.2;
        });

        init();
    </script>
</body>
</html>`;

const templates = [
  {
      name: 'Way Race',
      emoji: '🏁',
      description: 'Race against opponents in a thrilling 3-way competition!',
      html: game_struct_01_obstacle_avoid,
  },
  {
      name: '3D View',
      emoji: '🚗',
      description: 'Experience high-speed racing in a 3D environment!',
      html: game_struct_05_3d_starter,
  },
  {
      name: 'Gravity Game',
      emoji: '🌍',
      description: 'Defy gravity and solve puzzles in space!',
      html: game_struct_03_gravity,
  },
  {
      name: 'Detection Game',
      emoji: '🔍',
      description: 'Find hidden objects and solve mysteries!',
      html: game_struct_04_3d_mess,
  },
  {
      name: 'Fight Game',
      emoji: '🥊',
      description: 'Battle opponents and become the champion!',
      html: game_struct_02_hit_disappear,
  },
];

// Function to generate template items
function generateTemplateItems() {
  const templatesContainer = document.getElementById('templates');

  templates.forEach((template) => {
      const templateItem = document.createElement('div');
      templateItem.className = 'template-item';
      templateItem.onclick = () => addTemplate(template.name, template.emoji, template.html);

      const emojiDiv = document.createElement('div');
      emojiDiv.className = 'emoji';
      emojiDiv.textContent = template.emoji;

      const descriptionP = document.createElement('p');
      descriptionP.textContent = template.name;

      templateItem.appendChild(emojiDiv);
      templateItem.appendChild(descriptionP);
      templatesContainer.appendChild(templateItem);
  });
}

// Function to load a random template
function loadRandomTemplate() {
  if (templates.length === 0) {
      console.warn('No templates available.');
      return;
  }

  // Select a random template
  const randomIndex = Math.floor(Math.random() * templates.length);
  const randomTemplate = templates[randomIndex];

  // Load the random template into the gameOutput and codeTextarea
  document.getElementById('gameOutput').srcdoc = randomTemplate.html;
  document.getElementById('codeTextarea').value = randomTemplate.html;

  // Set the current project name
  // currentProject = `project_${randomTemplate.name.replace(/\s+/g, '_')}`;

  // Save the state
  saveState();

  console.log(`Loaded random template: ${randomTemplate.name}`);
}

// Initialize templates and load a random template if currentProject is null
window.onload = () => {
  generateTemplateItems();

  if (!currentProject) {
      loadRandomTemplate();
  }

  // Other initialization code...
};
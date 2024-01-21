document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const gridSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = generateFood();
    let direction = 'right';
    let isGameOver = false;
    let score = 0;
    let highScore = 0;
    let gameInterval;

    function draw() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (isGameOver) {
            drawCollisionBorders();
            alert('Game Over! Score: ' + score);
            if (score > highScore) {
                highScore = score;
                highScoreBoard.textContent = 'High Score: ' + highScore;
            }
            restartGame();
            return;
        }

        // Draw snake
        snake.forEach(segment => {
            ctx.fillStyle = 'green';
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });

        // Draw food
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

        // Update score
        scoreBoard.textContent = 'Score: ' + score;
    }

    function drawCollisionBorders() {
        // Draw red borders on collision
        ctx.fillStyle = 'red';
        if (snake[0].x < 0) {
            ctx.fillRect(0, 0, gridSize, canvas.height);
        } else if (snake[0].x >= canvas.width / gridSize) {
            ctx.fillRect(canvas.width - gridSize, 0, gridSize, canvas.height);
        }

        if (snake[0].y < 0) {
            ctx.fillRect(0, 0, canvas.width, gridSize);
        } else if (snake[0].y >= canvas.height / gridSize) {
            ctx.fillRect(0, canvas.height - gridSize, canvas.width, gridSize);
        }
    }

    function generateFood() {
        const x = Math.floor(Math.random() * (canvas.width / gridSize));
        const y = Math.floor(Math.random() * (canvas.height / gridSize));
        return { x, y };
    }

    function move() {
        const head = Object.assign({}, snake[0]);

        switch (direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }

        // Check for collisions with walls
        if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
            isGameOver = true;
        }

        // Check for collisions with itself
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            isGameOver = true;
        }

        // Check for collisions with food
        if (head.x === food.x && head.y === food.y) {
            snake.unshift(food);
            food = generateFood();
            score += 1;
        } else {
            // Move snake
            snake.pop();
            snake.unshift(head);
        }

        draw();
    }

    function handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }

    function restartGame() {
        clearInterval(gameInterval);
        snake = [{ x: 10, y: 10 }];
        food = generateFood();
        direction = 'right';
        isGameOver = false;
        score = 0;
        draw();
    }

    function startGame() {
        if (gameInterval) {
            clearInterval(gameInterval);
        }
        // Start de gameInterval bij het starten van het spel
        gameInterval = setInterval(move, 150);
    }

    document.addEventListener('keydown', handleKeyPress);
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);

    // De gameInterval wordt niet automatisch gestart bij het laden van de pagina
    //gameInterval = setInterval(move, 200);
});

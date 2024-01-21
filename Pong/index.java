<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pong Game</title>
    <style>
        body {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #111;
            color: #fff;
        }

        canvas {
            border: 2px solid #fff;
        }
    </style>
</head>
<body>
    <canvas id="pongCanvas" width="800" height="400"></canvas>

    <script>
        const canvas = document.getElementById("pongCanvas");
        const ctx = canvas.getContext("2d");

        // Paddle and ball properties
        const paddleWidth = 10, paddleHeight = 60;
        let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
        let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
        const paddleSpeed = 5;

        const ballSize = 10;
        let ballX = canvas.width / 2;
        let ballY = canvas.height / 2;
        let ballSpeedX = 5;
        let ballSpeedY = 2;

        // Keyboard controls
        let upPressed = false;
        let downPressed = false;

        document.addEventListener("keydown", keyDownHandler);
        document.addEventListener("keyup", keyUpHandler);

        function keyDownHandler(e) {
            if (e.key === "Up" || e.key === "ArrowUp") {
                upPressed = true;
            } else if (e.key === "Down" || e.key === "ArrowDown") {
                downPressed = true;
            }
        }

        function keyUpHandler(e) {
            if (e.key === "Up" || e.key === "ArrowUp") {
                upPressed = false;
            } else if (e.key === "Down" || e.key === "ArrowDown") {
                downPressed = false;
            }
        }

        function draw() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw paddles
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
            ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

            // Draw the ball
            ctx.beginPath();
            ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();

            // Update ball position
            ballX += ballSpeedX;
            ballY += ballSpeedY;

            // Bounce off top and bottom
            if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
                ballSpeedY = -ballSpeedY;
            }

            // Bounce off paddles
            if (
                (ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
                (ballX + ballSize > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
            ) {
                ballSpeedX = -ballSpeedX;
            }

            // Reset ball position if it goes out of bounds
            if (ballX - ballSize < 0 || ballX + ballSize > canvas.width) {
                ballX = canvas.width / 2;
                ballY = canvas.height / 2;
            }

            // Move left paddle
            if (upPressed && leftPaddleY > 0) {
                leftPaddleY -= paddleSpeed;
            } else if (downPressed && leftPaddleY < canvas.height - paddleHeight) {
                leftPaddleY += paddleSpeed;
            }

            // Simple AI for the right paddle
            if (ballY > rightPaddleY + paddleHeight / 2) {
                rightPaddleY += 2;
            } else {
                rightPaddleY -= 2;
            }

            // Keep paddles within bounds
            leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddleY));
            rightPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddleY));
        }

        function gameLoop() {
            draw();
            requestAnimationFrame(gameLoop);
        }

        gameLoop();
    </script>
</body>
</html>

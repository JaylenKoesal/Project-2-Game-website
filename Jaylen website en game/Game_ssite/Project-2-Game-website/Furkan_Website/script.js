
    // Get the canvas and context
    const canvas = document.getElementById("pongCanvas");
    const ctx = canvas.getContext("2d");

    // Set up the initial paddle and ball positions
    let paddleHeight = 80;
    let paddleWidth = 10;
    let paddle1Y = (canvas.height - paddleHeight) / 2;
    let paddle2Y = (canvas.height - paddleHeight) / 2;
    let ballSize = 10;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = 5;
    let ballSpeedY = 5;

    // Set up keyboard controls
    let upKeyPressed = false;
    let downKeyPressed = false;

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    function keyDownHandler(e) {
      if (e.key == "ArrowUp") {
        upKeyPressed = true;
      } else if (e.key == "ArrowDown") {
        downKeyPressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.key == "ArrowUp") {
        upKeyPressed = false;
      } else if (e.key == "ArrowDown") {
        downKeyPressed = false;
      }
    }

    // Update the game state
    function update() {
      // Move paddles
      if (upKeyPressed && paddle2Y > 0) {
        paddle2Y -= 7;
      } else if (downKeyPressed && paddle2Y < canvas.height - paddleHeight) {
        paddle2Y += 7;
      }

      // Move the ball
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Bounce off the top and bottom walls
      if (ballY - ballSize / 2 < 0 || ballY + ballSize / 2 > canvas.height) {
        ballSpeedY = -ballSpeedY;
      }

      // Bounce off the paddles
      if (
        (ballX - ballSize / 2 < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) ||
        (ballX + ballSize / 2 > canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight)
      ) {
        ballSpeedX = -ballSpeedX;
      }

      // Reset ball if it goes beyond the paddles
      if (ballX - ballSize / 2 < 0 || ballX + ballSize / 2 > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
      }

      // Move the paddle1 (left paddle) towards the ball
      if (paddle1Y + paddleHeight / 2 < ballY) {
        paddle1Y += 5;
      } else {
        paddle1Y -= 5;
      }
    }

    // Draw everything on the canvas
    function draw() {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw paddles
      ctx.fillStyle = "#000";
      ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
      ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

      // Draw the ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.closePath();
    }

    // Main game loop
    function gameLoop() {
      update();
      draw();
      requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();
  


 



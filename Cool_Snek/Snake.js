document.addEventListener('DOMContentLoaded', function() {
    const apple = document.querySelector('.apple');
    const playground = document.querySelector('.playground');
    const snakeHead = document.createElement('div');
    snakeHead.classList.add('snake');
    playground.appendChild(snakeHead);

    let positionX = Math.floor(playground.clientWidth / 2);
    let positionY = Math.floor(playground.clientHeight / 2);
    let direction = 'right';
    let snakeBody = [];

    snakeHead.style.left = positionX + 'px';
    snakeHead.style.top = positionY + 'px';

    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    });

    function toggleAppleVisibility() {
        if (apple.style.display === 'none') {
            apple.style.display = 'block';
        } else {
            apple.style.display = 'none';
        }
    }

    function randomizeApplePosition() {
        const appleSize = 6 * playground.clientHeight / 100;
        const maxX = playground.clientWidth - appleSize;
        const maxY = playground.clientHeight - appleSize;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        apple.style.left = randomX + 'px';
        apple.style.top = randomY + 'px';
    }

    function checkCollision() {
        const headRect = snakeHead.getBoundingClientRect();
        const appleRect = apple.getBoundingClientRect();

        // Check collision with apple
        if (
            headRect.left < appleRect.right &&
            headRect.right > appleRect.left &&
            headRect.top < appleRect.bottom &&
            headRect.bottom > appleRect.top
        ) {
            return 'apple';
        }

        const playgroundRect = playground.getBoundingClientRect();

        // Check collision with playground borders
        if (
            headRect.left < playgroundRect.left ||
            headRect.right > playgroundRect.right ||
            headRect.top < playgroundRect.top ||
            headRect.bottom > playgroundRect.bottom
        ) {
            return 'border';
        }

        // Check collision with its own body
        for (let i = 0; i < snakeBody.length; i++) {
            const bodyPart = snakeBody[i];
            const bodyRect = bodyPart.getBoundingClientRect();

            if (
                headRect.left === bodyRect.left &&
                headRect.top === bodyRect.top
            ) {
                return 'self';
            }
        }

        return null;
    }

    function gameOver() {
        document.querySelector('.dedz').classList.add('show');
    }

    function addSnakeBody() {
        const newBodyPart = document.createElement('div');
        newBodyPart.classList.add('snake-body');
        
        // Place the new body part at the position of the last segment or the head if it's the first segment
        if (snakeBody.length > 0) {
            const lastBodyPart = snakeBody[snakeBody.length - 1];
            newBodyPart.style.left = lastBodyPart.style.left;
            newBodyPart.style.top = lastBodyPart.style.top;
        } else {
            newBodyPart.style.left = snakeHead.style.left;
            newBodyPart.style.top = snakeHead.style.top;
        }

        playground.appendChild(newBodyPart);
        snakeBody.push(newBodyPart);
    }

    function updateSnakeBody() {
        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i].style.left = snakeBody[i - 1].style.left;
            snakeBody[i].style.top = snakeBody[i - 1].style.top;
        }
        if (snakeBody.length > 0) {
            snakeBody[0].style.left = snakeHead.style.left;
            snakeBody[0].style.top = snakeHead.style.top;
        }
    }

    function updateSnake() {
        switch (direction) {
            case 'up':
                positionY -= 20;
                snakeHead.classList.remove('down', 'left', 'right');
                snakeHead.classList.add('up');
                break;
            case 'down':
                positionY += 20;
                snakeHead.classList.remove('up', 'left', 'right');
                snakeHead.classList.add('down');
                break;
            case 'left':
                positionX -= 20;
                snakeHead.classList.remove('up', 'down', 'right');
                snakeHead.classList.add('left');
                break;
            case 'right':
                positionX += 20;
                snakeHead.classList.remove('up', 'down', 'left');
                snakeHead.classList.add('right');
                break;
        }

        snakeHead.style.left = positionX + 'px';
        snakeHead.style.top = positionY + 'px';

        const collision = checkCollision();
        if (collision === 'apple') {
            randomizeApplePosition();
            addSnakeBody();
        } else if (collision === 'border' || collision === 'self') {
            gameOver();
            clearInterval(gameLoop);
        }

        updateSnakeBody();
    }

    // Faster snake movement: change the interval to a lower value, e.g., 100 milliseconds
    const gameLoop = setInterval(updateSnake, 100);

    randomizeApplePosition();

    document.querySelector('.uppermiddle').addEventListener('click', function() {
        if (direction !== 'down') direction = 'up';
    });

    document.querySelector('.lowermiddle').addEventListener('click', function() {
        if (direction !== 'up') direction = 'down';
    });

    document.querySelector('.lowerleft').addEventListener('click', function() {
        if (direction !== 'right') direction = 'left';
    });

    document.querySelector('.lowerright').addEventListener('click', function() {
        if (direction !== 'left') direction = 'right';
    });

    document.querySelector('.soundbutton').addEventListener('click', function() {
        const bgMusic = document.getElementById('snakegamebgmusic');
        if (bgMusic.paused) {
            bgMusic.play();
        } else {
            bgMusic.pause();
        }
    });

    setInterval(function() {
        toggleAppleVisibility();
        randomizeApplePosition();
    }, 3000);
});

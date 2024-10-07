const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const scoreElement = document.querySelector("#score");

const MODES = {
    FALL: "FALL",
    BOUNCE: "BOUNCE",
    GAME_OVER: "GAME_OVER",
};

const BOX_HEIGHT = 50;
const INITIAL_BOX_WIDTH = 200;
const INITIAL_X_SPEED = 1;
const FALL_SPEED = 5;

let boxes, mode, xSpeed, currentBox, score, animationId;

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoxes();

    if (mode == MODES.GAME_OVER) {
        gameOver();
    }

    if (mode === MODES.BOUNCE) {
        bounce();
    }

    if (mode == MODES.FALL) {
        fall();
    }

    animationId = window.requestAnimationFrame(draw);
}

function startNewGame() {
    if (animationId) {
        window.cancelAnimationFrame(animationId);
    }

    const initialBox = {
        x: canvas.width / 2 - INITIAL_BOX_WIDTH / 2,
        y: canvas.height - BOX_HEIGHT,
        width: INITIAL_BOX_WIDTH,
        color: getRandomColor(),
    };

    boxes = [];
    boxes.push(initialBox);
    xSpeed = INITIAL_X_SPEED;
    canvas.style.backgroundColor = null;
    currentBox = null;
    score = 0;
    scoreElement.textContent = score;
    mode = MODES.BOUNCE;
    draw();
}

function drawBoxes() {
    boxes.forEach((box) => {
        drawBox(box);
    });
    drawBox(currentBox);
}

function drawBox(box) {
    if (!box) return;
    let { color, x, y, width } = box;
    context.fillStyle = color;
    context.fillRect(x, y, width, BOX_HEIGHT);
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

function bounce() {
    if (!currentBox) {
        const lastBox = getLastBox();
        currentBox = {
            x: Math.random() * (canvas.width - lastBox.width),
            y: 0,
            width: lastBox.width,
            color: getRandomColor(),
        };
    }

    currentBox.x += xSpeed;

    hasHitRightWall = currentBox.width + currentBox.x > canvas.width;
    hasHitLeftWall = currentBox.x < 0;

    if (hasHitRightWall || hasHitLeftWall) {
        xSpeed = -xSpeed;
    }
}

function fall() {
    const lastBox = getLastBox();
    currentBox.y += FALL_SPEED;
    if (currentBox.y + BOX_HEIGHT >= lastBox.y) {
        land();
    }
}

function land() {
    const lastBox = getLastBox();
    const difference = currentBox.x - lastBox.x;

    if (currentBox.x > lastBox.x + lastBox.width || currentBox.x + currentBox.width < lastBox.x) {
        mode = MODES.GAME_OVER;
        return;
    }

    if (currentBox.x > lastBox.x) {
        currentBox.width -= difference;
    } else {
        currentBox.width += difference;
        currentBox.x -= difference;
    }

    boxes.push(currentBox);

    if (boxes.length > 6) {
        boxes.forEach((box) => {
            box.y += BOX_HEIGHT;
        });
        boxes = boxes.filter((box) => box.y < canvas.height);
    }

    currentBox = null;
    xSpeed > 0 ? (xSpeed += 0.1) : (xSpeed -= 0.1);
    score++;
    scoreElement.textContent = score;
    mode = MODES.BOUNCE;
}

function gameOver() {
    mode = MODES.GAME_OVER;
    canvas.style.backgroundColor = "rgba(175, 0, 0, 0.9)";
    context.font = "bold 20px arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}

function getLastBox() {
    return boxes[boxes.length - 1];
}

function handleControllers() {
    if (mode === MODES.GAME_OVER) {
        startNewGame();
        return;
    }

    if (mode === MODES.BOUNCE) {
        mode = MODES.FALL;
    }
}

window.addEventListener("click", () => {
    handleControllers();
});

window.addEventListener("keyup", (event) => {
    if (event.code === "Space") handleControllers();
});

startNewGame();

let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");
let mainBox = document.getElementById("mainBox");

let clickCount = 0;

const noTexts = [
    "真的嘛",
    "只有一点点qwq",
    "宝宝多点几下嘛",
    "多一点点好不好",
    "呜呜呜",
];

const { Engine, Render, World, Bodies } = Matter;

const engine = Engine.create();
const world = engine.world;

const container = document.getElementById("game-container");
const containerWidth = window.innerWidth;
const containerHeight = window.innerHeight;

const render = Render.create({
    element: container,
    engine: engine,
    options: {
        width: containerWidth,
        height: containerHeight,
        background: "transparent",
        wireframes: false
    }
});

const ground = Bodies.rectangle(containerWidth / 2, containerHeight - 10, containerWidth, 20, {
    isStatic: true,
    restitution: 0.8,
    friction: 0.5,
    render: { fillStyle: "transparent" }
});

World.add(world, ground);

const heartImages = [
    "./assets/heart/heart-1.png",
    "./assets/heart/heart-2.png",
    "./assets/heart/heart-3.png",
    "./assets/heart/heart-4.png",
    "./assets/heart/heart-5.png",
    "./assets/heart/heart-6.png",
    "./assets/heart/heart-7.png",
    "./assets/heart/heart-8.png",
    "./assets/heart/heart-9.png",
    "./assets/heart/heart-10.png",
    "./assets/heart/heart-11.png"
];

function dropHeart() {
    createHeart(heartImages[0]);
}

function dropRandomHeart() {
    const randomImage = heartImages[Math.floor(Math.random() * heartImages.length)];
    createHeart(randomImage);
}

function createHeart(imageSrc) {
    const xPosition = Math.random() * (containerWidth - 50) + 25;

    const heart = Bodies.rectangle(xPosition, 50, 25, 25, {
        restitution: 0.9,
        friction: 0.4,
        density: 0.002,
        frictionAir: 0.02,
        render: {
            sprite: {
                texture: imageSrc,
                xScale: 0.1,
                yScale: 0.1
            }
        }
    });

    World.add(world, heart);
}

Engine.run(engine);
Render.run(render);

let dropInterval = null;

function startDroppingHearts() {
    if (dropInterval) {
        return;
    }
    let randomTime = 500;
    let randomNumber = 3;

    dropInterval = setInterval(() => {
        randomTime = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
        randomNumber = Math.floor(Math.random() * 5) + 1;
        for (let i = 0; i < randomNumber; i++) {
            dropRandomHeart();
        }
    }, randomTime);
}

function stopDroppingHearts() {
    if (dropInterval) {
        clearInterval(dropInterval);
        dropInterval = null;
    }
}

noButton.addEventListener("click", function () {
    clickCount++;

    let yesSize = 1 + clickCount * 1.2;
    yesButton.style.transform = `scale(${yesSize})`;

    let noOffset = clickCount * 100;
    noButton.style.transform = `translateX(${noOffset}px)`;

    let moveUp = clickCount * 25;
    mainImage.style.transform = `translateY(-${moveUp}px)`;
    questionText.style.transform = `translateY(-${moveUp}px)`;

    if (clickCount <= 5) {
        noButton.innerText = noTexts[clickCount - 1];
    }

    if (clickCount === 1) {
        mainImage.src = "./assets/images/shocked.png";
    }
    if (clickCount === 2) {
        mainImage.src = "./assets/images/think.png";
    }
    if (clickCount === 3) {
        mainImage.src = "./assets/images/angry.png";
    }
    if (clickCount === 4) {
        mainImage.src = "./assets/images/crying.png";
    }
    if (clickCount >= 5) {
        mainImage.src = "./assets/images/crying.png";
    }

    dropHeart();
});

const loveTest = `!!!宝宝最好了!! ( >᎑<)♡︎ᐝ`;

yesButton.addEventListener("click", function () {
    mainBox.innerHTML = `
        <div class="yes-screen">
                <h1 class="yes-text"></h1>
                <img src="./assets/images/hug.png" alt="拥抱" class="yes-image">
        </div>
    `;
    document.body.style.backgroundColor = "#ffdae0";

    document.querySelector(".yes-text").innerText = loveTest;
    document.body.style.overflow = "hidden";

    startDroppingHearts();
});

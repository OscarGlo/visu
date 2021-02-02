let canvas, ctx;

function fit() {
    [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];
}

window.addEventListener("load", () => {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    fit();
    window.addEventListener("resize", () => {
        fit(); draw();
    });

    setInterval(() => {
        update();
        draw();
    }, 15);
});

let hue = 0, bgColor;

function draw() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function update() {
    hue = (hue + 0.1) % 360;
    bgColor = `hsl(${hue}, 50%, 10%)`;
}
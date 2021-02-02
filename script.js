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

let hue = Math.random() * 360, bgColor;
let offset = Math.random() * Math.PI;

function draw() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawSpiral(offset);
}

function drawSpiral(o) {
    let x = canvas.width / 2;
    for (let y = 0; y < canvas.height; y += 3) {
        let a = y / 40 + o;
        let xx = Math.sin(a) * 80;
        let z = Math.cos(a) * 40;
        ctx.fillStyle = `hsla(${(hue - 180) % 360}, 50%, 50%, ${(50 + z) / 100}`;
        ctx.beginPath();
        ctx.arc(x + xx, y, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = `hsla(${(hue - 180) % 360}, 50%, 50%, ${(50 - z) / 100}`;
        ctx.beginPath();
        ctx.arc(x - xx, y, 6, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function update() {
    hue = (hue + 0.1) % 360;
    bgColor = `hsl(${hue}, 50%, 10%)`;
    offset += 0.02;
}
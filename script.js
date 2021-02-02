let canvas, controls, ctx;

function fit() {
    [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];
}

window.addEventListener("load", () => {
    canvas = document.querySelector("canvas");
    controls = document.getElementById("controls");
    ctx = canvas.getContext("2d");

    fit();
    window.addEventListener("resize", () => {
        fit(); draw();
    });

    setInterval(() => {
        update();
        draw();
    }, 15);

    window.addEventListener("keydown", evt => {
        if (evt.code === "KeyC") {
            if (controls.style.display === "block") {
                controls.style.display = "none";
                document.body.style.cursor = "none";
            } else {
                controls.style.display = "block";
                document.body.style.cursor = "default";
            }
        }
    });
});

let hue = Math.random() * 360, bgColor;
let offset = Math.random() * Math.PI;

function draw() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function vi(id) {
        return parseFloat(document.getElementById(id).value);
    }

    drawHelix(offset, vi("n"), vi("d"), vi("w"), vi("f"), vi("r"));
}

function drawHelix(o, n, d, w, f, r) {
    for (let y = -r; y <= canvas.height + r; y += d)
        for (let i = 0; i < n; i++) {
            let a = y / f + o + i * 2 * Math.PI / n;
            ctx.fillStyle = `hsla(${(hue - 180) % 360}, 50%, 50%, ${(50 + Math.cos(a) * 40) / 100})`;
            ctx.beginPath();
            ctx.arc(canvas.width / 2 + Math.sin(a) * w, y, r, 0, 2 * Math.PI);
            ctx.fill();
        }
}

function update() {
    hue = (hue + 0.1) % 360;
    bgColor = `hsl(${hue}, 50%, 10%)`;
    offset -= 0.03;
}
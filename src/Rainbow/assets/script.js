let hue = 0; // 色相(Hue)の初期値

const hsl = (h, s, l) => {
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120)  { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

    r = Math.round((r + m) * 255); 
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    // 16進数に変換
    const toHex = (n) => n.toString(16).padStart(2, '0').toUpperCase();

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

setInterval(() => {
    // 背景色をhsl()を使って虹色に設定
    const colorbox = document.querySelector('.color-wrapper')
    colorbox.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;

    const hexColor = hsl(hue, 100, 50);
    document.getElementById('color-code').textContent = hexColor;

    //インクリメント
    hue += 1;
    if (hue >= 360) {
        hue = 0;
    }
}, 50);

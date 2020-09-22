export const getSVGCenter = (element, location) => {

    const { x, y, width, height } = element.getBBox()
    if (location === 'top') {
        const centerX = x + (width / 2)
        const centerY = y / 2
        element.style.transformOrigin = `${centerX}px ${centerY}px`
    } else if (location === 'bottom') {
        const centerX = x + (width / 2)
        const centerY = y + height
        element.style.transformOrigin = `${centerX}px ${centerY}px`
        return { X: centerX, Y: centerY }
        // center
    } else {
        const centerX = x + (width / 2)
        const centerY = y + (height / 2)
        element.style.transformOrigin = `${centerX}px ${centerY}px`
    }
}

export const random = (min, max) => Math.random() * (max - min) + min;

// ** Ease Functions **

// Ease in and out
export const inOutQuart = n => {
    n *= 2;
    if (n < 1) return 0.5 * n * n * n * n;
    return -0.5 * ((n -= 2) * n * n * n - 2);
};

// Ease in fast 
export const outExpo = (n => 1 == n ? n : 1 - Math.pow(2, -10 * n));

// Bounce out and come back
export const outBack = n => {
    let s = 1.70158;
    return --n * n * ((s + 1) * n + s) + 1;
};

export const inBack = n => {
    let s = 1.70158;
    return n * n * ((s + 1) * n - s);
};

export const inOutBack = n => {
    let s = 1.70158 * 1.525;
    if ((n *= 2) < 1) return 0.5 * (n * n * ((s + 1) * n - s));
    return 0.5 * ((n -= 2) * n * ((s + 1) * n + s) + 2);
};

export const inOutQuint = n => {
    n *= 2;
    if (n < 1) return 0.5 * n * n * n * n * n;
    return 0.5 * ((n -= 2) * n * n * n * n + 2);
};

// Ease in and out
const inOutExpo = n => {
    if (0 == n) return 0;
    if (1 == n) return 1;
    if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
    return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
};

const inSine = n => {
    return 1 - Math.cos(n * Math.PI / 2 );
};




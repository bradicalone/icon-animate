export const getSVGCenter = (element) => {
    const {x, y, width, height} = element.getBBox()
    const centerX = x + (width / 2)
    const centerY = y + (height / 2)
    
    element.style.transformOrigin = `${centerX}px ${centerY}px`
    // return {X: centerX, Y: centerY}
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
export const outExpo = ( n => 1 == n ? n : 1 - Math.pow(2, -10 * n) );

// Bounce out and come back
export const outBack = (n) => {
    let s = 1.70158;
    return --n * n * ((s + 1) * n + s) + 1;
};




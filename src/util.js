// Gets svg top middle or bottom center
export const getSVGCenter = (element, location) => {
    const { x, y, width, height } = element.getBBox()

    if (location === 'top') {
        const centerX = x + (width / 2)
        const centerY = y 
        element.style.transformOrigin = `${centerX}px ${centerY}px`
        return { X: centerX, Y: y }
    } else if (location === 'bottom') {
        const centerX = x + (width / 2)
        const centerY = y + height
        element.style.transformOrigin = `${centerX}px ${centerY}px`
        return { X: centerX, Y: centerY }
    } else if(location === 'topLeft') {
        element.style.transformOrigin = `${x}px ${y}px`
        return { X: x, Y: y }
    } else if(location === 'topRight') {
        const centerX = x + width
        const centerY = y
        element.style.transformOrigin = `${centerX}px ${centerY}px`
        return { X: centerX, Y: centerY }
    // center
    } else {
        const centerX = x + (width / 2)
        const centerY = y + (height / 2)
        element.style.transformOrigin = `${centerX}px ${centerY}px`
        return { X: centerX, Y: centerY }
    }
}

export const wave = (progress) => Math.sin(progress * (Math.PI * 3) ).toFixed(4)

// Gets svg path length
export const getSvgEementLength = el => {
    const getSvgPolylineLength = el => {
        let totalLength = 0;
        let prevPos;
        for (var i = 0 ; i < el.points.numberOfItems;i++) {
            var pos = el.points.getItem(i);
            if (i > 0) {
                
                totalLength += Math.sqrt(Math.pow((pos.x - prevPos.x), 2) + Math.pow((pos.y - prevPos.y), 2));
            }
            prevPos = pos;
        }
        return totalLength;
    }

    const constructor = el.constructor
   
    switch (constructor) {
        case SVGPolylineElement: 
            return getSvgPolylineLength(el);
        case SVGLineElement: 
            return ((x1, x2, y1, y2) => Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 ))(el.getAttribute('x1'), el.getAttribute('x2'),
                                    el.getAttribute('y1'), el.getAttribute('y2'));
        case SVGRectElement: 
            return (el.getAttribute('width')*2) + (el.getAttribute('height')*2);
        case SVGPathElement: 
            return el.getTotalLength();
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

export const inQuart = (n => n * n * n * n);

export const inOutBack = n => {
    let s = 1.70158 * 1.525;
    if ((n *= 2) < 1) return 0.5 * (n * n * ((s + 1) * n - s));
    return 0.5 * ((n -= 2) * n * ((s + 1) * n + s) + 2);
};

export const inOutBackMedium = n => {
    let s = 2.10158 * 1.825;
    if ((n *= 2) < 1) return 0.5 * (n * n * ((s + 1) * n - s));
    return 0.5 * ((n -= 2) * n * ((s + 1) * n + s) + 2);
};

export const inOutBackBig = n => {
    let s = 2.90158 * 2.625;
    if ((n *= 2) < 1) return 0.5 * (n * n * ((s + 1) * n - s));
    return 0.5 * ((n -= 2) * n * ((s + 1) * n + s) + 2);
};

export const inOutQuad = n => {
    n *= 2;
    if (n < 1) return 0.5 * n * n;
    return - 0.5 * (--n * (n - 2) - 1);
};

// Ease out slow ** MOST USED **
export const outQuad = n => {
    return n * (2 - n);
};

export const inOutQuint = n => {
    n *= 2;
    if (n < 1) return 0.5 * n * n * n * n * n;
    return 0.5 * ((n -= 2) * n * n * n * n + 2);
};

// Ease in and out
export const inOutExpo = n => {
    if (0 == n) return 0;
    if (1 == n) return 1;
    if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
    return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
};

export const inSine = n => 1 - Math.cos(n * Math.PI / 2 );

export const inQuint = n => n * n * n * n * n

export const outCube = n => --n * n * n + 1;

export const inCirc = (n) => {
    return 1 - Math.sqrt(1 - n * n);
};


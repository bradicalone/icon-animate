// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { getSVGCenter, random } from '../util'
import './style.css'


const Rocket = (props) => {
    const requestRef = useRef();
    const start = useRef()
    const starContainer = useRef()
    const burner = useRef()
    const rocket = useRef()
    const star = useRef()

    const totalDuration = 5000
    const data = {
        delay: 5000,
        total: 40,
    }

    let starArr = []
    const from = { x: 1, y: 1 };
    const to = {};
    const delta = {};
    const keys = Object.keys(from);

    const next = () => {
        Object.assign(from, to);
        keys.forEach(axis => {
            to[axis] = random(.8, 1);
            delta[axis] = from[axis] - to[axis];
        });
    };

    const startBurner = timestamp => {
        if (data.varying > data.total || !to.x) next(timestamp);

        data.varying = (timestamp - start.current)
        const progress = Math.min(data.varying / data.total, .5)
        const [x, y] = keys.map(axis => from[axis] - progress * delta[axis]);
        burner.current.style.transform = `scale(${x}, ${y})`;
    }

    const createStar = starCount => {
        const [size] = /[1-9]\d*/.exec(rocket.current.getAttribute("viewBox"));

        for(let i = 0; i < starCount; i++) {
            let clonedStar = star.current.cloneNode(true)   
            clonedStar.setAttribute("cx", random(40,510))
            clonedStar.setAttribute("r", random(2, 8));
 
            starArr.push({
                circle: clonedStar,
                dist: size,
                delay: Math.round(random(0,100)),
                x: random(10,500),
                start: 0,
                speed: random(500, 2500),
            })
            starContainer.current.appendChild(clonedStar)
        }
    }

    const fallingStars = timestamp => {
        let length = starArr.length
        for(let i = 0; i < length; i++) {
            let star = starArr[i]
 
            if(star.delay-- <= 0) {
                if(!star.start) star.start = timestamp
                const progress = (timestamp - star.start) / star.speed
                const opacity = progress * 2;

                star.current = progress * star.dist
                star.circle.style.opacity = progress < .5 ? opacity : 2 - opacity
                star.circle.style.transform = `translateY(${star.current}px)`
                
            }
            if(star.current >= starArr[i].dist){
                starArr[i].start = 0
                starArr[i].delay = 0
                starArr[i].delay = Math.round(random(0,100))
            } 
        }
    }

    const animate = timestamp => {
        if (!start.current) start.current = timestamp
        const totalTime = Math.min((timestamp - start.current) / totalDuration , 1)

        startBurner(timestamp)
        fallingStars(timestamp)

        if (totalTime < 1) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            reset()
        }
    }

    const reset = () => {
        start.current = 0
        starArr.forEach((star ) => star.circle.parentNode.removeChild(star.circle))
        starArr.length = 0
        createStar(15)
        setTimeout(()=> requestRef.current = requestAnimationFrame(animate), data.delay)
    }


    useEffect(() => {
        createStar(15)
        getSVGCenter(burner.current)
        requestRef.current = requestAnimationFrame(animate);
        return () => rcancelAnimationFrame(requestRef.current)
    }, [])


    return (
        <div className="container">
            <svg ref={rocket} width="20rem" height="20rem" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 550 550" xmlSpace="preserve">
                    <g ref={starContainer}>
                    <circle ref={star} r="2" cx="-1" cy="-8" fill="#0081E2" />
                </g>
                <style type="text/css">{
                    ".rocket-st1{fill:url(#ROCKET_SVGID_1_);}"
                }</style>
                <path d="M394.3,258.3c-0.3,6.6-0.9,13.2-1.6,19.8c-3.6,32.3-12,63.9-25,94.3c-1.5,3.6-3,7.2-4.6,10.7l-0.3,0.7l67.1,20.1v-92.6
                L394.3,258.3z"/>
                <path d="M182.8,372.4c-13-30.4-21.4-62-25-94.3c-0.7-6.6-1.3-13.2-1.6-19.8l-35.5,53v92.6l67.1-20.1l-0.3-0.7
                C185.8,379.5,184.4,375.9,182.8,372.4z"/>
                <path id="top" d="M263.2,10.8c-11.2,11.3-31.8,34.6-50.7,69c41.5-6.9,84.1-6.9,125.6,0c-18.9-34.4-39.5-57.7-50.7-69
	            c-3.2-3.2-7.6-5.1-12.1-5.1h0C270.7,5.8,266.4,7.6,263.2,10.8z"/>
                <path d="M275.3,178.2c-20,0-36.2,16.2-36.2,36.2s16.2,36.2,36.2,36.2c19.9,0,36.2-16.2,36.2-36.2S295.2,178.2,275.3,178.2z" />
                <path d="M347.2,103.4c-1.1-2.4-2.3-4.6-3.4-6.9c-45.2-8.5-91.8-8.5-137,0c-1.1,2.3-2.3,4.5-3.4,6.9c-20.4,43.3-30.8,89.4-30.8,137.2
                c0,47.8,10.4,94.4,30.8,138.3l1.1,2.4l2.6,0.7c22.2,5.6,45.2,8.4,68.1,8.4c0,0,0,0,0,0c23,0,45.9-2.8,68.2-8.4l2.6-0.7l1.1-2.4
                C367.6,335,378,288.5,378,240.6C378,192.8,367.6,146.6,347.2,103.4z M275.3,271.7c-31.7,0-57.4-25.8-57.4-57.4s25.7-57.4,57.4-57.4
                s57.4,25.7,57.4,57.4S306.9,271.7,275.3,271.7z"/>
                <linearGradient id="ROCKET_SVGID_1_" gradientUnits="userSpaceOnUse" x1="275.2629" y1="481.6651" x2="275.2629" y2="405.3387">
                    <stop  offset="7.834914e-02" stopColor="#000000"/>
                    <stop  offset="1" stopColor="#0050E9"/>
                </linearGradient>
                <path className="rocket-st1" ref={burner}  d="M319.7,402.8c-0.6-1.2-2.1-2-3.7-1.8c-10,0.9-28.4,2.5-41.1,2.5c-12.9,0-31.2-1.4-40.8-2.3
                c-1.6-0.1-3.1,0.6-3.7,1.9c-3.7,8.2-5.8,17.9-5.8,29c0,35.2,36.8,53.4,47.4,63.6c1.2,1.2,3.4,1.1,4.6,0
                c10.2-10.2,49.4-28.4,49.4-63.9C326,420.7,323.7,410.9,319.7,402.8z"/>
            </svg>
        </div>
    )
}

export default Rocket
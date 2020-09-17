// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';

const Layers = (props) => {
    const requestRef = useRef();
    const start = useRef();
    const top = useRef()
    const middle = useRef()
    const bottom = useRef()

    const totalDuration = 5000
    const data = {
        duration: totalDuration / 5,
        delay: 5000,
        distanceCurrent: 0,
        distance: 116,
        start: 0,
        count: 0
    }
    const distance = (progress) => {
        const distance = data.start + (progress * data.distance)
        data.distanceCurrent = distance
        if(data.distanceCurrent === 116){
            data.start = 116
            data.distance = -116
        } else if (data.distanceCurrent === 0) {
            data.start = 0
            data.distance = 116
        }
        return distance
    }

    const animate = (timestamp) => {
        if(!start.current) start.current = timestamp

        const progress = Math.min( (timestamp - start.current) / data.duration, 1)
        const dist =  distance(progress)

        top.current.style.transform =  `translateY(${-dist}px)`
        bottom.current.style.transform =  `translateY(${dist}px)`

        if (progress < 1){
            requestRef.current = requestAnimationFrame(animate);
        } else {
            start.current = 0

            if (data.count++ === 2){
                data.count = -1
                setTimeout(() => requestRef.current = requestAnimationFrame(animate), data.delay)
            } else 
                requestRef.current = requestAnimationFrame(animate)       
        }
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => rcancelAnimationFrame(requestRef.current)
    }, [])


    return (
        <div className="container">
            <svg width="10rem" height="10rem" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 550 550" xmlSpace="preserve">
                <style type="text/css">{
                    ".layer-st0{fill-rule:evenodd;clip-rule:evenodd;fill:#3a3a3a;}"+
                    ".layer-st1{fill-rule:evenodd;clip-rule:evenodd;fill:#141414;}"+
                    ".layer-st2{fill-rule:evenodd;clip-rule:evenodd;}"
                }</style>
                <g>
                    <path className="layer-st0" ref={bottom} d="M73.2,226.2L9.4,260.2c-8.4,4.5-11.5,14.9-7.1,23.2c1.6,3,4.1,5.5,7.1,7.1l257.6,137.4c5,2.7,11.1,2.7,16.1,0
                    l257.6-137.4c8.4-4.5,11.5-14.9,7.1-23.2c-1.6-3-4.1-5.5-7.1-7.1l-63.9-34.1l-177.5,94.6c-15.1,8.1-33.3,8.1-48.4,0
                    C250.8,320.8,73.2,226.2,73.2,226.2z"/>
                    <path className="layer-st1" ref={middle} d="M73.2,225.8L9.4,259.8c-8.4,4.5-11.5,14.9-7.1,23.2c1.6,3,4.1,5.5,7.1,7.1l257.6,137.4c5,2.7,11.1,2.7,16.1,0
                    l257.6-137.4c8.4-4.5,11.5-14.9,7.1-23.2c-1.6-3-4.1-5.5-7.1-7.1l-63.9-34.1l-177.5,94.6c-15.1,8.1-33.3,8.1-48.4,0
                    C250.8,320.4,73.2,225.8,73.2,225.8z"/>
                    <path className="layer-st2" ref={top} d="M266.9,122.1c5-2.7,11.1-2.7,16.1,0l257.6,137.4c8.4,4.5,11.5,14.9,7.1,23.2c-1.6,3-4.1,5.5-7.1,7.1
                    L283.1,427.1c-5,2.7-11.1,2.7-16.1,0L9.4,289.8c-8.4-4.5-11.5-14.9-7.1-23.2c1.6-3,4.1-5.5,7.1-7.1L266.9,122.1z"/>
                </g>
            </svg>
        </div>
    )
}

export default Layers
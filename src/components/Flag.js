// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';

const Flag = (props) => {
    const requestRef = useRef();
    const start = useRef();
    const flag = useRef()
    const clipPath = useRef()

    const totalDuration = 15000
    const data = {
        duration: totalDuration,
        delay: 5000,
        count: 0
    }

    const moveFlag = progress => {
        const ease = progress  * flag.current.halfWidth
        flag.current.style.transform = `translate(${-ease}px)`
    }

    const animate = (timestamp) => {
        if(!start.current) start.current = timestamp

        const progress = Math.min( (timestamp - start.current) / data.duration * 4 , 1)
        moveFlag(progress)


        if (progress < 1){
            requestRef.current = requestAnimationFrame(animate);
        } else if(data.count++ < 4) {
            start.current = 0
            requestRef.current = requestAnimationFrame(animate)  
        } else {
            reset()
            setTimeout(() => requestRef.current = requestAnimationFrame(animate), data.delay)
        }
    }

    const reset = () => {
        start.current = 0
        data.count = 0
    }

    useEffect(() => {
        flag.current.halfWidth = flag.current.getBBox().width / 2
        requestRef.current = requestAnimationFrame(animate);
        return () => rcancelAnimationFrame(requestRef.current)
    }, [])


    return (
        <div className="container">
            <svg width="20rem" height="20rem" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 550 550" xmlSpace="preserve">
                <style type="text/css">{
                    ".flag-st0{fill:#FFFFFF;}"
                }</style>
                <path d="M79.6,36.1c0-16.3-13.2-29.5-29.5-29.5S20.5,19.8,20.5,36.1c0,8.4,3.5,16,9.2,21.4c-0.2,1.2-0.4,2.4-0.4,3.6
                v460.1c0,11.1,9.3,20,20.7,20c11.4,0,20.7-9,20.7-20V61.1c0-1.2-0.1-2.4-0.4-3.6C76.1,52.1,79.6,44.5,79.6,36.1z"/>
                <clipPath id="flag-clip-path">
                    <rect ref={clipPath} x="92.6" y="47.3" className="st0" width="440" height="441.6"/>
                </clipPath>
                <g clipPath="url(#flag-clip-path)">
                    <path ref={flag} d="M532.6,89.8c-146.2-74.4-293.8,74.9-440,0.5c0,97.9,0,195.7,0,293.6c146.2,74.4,293.8-74.9,440-0.5
                    c146.2,74.4,293.8-74.4,440,0c0-97.9,0-195.7,0-293.6C826.4,15.4,678.9,164.2,532.6,89.8z"/>
                </g>
            </svg>
        </div>
    )
}

export default Flag
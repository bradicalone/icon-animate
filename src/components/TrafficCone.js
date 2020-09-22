// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { inOutBack } from '../util'

const TrafficCone = (props) => {
    const requestRef = useRef();
    const coneTop = useRef()
    const coneMiddle = useRef()
    const coneBottom = useRef()
    const clipPath = useRef()

    const totalDuration = 5000
    const data = {
        duration: totalDuration,
        delay: 5000,
        items: [
                {elem: coneBottom, delay: 0, delayStart: 0, start: 0, dur: totalDuration, startDist: 0},
                {elem: coneMiddle, delay: 5, delayStart: 0, start: 0, dur: totalDuration, startDist: 0},
                {elem: coneTop, delay: 15, delayStart: 0, start: 0, dur: totalDuration, startDist: 0}
            ],
        peicesCount: 0,
        interval: 0
    }
    

    const piecesFalling = timestamp => {
        let items = data.items
        let i = data.items.length

        while(i--) {
            const elem = items[i].elem.current
            const delay = items[i].delay
            const duration = items[i].dur
            const startDist = items[i].startDist
            let start = items[i].start
 
            // This is key, through out the animation will have a step to each element stacking up and down
            if( items[i].delayStart++ > delay) {
                if(!start) items[i].start = timestamp
                const progress =  Math.min( (timestamp - items[i].start) / duration * 6, 1)

                const ease = inOutBack (progress)
                if (progress < 1) {
                    const current =  startDist + (ease * elem.dist)
                    
                    elem.style.transform = `translateY(${current}px)`
                    items[i].current = current
                } else {
                    if (data.peicesCount++ % 2 === 0) data.interval++
                    
                    items[i].start = 0
                    items[i].delayStart = 0
                    // Keeps and even delay for every rotation
                    items[i].delay = 50
                    items[i].startDist = items[i].current
                    elem.dist = -elem.dist
                }
            }
        }
    }

    const animate = (timestamp) => {
        piecesFalling(timestamp)

        if (data.peicesCount < 12){
            requestRef.current = requestAnimationFrame(animate); 
        }  else {
            reset()
            setTimeout(() => requestRef.current = requestAnimationFrame(animate), data.delay)
        }
    }

    const reset = () => {
        data.peicesCount = 0
        data.count = 0
    }

    const getAnimatedValues = () => {
        const clipPathHeight = clipPath.current.getBBox().height

        coneTop.current.dist = Math.round(clipPathHeight - coneTop.current.getBBox().y )
        coneMiddle.current.dist = Math.round(clipPathHeight - coneMiddle.current.getBBox().y)
        coneBottom.current.dist = Math.round(clipPathHeight - coneBottom.current.getBBox().y)
    }

    useEffect(() => {
        getAnimatedValues()
        requestRef.current = requestAnimationFrame(animate);
        return () => rcancelAnimationFrame(requestRef.current)
    }, [])


    return (
        <div className="container">
            <svg width="20rem" height="20rem" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 550 550" xmlSpace="preserve">
                <path d="M270.9,385.1L67.5,436.8c-16.1,4.1-16.9,26.6-1.1,31.8l203.4,67.2c3.4,1.1,7,1.1,10.4,0l203.4-67.2
                c15.7-5.2,15-27.7-1.1-31.8l-203.4-51.7C276.4,384.4,273.6,384.4,270.9,385.1z"/>
                <clipPath id="traffic-cone-clip-path">
                    <rect ref={clipPath} width="471" height="453"/>
                </clipPath>
                <g clipPath="url(#traffic-cone-clip-path)">
                    <path ref={coneBottom} d="M381.4,340.4c-60.6,17.2-156.5,16.3-213.7,0L144.3,431c-0.7,2.7,0.9,5.4,3.6,6.1c80.5,19.8,171.8,19.7,252.2,0
                    c2.7-0.7,4.3-3.4,3.6-6L381.4,340.4z"/>
                    <path ref={coneMiddle} d="M341.1,179l32.2,128.6c-25.8,6.3-60.2,10.4-98.7,10.4c-38.5,0-72.8-4.1-98.7-10.4L208.1,179
                    c20.4,2.6,42.9,4.1,66.5,4.1C298.2,183.1,320.7,181.6,341.1,179z"/>
                    <path ref={coneTop} d="M332.8,146L307.3,44c-8.5-34.1-57-34.1-65.5,0l-25.5,101.9c17.7,2.2,37.4,3.4,58.2,3.4
                    C295.4,149.3,315.1,148.1,332.8,146z"/>
                </g>
            </svg>
        </div>
    )
}

export default TrafficCone
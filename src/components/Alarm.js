// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { getSVGCenter } from '../util'


const Alarm = (props) => {
    const requestRef = useRef();
    const startHands = useRef();
    const startRingers = useRef();
    const rightRing = useRef()
    const leftRing = useRef()
    const hour = useRef()
    const minute = useRef()
    // setCount(prevCount => (prevCount + deltaTime * 0.01) % 100);
    const resetValues = () => {
        startHands.current = 0
        startRingers.current = 0
    }
    const totalDuration = 5000
    const data = {
        delay: 5000,
        ringDuration: 3000 / 26,
        degreeStart: -5,
        degreeTotal: 15,
        degreeCurrent: 0,
        minCurrent: 0,
        minStart: 0,
        minDegreeTotal: 720 / 12
    }

    const getRingerDegree = (ringProgress, progress) => {
        if(progress === 1) return 0
        let degree = data.degreeStart + (ringProgress * data.degreeTotal)
        data.degreeCurrent = degree
        if(data.degreeCurrent === 5) {
            data.degreeStart = 5
            data.degreeTotal = -10
        } else if (data.degreeCurrent === -5) {
            data.degreeStart = -5
            data.degreeTotal = 10
        }
        return degree
    }

    const getMinuteDegree = (progress) => {
        data.minCurrent = data.minStart + progress * data.minDegreeTotal
        if(progress === 1) data.minStart = data.minCurrent
        return data.minCurrent
    }

    const animate = (timestamp) => {
        if(!startHands.current) startHands.current = timestamp
        if(!startRingers.current) startRingers.current = timestamp
        const progress = Math.min( (timestamp - startHands.current) / totalDuration, 1)
        const ringProgress = Math.min( (timestamp - startRingers.current) / data.ringDuration, 1)

        const minuteDegree = getMinuteDegree(progress)
        const ringerDegree = getRingerDegree(ringProgress, progress)

        hour.current.style.transform = `rotate(${progress * 720}deg)`
        hour.current.style.transformOrigin = '280px 308.5px'

        minute.current.style.transform = `rotate(${minuteDegree}deg)`
        minute.current.style.transformOrigin = '280px 308.5px'

        rightRing.current.style.transform = `rotate(${ringerDegree}deg)`
        leftRing.current.style.transform = `rotate(${ringerDegree}deg)`



        if (progress < 1){
            if(ringProgress === 1){
                // Starts ringers over again
                startRingers.current = 0
            } 
            requestRef.current = requestAnimationFrame(animate);
        } else {
            resetValues()
            setTimeout(() => requestRef.current = requestAnimationFrame(animate), data.delay)
        }
    }

    useEffect(() => {
        getSVGCenter(rightRing.current)
        getSVGCenter(leftRing.current)

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [])


    return (
        <div className="container">
            <svg width="10rem" height="10rem" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 551.1 551.2" xmlSpace="preserve">
                <style type="text/css">{
                    ".st0{fill:#176096;}"+
                    ".st2{stroke:#000000;stroke-width:34;stroke-linecap:round;stroke-miterlimit:10;}"
                }</style>
                <path ref={leftRing} className="left-ring" d="M150.2, 64.6 C 99.2, 91, 57.6, 132.9, 31.6, 184.1 c -4.9 -3.4 -9.4 -7.4 -13.5 -12
                c-28.4-32.5-22.7-84, 12.7 -115 c 35.4-31, 87.2 -29.7, 115.6, 2.8C147.8,61.4,149,63,150.2,64.6z"/>
                <path ref={rightRing} className="right-ring" d="M533,172.1 c-3.9,4.5-8.2,8.3-12.9,11.6c-26.1-51.2-67.9-93.1-119-119.4c1.1-1.5,2.3-3,3.5-4.4
                c28.4-32.5,80.2-33.7,115.6-2.8C555.8,88.1,561.5,139.6,533,172.1z"/>
                <path className="body" d="M421.8,497.5c56.7-43.7,93.2-112.3,93.2-189.4c0-120.2-88.8-219.7-204.3-236.5V33.8h16.8
                c9.3,0,16.9-7.6,16.9-16.9v0c0-9.3-7.6-16.9-16.9-16.9H224.6c-9.3,0-16.9,7.6-16.9,16.9v0c0,9.3,7.6,16.9,16.9,16.9h16.8v37.8
                C125.7,88.4,37,187.8,37,308.1c0,77.5,36.9,146.4,94.1,190.1L106.2,523c-6.4,6.4-6.4,16.9,0,23.3c3.2,3.2,7.5,4.8,11.7,4.8
                c4.2,0,8.4-1.6,11.7-4.8l29.7-29.7c34.5,19.4,74.4,30.4,116.8,30.4c42.8,0,83-11.2,117.7-31l30.2,30.2c3.2,3.2,7.4,4.8,11.7,4.8
                c4.2,0,8.4-1.6,11.7-4.8c6.4-6.5,6.4-16.9,0-23.3L421.8,497.5z M386.3,485.4c-4.8,3-9.8,5.8-14.9,8.5c-28.6,14.7-61.1,23-95.5,23
                c-34,0-66.1-8.1-94.5-22.5c-5.1-2.6-10.1-5.4-14.9-8.4c-4.8-2.9-9.4-6.1-13.9-9.4c-51.8-38-85.5-99.3-85.5-168.5
                c0-115.3,93.5-208.8,208.8-208.8s208.8,93.5,208.8,208.8c0,68.8-33.3,129.8-84.6,167.8C395.7,479.3,391.1,482.4,386.3,485.4z"/>
                <g id="hands">
                    <line ref={hour} className="st2" x1="280" y1="308.5" x2="280" y2="198.3"/>
                    <line ref={minute} className="st2" x1="280" y1="308.5" x2="224.8" y2="403.8"/>
                </g>
            </svg>
        </div>
    )
}

export default Alarm
// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { getSvgEementLength, outQuad} from '../util'


const FingerPrint = (props) => {
    const start = useRef();
    const requestRef = useRef();
    const printPath = useRef([])

    const totalDuration = 5000
    const data = {
        delay: 5000,
        values: []
    }

    const runFingerPrint = (timestamp) => {
        const items = data.values
        let i = items.length

        while(i--) {
            const pathVal = items[i]
            const path = items[i].el
            const startPos = items[i].startPos
            const dashLength = items[i].dashArrayLength
            const start = items[i].start
            const duration = items[i].dur

            if(!start) items[i].start = timestamp
            const progress = Math.min((timestamp - items[i].start) / duration, 1)
            const ease =  outQuad(progress)
            
            if(ease < 1 ) {
                // Value and gets current location to be used later
                items[i].current = startPos + (pathVal.length * ease)
                path.style.strokeDasharray = dashLength
                path.style.strokeDashoffset = items[i].current
            } else {
                items[i].start = 0
                items[i].length = pathVal.length * -1
                items[i].startPos = items[i].current 
            }
        }
    }

    const animate = (timestamp) => {
        if (!start.current) start.current = timestamp
        const progress = Math.min((timestamp - start.current) / totalDuration, 1)

        runFingerPrint(timestamp)

        if (progress < 1 ){
            requestRef.current = requestAnimationFrame(animate);
        } else {
            reset()
            setTimeout(() => requestRef.current = requestAnimationFrame(animate), data.delay)
        }
    } 

    const reset = () => {
        data.values = []
        start.current = 0
        // Add new values to the array to be ran again
        startValues()
    }

    const startValues = () => {
        let el = printPath.current = document.querySelectorAll('.thumb-print-st0')
        let i = el.length
        data.count = i
        while(i--){
            // Fix for SVG.getTotalLength()  not working on some paths. 
            let length = getSvgEementLength(el[i])
            
            data.values.unshift({
                length: i % 2 === 0 ? -length : length,
                dashArrayLength: length, 
                el: el[i],
                delayStart: 0,
                dur: totalDuration / 4,
                start: 0,
                startPos: 0
            })
        }
    }

    useEffect(() => {
        startValues()
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [])


    return (
        <div className="container">
            <svg width='20em' height='20em' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 550 550" xmlSpace="preserve">
                    <style type="text/css">{
                        ".thumb-print-st0{fill:none;stroke:#0200FF;stroke-width:22;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}"
                    }</style>
                     <path className="thumb-print-st0" d="M123.6,72.7c41.9-31.2,93.9-49.6,150.2-49.6c139.2,0,252,112.8,252,252"/>
                    <path className="thumb-print-st0" d="M30.2,340.1c-5.5-20.7-8.5-42.5-8.5-65c0-70.8,29.2-134.7,76.1-180.5"/>
                    <path className="thumb-print-st0" d="M52,408.9c57.7-64.1,31.2-89.8,33.9-139.3"/>
                    <path className="thumb-print-st0" d="M89.7,238.5C89.7,162.8,205,65.3,304.9,90"/>
                    <path className="thumb-print-st0" d="M335.2,97.2C470.5,151.6,493.7,300.8,451.5,463"/>
                    <path className="thumb-print-st0" d="M404.2,384.2c-9.8,59.8-31.5,114.3-40.7,131.9"/>
                    <path className="thumb-print-st0" d="M89.7,459.3c65-50.4,68.7-120.1,58.6-184.2c-9.2-57.7,58.6-126,132-126c82.5,0,136.5,80.2,128.3,199.3"/>
                    <path className="thumb-print-st0" d="M214.2,290.7c-9.2-35.7,13.8-77,60.2-77c33.2,0,69.8,22.9,69.8,111.8S301.3,504.2,282,530.8"/>
                    <path className="thumb-print-st0" d="M144.6,497.8C184.4,451,219.1,422,216,327.3"/>
                    <path className="thumb-print-st0" d="M274.5,275.1c26.8,109.1-34.6,208.9-67.6,249.3"/>
                </svg>
        </div>
    )
}

export default FingerPrint
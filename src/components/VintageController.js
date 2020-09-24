// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { getSVGCenter, inBack} from '../util'


const VintageController = (props) => {
    const start = useRef();
    const requestRef = useRef();
    const joyStick = useRef()
    const joyStickShaft = useRef()
    const joyStickBall = useRef()
    const controllerButton = useRef()
    const bottomSeperator = useRef()
    
    const totalDuration = 5000
    const data = {
        duration: [totalDuration / 4, (totalDuration - (totalDuration /  4)) / 2, (totalDuration - (totalDuration /  4)) / 2],
        delay: 5000,
        currentScale: 1,
        currentRotate: 30,
        count: 0
    }

    const roateController = progress => {
        const ease = progress
        let rotation = Math.sin(ease * (Math.PI )) * data.currentRotate
        let sin = 1 - Math.sin(ease * (Math.PI )) * .1
        data.currentScale = sin
        joyStick.current.style.transform = `rotate(${rotation}deg) scale(${sin})`
    }

    const showPieces = (progress) => {
        const ease = inBack(progress)
        const prog = Math.sin(ease * Math.PI )
        joyStickShaft.current.style.transform = `translateY(${prog * 130}px)`
        joyStickBall.current.style.transform = `translateY(${prog * 130}px)`
        controllerButton.current.style.transform = `translateY(${prog * 50}px)`
        bottomSeperator.current.style.transform = `translateY(${prog * -60}px)`
    }

    const animate = (timestamp) => {
        if (!start.current) start.current = timestamp
        const progress = Math.min((timestamp - start.current) / data.duration[data.count], 1)

        data.count === 0 && showPieces(progress)
        data.count > 0 && roateController(progress)

        if (progress < 1 ){
            requestRef.current = requestAnimationFrame(animate);
        } 
        else if(data.count++ < 4) {
            start.current = 0
            data.currentRotate = data.currentRotate * -1
            requestRef.current = requestAnimationFrame(animate);
        } 
        else {
            reset()
            setTimeout(() => requestRef.current = requestAnimationFrame(animate), data.delay)
        }
    }

    const reset = () => {
        data.currentRotate = data.currentRotate * -1
        start.current = 0
        data.count = 0
    }

    useEffect(() => {
        getSVGCenter(joyStick.current, 'bottom')
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [])


    return (
        <div className="container">
            <svg width="20em" height="20em" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 550 550" xmlSpace="preserve">
                <style type="text/css">{
                    // FF5651 nice red
                    ".vintage-controller-st0{fill:#000000;}"+
                    ".vintage-controller-st3{fill:#FFFFFF;}"+
                    ".vintage-controller-st4{fill:#FF4E51;}"
                }</style>
                <path id="controller-top" className="vintage-controller-st0" d="M524.9,284.4l-178-81.6C301.4,181.9,249,182,203.5,203L25.2,285.3c-9.8,4.5-14.9,13.6-15.2,22.8
                c0,0.3,0,0.7,0,1c0,4.9,1.4,9.6,4,13.6c2.5,4,6.2,7.2,10.6,9.3l173.6,80.3c48.6,22.3,104.6,22.2,153.3-0.3L525,331.6
                c9.2-4.2,15-13.4,15-23.5v0C540,298.5,535,289,524.9,284.4z M114.6,330.5c-20.4,0-37-11-37-24.7c0-13.6,16.6-24.7,37-24.7
                c20.4,0,37,11,37,24.7C151.6,319.5,135.1,330.5,114.6,330.5z"/>
                <path ref={bottomSeperator} className="vintage-controller-st0" d="M351.4,444.5c-48.7,22.5-104.7,22.6-153.3,0.3l-175-80.9C17,361,10,365.5,10,372.3v18.8
                h0c-0.4,9.8,4.6,19.8,15.1,24.6l173.1,79.5c48.6,22.3,104.6,22.2,153.3-0.3l173.4-80.2c10.1-4.7,15.2-14.2,15.2-23.7v-19.3
                c0-6.8-7-11.3-13.2-8.4L351.4,444.5z"/>
                <clipPath id="button-controller-clipPath">
                    <path id="button-clip-path" className="st4" d="M152,230.9H77.6V306c0,0,0-0.1,0-0.1c0,13.6,16.6,24.7,37,24.7c20.4,0,37-11,37-24.7c0,0,0,0.1,0,0.1L152,230.9
                    z"/>
                </clipPath>
                <g clipPath="url(#button-controller-clipPath)">
                    <g ref={controllerButton}>
                        <ellipse id="button-top" className="vintage-controller-st4" cx="114.6" cy="295.2" rx="37" ry="24.7"/>
                        {/* Optional */}
                        {/* <path id="button-side" d="M114.8,317.9c-20.4,0-37-11-37-24.7v60.5h74v-60.5C151.8,306.8,135.2,317.9,114.8,317.9z"/> */}
                    </g>
                </g>
                <ellipse id="joy-stick-ring" className="vintage-controller-st4" cx="275" cy="316.4" rx="62.9" ry="38.3"/>
                <clipPath id="shaft-controller-clipPath">
                    <path className="vintage-controller-st3" d="M301.4,99.7l0,204.3c0,5.2-3.1,9.9-7.8,12.1c-5.4,2.5-11.7,3.9-18.6,3.9
                    s-13.2-1.4-18.6-3.9c-4.7-2.2-7.8-6.9-7.8-12.1l0-204.3c0-1.8,1.4-3.2,3.2-3.2h46.3C299.9,96.5,301.4,98,301.4,99.7z"/>
                </clipPath>
                <g ref={joyStick}>
                    <g clipPath="url(#shaft-controller-clipPath)">
                        <path ref={joyStickShaft} className="vintage-controller-st3" d="M301.4,99.7l0,204.3c0,5.2-3.1,9.9-7.8,12.1c-5.4,2.5-11.7,3.9-18.6,3.9
                        s-13.2-1.4-18.6-3.9c-4.7-2.2-7.8-6.9-7.8-12.1l0-204.3c0-1.8,1.4-3.2,3.2-3.2h46.3C299.9,96.5,301.4,98,301.4,99.7z"/>
                    </g>
                    <circle ref={joyStickBall} className="vintage-controller-st0" cx="275" cy="100.1" r="71.8"/>
                </g>
            </svg>
        </div>
    )
}

export default VintageController
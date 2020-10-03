// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { getSVGCenter, outExpo, inOutQuart } from '../util'

const Camera = (props) => {
    const requestRef = useRef();
    const start = useRef();
    const flash = useRef();
    const focus = useRef();
    const rotateRing = useRef()
    const totalDuration = 5000

    const data = {
        duration: totalDuration / 5,
        delay: 5000,
        focusValues: [.9, -.7, .4, -.7],
        rotateValues: [290, -270, 240, -270],
        index: 0,
        currentFocus: 1,
        currentRotate: 0
    }

    const focusRingFlash = progress => {
        if(data.index <= 3) {
            const ease = outExpo(progress)
            const FocusInOut = data.currentFocus - (ease * data.focusValues[data.index])
            const Rotate = data.currentRotate - (ease * data.rotateValues[data.index])

            focus.current.style.transform = `scale(${FocusInOut})`
            rotateRing.current.style.transform = `rotate(${Rotate}deg)`

            return {FocusInOut, Rotate}
        } else if (data.index === 4) {
            const ease = inOutQuart(progress)
            const Flash = Math.sin(ease * Math.PI ) * 200
            flash.current.style.transform = `scale(${Flash})`
            flash.current.style.opacity = 1 - (ease * .7)
        }
    }

    const animate = (timestamp) => {
        if(!start.current) start.current = timestamp
        const progress = Math.min( (timestamp - start.current) / data.duration, 1)

        const current = focusRingFlash(progress)

        if (progress < 1){
            requestRef.current = requestAnimationFrame(animate);
        } else if (data.index++ <= 4) {
            start.current = 0
            current && (data.currentFocus = current.FocusInOut)
            current && (data.currentRotate = current.Rotate )
            requestRef.current = requestAnimationFrame(animate);
        } else {
            reset()
            setTimeout(() => requestRef.current = requestAnimationFrame(animate), data.delay)
        }
    }

    const reset = () => {
        start.current = 0
        data.currentFocus = 1
        data.currentRotate = 0
        data.index = 0
    }

    useEffect(() => {
        getSVGCenter(focus.current)
        getSVGCenter(flash.current)
        getSVGCenter(rotateRing.current)
 
        requestRef.current = requestAnimationFrame(animate);
        return () => rcancelAnimationFrame(requestRef.current)
    }, [])


    return (
        <div className="container">
           <svg width="20rem" height="20rem" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 550 550" xmlSpace="preserve">
                <style type="text/css">{
                    ".camera-st0{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#000000;stroke-width:25;stroke-miterlimit:10;}"+
                    ".camera-st1{fill-rule:evenodd;clip-rule:evenodd;}"+
                    ".camera-st2{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}"+
                    ".camera-st3{fill-rule:evenodd;clip-rule:evenodd;fill:#FFF8BB;}"
                }</style>
                <circle ref={focus} className="camera-st0" cx="327.2" cy="316.6" r="124.7"/>
                <path id="body" className="camera-st1" d="M443.8,149.1h-3.4C424.9,90.8,426.6,60,378.7,60H270.7c-39.4,0-44.5,29.1-53.1,65.1h-87.4
                c-12,0-22.3,10.3-22.3,24c-44.5,0-104.5,48-104.5,111.4v191.9c0,20.6,17.1,37.7,39.4,37.7h466c20.6,0,37.7-17.1,37.7-37.7V234.7
                C546.5,186.8,479.7,150.8,443.8,149.1z M118.2,479.7h-8.6V185.1h8.6V479.7z M324.5,94.5c0-6.6,5.4-12,12-12h50.9c6.6,0,12,5.4,12,12
                v9.1c0,6.6-5.4,12-12,12h-50.9c-6.6,0-12-5.4-12-12V94.5z M327.2,483.2c-92.5,0-166.2-73.7-166.2-166.2
                c0-90.8,73.7-164.5,166.2-164.5c90.8,0,166.2,73.6,166.2,164.5C493.4,409.5,418,483.2,327.2,483.2z"/>
                <circle className="camera-st2" cx="154.1" cy="158.9" r="18.6"/>
                <circle ref={flash}  className="camera-st3" cx="154.1" cy="158.9" r="1.2"/>
                <path ref={rotateRing} d="M463,319.6v-5h13.6c-1.1-80.6-66.3-146-146.8-147.3v14.9h-5v-14.9C244.2,168.6,179,234,177.9,314.6h15.6v5h-15.6
                c1.6,80.2,66.6,145,146.8,146.3v-16.1h5V466c80.2-1.3,145.2-66.2,146.8-146.3H463z M327.2,438c-66.9,0-121.4-54.4-121.4-121.4
                s54.4-121.4,121.4-121.4s121.4,54.4,121.4,121.4S394.2,438,327.2,438z"/>
            </svg>
        </div>
    )
}

export default Camera
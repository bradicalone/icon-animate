// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { getSVGCenter, outBack, inOutQuint} from '../util'

const ImageLayer = (props) => {
    const requestRef = useRef();
    const start = useRef();
    const photoBottom = useRef();
    const photoMiddle = useRef();
    const photoFront = useRef()
    const wave = useRef();
    const totalDuration = 5000

    const data = {
        delay: 1000,
        duration: totalDuration / 16,
        index: 0,
        currentMiddle: 0,
        currentBottom: 0,
        totalCount: 0,
        currentWave: 0
    }


    const backLayers = progress => {

        const ease = (photoBottom.current.X < 0) ? outBack(progress) : progress

        let translateMiddle = data.currentMiddle + (ease * photoMiddle.current.X)
        let translateBottom = data.currentBottom + (ease * photoBottom.current.X)

        if (data.index === 0) {
            photoMiddle.current.style.transform = `translate(${-translateMiddle}px, ${translateMiddle}px )`
        }
        if (data.index === 1) {
            photoBottom.current.style.transform = `translate(${-translateBottom}px, ${translateBottom}px )`
        }
        return { middleLayer: translateMiddle, bottomLayer: translateBottom }
    }

    const sceneLayer = progress => {
        const ease = inOutQuint(progress)
        const transformWave = data.currentWave - (ease * wave.current.thirdWidth)
        wave.current.style.transform = `translateX(${transformWave}px)`
    }

    const animate = (timestamp) => {

        if (!start.current) start.current = timestamp
        const progress = Math.min((timestamp - start.current) / data.duration, 1)

        let layers = data.totalCount <= 3 ? backLayers(progress) : sceneLayer(progress)

        if (progress < 1) {
            requestRef.current = requestAnimationFrame(animate);
        } else if (data.totalCount++ <= 2) {
            data.index++
            if (data.index === 2) {
                data.index = 0
                start.current = 0
                data.currentBottom = layers.bottomLayer
                photoBottom.current.X = -photoBottom.current.X
            }
            else if (data.index === 1) {
                start.current = 0
                data.currentMiddle = layers.middleLayer
                photoMiddle.current.X = -photoMiddle.current.X
            }
            requestRef.current = requestAnimationFrame(animate);
        } else if (data.totalCount++ <= 5) {

            start.current = 0
            data.duration = totalDuration * .75
            requestRef.current = requestAnimationFrame(animate);

        } else {
            reset()
            setTimeout(() => requestRef.current = requestAnimationFrame(animate), data.delay)
        }
    }

    const reset = () => {
        start.current = 0
        data.duration = totalDuration / 16
        data.index = 0
        data.currentBottom = 0
        data.currentMiddle = 0
        data.totalCount = 0
        data.currentWave = 0
        photoMiddle.current.X = photoMiddle.current.getBBox().x
        photoBottom.current.X = photoBottom.current.getBBox().x
    }

    useEffect(() => {
        // Animate 2/3rds of the width
        wave.current.thirdWidth = wave.current.getBBox().width * 0.66666667 - 1

        photoMiddle.current.X = photoMiddle.current.getBBox().x
        photoBottom.current.X = photoBottom.current.getBBox().x

        getSVGCenter(photoBottom.current)
        getSVGCenter(photoMiddle.current)

        requestRef.current = requestAnimationFrame(animate);
        return () => rcancelAnimationFrame(requestRef.current)
    }, [])


    return (
        <div className="container">
            <svg width="20rem" height="20rem" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 550 550" >
                <style type="text/css">{
                    ".photo-layer-st0{fill-rule:evenodd;clip-rule:evenodd;}" +
                    ".photo-layer-st1{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}"
                }</style>
                <g ref={photoBottom}>
                    <path className="photo-layer-st0" d="M173.6,399.4h308.5c32.3,0,58.4-26.1,58.4-58.4V93.3c0-32.3-26.1-58.4-58.4-58.4H173.6
                    c-32.3,0-58.4,26.1-58.4,58.4V341C115.2,373.3,141.3,399.4,173.6,399.4z"/>
                    <path className="photo-layer-st1" d="M175.6,369.6h304.5c16.3,0,29.5-13.2,29.5-29.5V94.2c0-16.3-13.2-29.5-29.5-29.5H175.6
                    c-16.3,0-29.5,13.2-29.5,29.5v245.9C146.1,356.4,159.3,369.6,175.6,369.6z"/>
                </g>
                <g ref={photoMiddle}>
                    <path className="photo-layer-st0" d="M116.8,452.3h308.5c32.3,0,58.4-26.1,58.4-58.4V146.2c0-32.3-26.1-58.4-58.4-58.4H116.8
                    c-32.3,0-58.4,26.1-58.4,58.4v247.7C58.4,426.2,84.5,452.3,116.8,452.3z"/>
                    <path className="photo-layer-st1" d="M118.7,422.5h304.5c16.3,0,29.5-13.2,29.5-29.5V147.1c0-16.3-13.2-29.5-29.5-29.5H118.7
                    c-16.3,0-29.5,13.2-29.5,29.5V393C89.2,409.3,102.4,422.5,118.7,422.5z"/>
                </g>
                <g ref={photoFront}>
                    <path className="photo-layer-st0" d="M59.9,511.1h308.5c32.3,0,58.4-26.1,58.4-58.4V205c0-32.3-26.1-58.4-58.4-58.4H59.9
                    c-32.3,0-58.4,26.1-58.4,58.4v247.7C1.5,485,27.7,511.1,59.9,511.1z"/>
                    <path className="photo-layer-st1" d="M61.9,480.3h304.5c16.3,0,29.5-13.2,29.5-29.5V204.9c0-16.3-13.2-29.5-29.5-29.5H61.9
                    c-16.3,0-29.5,13.2-29.5,29.5v245.9C32.4,467.1,45.6,480.3,61.9,480.3z"/>
                    <circle className="st0" cx="115.2" cy="246.5" r="46.1" />
                </g>
                <clipPath id="cut-off-bottom">
                    <path id="clipPath" className="photo-layer-st1" d="M54.5,486.5h319.2c16.3,0,29.5-13.2,29.5-29.5V198.8c0-16.3-13.2-29.5-29.5-29.5H54.5
                    c-16.3,0-29.5,13.2-29.5,29.5V457C25,473.3,38.2,486.5,54.5,486.5z"/>
                </clipPath>
                <g clipPath="url(#cut-off-bottom)">
                    <path ref={wave} d="M1124,304.4c-60.4,0-60.9,102.6-121.3,102.6c-60.4,0-60.4-66-120.9-66c-60.3,0-62.4,79.5-122.6,79.8
                    c-60.2-0.2-62.2-79.8-122.6-79.8c-60.4,0-60.4,66-120.9,66c-60.4,0-60.9-102.6-121.3-102.6S334,407,273.6,407
                    c-60.4,0-60.4-66-120.9-66s-61.9,79.8-122.3,79.8v81.6h364.5h364.5h365h1.1V304.4C1125.2,304.4,1124.8,304.4,1124.5,304.4z"/>
                </g>
            </svg>
        </div>
    )
}

export default ImageLayer
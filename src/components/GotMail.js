// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { getSVGCenter,  outQuad, outBack} from '../util'


const GotMail = (props) => {
    const start = useRef();
    const requestRef = useRef();
    const envelopeFlip = useRef()
    const mailPage = useRef()
    const contentLines = useRef()

    const totalDuration = 5000
    const data = {
        duration: totalDuration / 4,
        delay: 5000,
        values: [],
        count: 0
    }

    const openFlap = progress => {
        if(data.count === 4) {
            envelopeFlip.current.style.transform = `rotateX(${180 - (progress * 180)}deg)`
        } else {
            envelopeFlip.current.style.transform = `rotateX(${progress * 180}deg)`
        }
    }

    const showMail = progress => {
        const ease = outBack(progress)
        mailPage.current.style.transform = `translateY(${ease * -190}px)`
    }

    const showContentLines = timestamp => {
        const items = data.values
        let i = items.length
   
        while(i--) {
            const line = items[i].el
            const dist = items[i].dist
            const delay = items[i].delay
            const startContent = items[i].start
            const duration = items[i].dur

            if(items[i].delayStart++ >= delay) {
                if(!startContent) items[i].start = timestamp
                const progress = Math.min((timestamp - items[i].start) / duration, 1)
                const ease = outBack(progress)
                items[i].current = ease * dist
                line.style.transform = `translate(${items[i].current}px)`
                    
                if (items[2].current === dist){
                    data.count = 4
                    start.current = 0
                    // Waits.. then closes envelope flap
                    return setTimeout(() => requestRef.current = requestAnimationFrame(animate), duration)
                }
            }
        }
        requestRef.current = requestAnimationFrame(showContentLines);
    }

    const animate = (timestamp) => {
        if (!start.current) start.current = timestamp
        const progress = Math.min((timestamp - start.current) / data.duration, 1)

        if (data.count === 0 || data.count === 4) openFlap(progress)
        data.count === 1 && showMail(progress)
        data.count === 3 && showContentLines(progress)

        // 1st Envelope flap open
        if (progress < 1 ){
            requestRef.current = requestAnimationFrame(animate); 

        // 2nd Pop up mail
        } else if(++data.count === 1) {
            start.current = 0
            requestRef.current = requestAnimationFrame(animate);

        // 3rd Show content lines in mail
        } else if(++data.count === 3) {
            requestRef.current = requestAnimationFrame(showContentLines);
        } else {
            reset()
            setTimeout(() => requestRef.current = requestAnimationFrame(animate), data.delay)
        }
    } 

    const reset = () => {
        // Removes style so it can be animated again from original place
        mailPage.current.style = ''
        data.values.forEach(items => items.el.style = '' )

        start.current = 0
        data.count = 0
        data.values = []
        startValues()  
    }

    // Add new values to the array to be ran again
    const startValues = () => {
        const el = document.querySelectorAll('.mail-content-lines')
        let i = el.length

        while(i--){
            data.values.unshift({
                delay: i*25,
                el: el[i],
                dist: 150,
                delayStart: 0,
                dur: (totalDuration / 4) / 4,
                start: 0,
            })
        }
    }

    useEffect(() => {
        startValues()
        getSVGCenter(envelopeFlip.current, 'top')
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [])


    return (
        <div className="container">
            <svg width="20em" height="20em" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 550 550" xmlSpace="preserve">
                <style type="text/css">{
                    ".got-mail-st0{fill:#ffffff;}"+
                    ".got-mail-st1{fill:#ffffff;}"
                }</style>
                <path id="stay-folded" fill="#232323" d="M518.3,204.4c0.4,0,0.6,0.5,0.3,0.8L313.5,360.7c-23.6,17.9-56.3,17.9-79.9,0L28.3,205
                c-0.3-0.3-0.2-0.8,0.3-0.8L518.3,204.4z"/>
                
                <g id="mail" clipPath="url(#envelope-flip">
                    <g ref={mailPage}>
                        <path id="paper" className="got-mail-st1" d="M446.5,672.5h-348V447.2c0-20.3,16.4-36.7,36.7-36.7h274.6c20.3,0,36.7,16.4,36.7,36.7V672.5z"/>
                        <g clipPath="url(#content-lines)">
                            <path className="mail-content-lines" d="M179.5,462.5h-115c-3.3,0-6-2.7-6-6s2.7-6,6-6h115c3.3,0,6,2.7,6,6S182.8,462.5,179.5,462.5z"/>
                            <path className="mail-content-lines" d="M179.5,500.5h-115c-3.3,0-6-2.7-6-6s2.7-6,6-6h115c3.3,0,6,2.7,6,6S182.8,500.5,179.5,500.5z"/>
                            <path className="mail-content-lines" d="M179.5,536.1h-115c-3.3,0-6-2.7-6-6s2.7-6,6-6h115c3.3,0,6,2.7,6,6S182.8,536.1,179.5,536.1z"/>
                        </g>
                    </g>
                </g>
                <path id="flip" ref={envelopeFlip} d="M517.4,205.2c0.4,0,0.5,0.5,0.2,0.7L313.5,361.5c-23.6,17.9-56.3,17.9-79.9,0L29.2,205.8
                c-0.3-0.2-0.1-0.7,0.2-0.7L517.4,205.2z"/>
                <path id="body" d="M392.8,390.6c-3.1-2.3-3.7-6.7-1.3-9.8c2.3-3.1,6.7-3.7,9.8-1.3L532.5,479c5.9-8,9.4-18,9.4-28.7V246.4
                c0-8.1-2-15.8-5.7-22.7L313.3,390.8c-23.6,17.7-56.3,17.7-79.9,0L10.7,223.6C7,230.5,5,238.3,5,246.4v203.9
                c0,10.6,3.4,20.3,9.1,28.3l130.7-99.2c3.1-2.3,7.5-1.7,9.8,1.3c2.3,3.1,1.7,7.5-1.3,9.8L23.8,488.8c8.2,6.4,18.6,10.2,29.8,10.2
                h439.5c11.1,0,21.3-3.7,29.4-9.9L392.8,390.6z"/>
                <clipPath id="content-lines">
                    <rect id="clipPath-lines" x="186" y="439" className="st0" width="168" height="108"/>
                </clipPath>
                <clipPath id="envelope-flip">
                    <path id="clipPath-mail" className="got-mail-st0" d="M239.3,414.3L90.5,300.5V177.2c0-24.2,19.6-43.8,43.8-43.8h276.3
                    c24.2,0,43.8,19.6,43.8,43.8v125.3L311.6,413.9C290.3,430.5,260.6,430.6,239.3,414.3z"/>
                </clipPath>
            </svg>
        </div>
    )
}

export default GotMail
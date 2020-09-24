// @ts-nocheck
import React, { useEffect, useState } from 'react';
import SVG from '../../public/got-mail.svg'

import convert from 'convert-svg-react'


const GetSVG = (props) => {
    const [svg, setSvg] = useState('')
    useEffect(() => {
        convert(SVG).then(data => setSvg(data))    
    }, [])


    return (
        <div className="container">
            {svg && svg}
        </div>
    )
}

export default GetSVG
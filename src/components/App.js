import React, { useEffect, useRef, useState } from 'react';
import Alarm from './Alarm'
import Layers from './Layers'
import GetSVG from './GetSVG'
import Rocket from './Rocket'
import Camera from './Camera'
import ImageLayer from './ImageLayer'
function App(props) {
    const [test, setTest] = useState('')

    useEffect(()=> {
        setTest('Hello World')
    },[])

    return (
        <>      
            {/* <GetSVG /> */}
            <Alarm />
            {/* <Layers /> */}
            {/* <Rocket /> */}
            {/* <Camera /> */}
            {/* <ImageLayer /> */}

        </>
    );
}

export default App



import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import SocialMedia from './SocialMedia'
import Alarm from './icons/Alarm'
import Layers from './icons/Layers'
import GetSVG from './icons/GetSVG'
import Rocket from './icons/Rocket'
import Camera from './icons/Camera'
import ImageLayer from './icons/ImageLayer'
import Flag from './icons/Flag'
import TrafficCone from './icons/TrafficCone'
import VintageController from './icons/VintageController'
import FingerPrint from './icons/FingerPrint'
import GotMail from './icons/GotMail'
import Animation from './icons/Animation'
import ReactIcon from './icons/ReactIcon'
import BackPack from './icons/BackPack'
import WebDesign from './icons/WebDesign'
import FindPage from './icons/FindPage'
import Pixel from './icons/Pixel'
import {getValues} from '../actions/processValues'
import FindReplace from './icons/FindReplace';
import DeskLamp from './icons/DeskLamp';
import IconRightEnd from './icons/Icon-right-end';
import IconLeftEnd from './icons/Icon-left-end';
import Showtime from './icons/Showtime';
import AllWorld from './icons/AllWorld';
import RaceBike from './icons/RaceBike';

import './index.css'


function App(props) {
    const [test, setTest] = useState('')

    useEffect(()=> {
        props.dispatch(getValues(props))
    },[])

    return (
        <>      
            {/* <GetSVG /> */}
            {/* <Alarm /> */}
            {/* <Layers /> */}
            {/* <Rocket /> */}
            {/* <Camera /> */}
            {/* <ImageLayer /> */}
            {/* <Flag /> */}
            {/* <TrafficCone /> */}
            {/* <VintageController /> */}
            {/* <FingerPrint /> */}
            {/* <GotMail /> */}
            {/* <Animation /> */}
            {/* <ReactIcon /> */}
            {/* <BackPack /> */}
            {/* <WebDesign /> */}
            {/* <FindPage /> */}
            {/* <Pixel /> */}
            {/* <FindReplace /> */}
            {/* <DeskLamp /> */}
            <SocialMedia />
            {/* <IconRightEnd /> */}
            {/* <IconLeftEnd /> */}
            {/* <Showtime /> */}
            {/* <AllWorld />  */}
            {/* <RaceBike /> */}
        </>
    );
}
const mapStateToProps = state => {
    return {
        svgData: state.data
    }
}
export default connect(mapStateToProps)(App)


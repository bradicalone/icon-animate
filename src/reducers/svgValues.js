import {SVG_SIZE} from '../actions/types'

const initState = {
    width: '20em',
    height: '20em'
}
export const svgValues = (state, action) => {
    console.log(action.type)
    return initState
    
}
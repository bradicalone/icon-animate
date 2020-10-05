import {SVG_SIZE} from './types'

export const getValues = (data) => {
    console.log(data)
    return {
        type: SVG_SIZE,
        payload: data
    }
    // return dispatch({
    //     type: SVG_SIZE,
    //     payload: { message: 'Empty input, please enter an artist name. ex: "The Smiths" .'}
    // })
}
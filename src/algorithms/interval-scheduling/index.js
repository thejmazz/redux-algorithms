'use strict'

import { createStore } from 'redux'
import scheduler from '../../renderers/scheduler'

// Constants
const PENDING_CONSIDERATION = 'PENDING_CONSIDERATION'
const REJECTED = 'REJECTED'
const ACCEPTED = 'ACCEPTED'
const CURRENT_SMALLEST = 'CURRENT_SMALLEST'
// Actions
const PICK_SMALLEST_FINISH_TIME = 'PICK_SMALLEST_FINISH_TIME'
const pickSmallestFinishTime = {
  type: PICK_SMALLEST_FINISH_TIME
}

// Job factory - society
const job = ({start, end, row = 0, status = PENDING_CONSIDERATION}) => ({start, end, row, status})


// Renderer
const myScheduler = scheduler({ PENDING_CONSIDERATION, REJECTED, ACCEPTED, CURRENT_SMALLEST })

const initialState = {
  // conflict with jobs in renderer
  js: [
    job({start: 0, end: 0.6}),
    job({start: 0.1, end: 0.4}),
    job({start: 0.3, end: 0.5}),
    job({start: 0.3, end: 0.8}),
    job({start: 0.4, end: 0.7}),
    job({start: 0.5, end: 0.9}),
    job({start: 0.6, end: 1}),
    job({start: 0.8, end: 1})
  ],
  smallest: -1
}

const intervalScheduler = (state = initialState, action) => {
  switch (action.type) {
    case PICK_SMALLEST_FINISH_TIME:
      return {...state, smallest: state.smallest + 1}
    default:
      return state
  }
}

let store = createStore(intervalScheduler)

store.subscribe(() => myScheduler.render(store.getState()))


store.dispatch({type: null})

const controls = document.createElement('div')
controls.style.position = 'absolute'
controls.style.bottom = 0
controls.style.width = '100%'
controls.style.height = '50px'
controls.style.backgroundColor = 'white'

const nextButton = document.createElement('button')
nextButton.innerHTML = 'next'
nextButton.onclick = () => store.dispatch(pickSmallestFinishTime)
controls.appendChild(nextButton)


document.body.appendChild(controls)

// setTimeout(() => {
//   store.dispatch(PICK_SMALLEST_FINISH_TIME)
//   console.log(store.getState())
// }, 2000)

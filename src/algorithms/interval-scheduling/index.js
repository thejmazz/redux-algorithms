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
const DELETE_INCOMPATIBLES = 'DELETE_INCOMPATIBLES'
const deleteIncompatibles = {
  type: DELETE_INCOMPATIBLES
}
const ACCEPT_CURRENT = 'ACCEPT_CURRENT'
const acceptCurrent = {
  type: ACCEPT_CURRENT
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
  smallest: 0,
  lastAction: { type: null }
}

const intervalScheduler = (state = initialState, { type }) => {
  let newJs
  switch (type) {
    case (PICK_SMALLEST_FINISH_TIME):
      // TODO O(n)...need to sort by end to get O(nlog_2(n))
      let smallest = state.js[state.smallest].end
      let smallestIndex = state.smallest

      for (let i=smallestIndex; i < state.js.length; i++) {
        if (state.js[i].status === PENDING_CONSIDERATION)
          smallest = state.js[i].end
          smallestIndex = i
      }


      state.js.forEach( (job, i) => {
        if (job.status === PENDING_CONSIDERATION) {
          if (job.end < smallest) {
            smallest = job.end
            smallestIndex = i
          }
        }
      })

      newJs = state.js
      newJs[smallestIndex].status = CURRENT_SMALLEST
      console.log("SET SMALLEST TO", smallestIndex)

      return {...state,
        js: newJs,
        smallest: smallestIndex,
        lastAction: pickSmallestFinishTime
      }
    case (DELETE_INCOMPATIBLES):
      newJs = state.js
      let sJob = state.js[state.smallest]

      state.js.forEach( (job, i) => {
        // TODO make sure this handles all cases...
        if (job.start < sJob.end && job.start >= sJob.start && job.status === PENDING_CONSIDERATION) {
          job.status = REJECTED
        } else if (job.start < sJob.start && job.end > sJob.start) {
          job.status = REJECTED
        } else if (job.end < sJob.end && job.start >= sJob.start && job.status === PENDING_CONSIDERATION) {
          job.status = REJECTED
        }
      })

      return {...state,
        js: newJs,
        lastAction: deleteIncompatibles
      }
    case (ACCEPT_CURRENT):
      newJs = state.js
      newJs[state.smallest].status = ACCEPTED

      return {...state,
        js: newJs,
        lastAction: acceptCurrent
      }
    default:
      return state
  }
}

let store = createStore(intervalScheduler)

store.subscribe(() => myScheduler.render(store.getState()))

store.dispatch({type: null})

// Controls
const controls = document.createElement('div')
controls.style.position = 'absolute'
controls.style.bottom = 0
controls.style.width = '100%'
controls.style.height = '50px'
controls.style.backgroundColor = 'white'

const nextButton = document.createElement('button')
nextButton.innerHTML = 'next'
nextButton.onclick = () => {

  let type = store.getState().lastAction.type
  console.log(type)
  switch(type) {
    case (null):
      console.log('pickSmallestFinishTime')
      store.dispatch(pickSmallestFinishTime)
      break;
    case (PICK_SMALLEST_FINISH_TIME):
      console.log('deleteIncompatibles')
      store.dispatch(deleteIncompatibles)
      break;
    case (DELETE_INCOMPATIBLES):
      console.log('acceptCurrent')
      store.dispatch(acceptCurrent)
      break;
    case (ACCEPT_CURRENT):
      console.log('pickSmallestFinishTime')
      store.dispatch(pickSmallestFinishTime)
      break;
    default:
      console.log('nothing to do')
  }
}
controls.appendChild(nextButton)

document.body.appendChild(controls)

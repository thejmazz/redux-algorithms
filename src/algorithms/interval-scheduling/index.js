'use strict'

import { createStore } from 'redux'
import scheduler from '../../renderers/scheduler'

// Constants
const PENDING_CONSIDERATION = 'PENDING_CONSIDERATION'
const REJECTED = 'REJECTED'
const ACCEPTED = 'ACCEPTED'

const job = ({start, end}) => {
  return {
    start,
    end,
    row: 0,
    status: PENDING_CONSIDERATION
  }
}

const myScheduler = scheduler({ PENDING_CONSIDERATION, REJECTED, ACCEPTED })

const state = {
  js: [
    job({start: 0, end: 0.6}),
    job({start: 0.1, end: 0.4}),
    job({start: 0.3, end: 0.5}),
    job({start: 0.3, end: 0.8}),
    job({start: 0.4, end: 0.7}),
    job({start: 0.5, end: 0.9}),
    job({start: 0.6, end: 1}),
    job({start: 0.8, end: 1})
  ]
}

myScheduler.render(state)

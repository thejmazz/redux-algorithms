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

const state = [job({start: 0.1, end: 0.3})]

myScheduler.render(state)

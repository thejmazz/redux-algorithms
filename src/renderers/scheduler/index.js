export default (constants) => {
  // Canvas, context
  const canvas = document.createElement('canvas')
  const W = canvas.width = window.innerWidth
  const H = canvas.height = window.innerHeight
  const ctx = canvas.getContext('2d')

  const { PENDING_CONSIDERATION, REJECTED, ACCEPTED } = constants

  // Append to body
  document.body.style.margin = 0
  document.body.appendChild(canvas)

  // Settings
  const TIMELINE_START = 0.2
  const TIMELINE_END = 0.8
  const ROW_HEIGHT = '20'
  const ROW_PADDING = '5'

  let jobs = []

  const update = (state) => {
    jobs = state
  }

  const clear = () => {
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,W, H)
  }

  const drawJob = ({ start, end, row, status }) => {
    let colour
    if (status === PENDING_CONSIDERATION) {
      colour = 'blue'
    } else if (status === REJECTED) {
      colour = 'red'
    } else if (status === ACCEPTED) {
      colour = 'green'
    }

    ctx.strokeStyle = colour
    ctx.lineWidth = ROW_HEIGHT

    ctx.beginPath()
    ctx.moveTo(W*TIMELINE_START + start*(W*(TIMELINE_END - TIMELINE_START)), row*ROW_HEIGHT + ROW_PADDING)
    ctx.lineTo(W*TIMELINE_START + end*(W*(TIMELINE_END - TIMELINE_START)), row*ROW_HEIGHT + ROW_PADDING)
    ctx.closePath()

    ctx.stroke()

    console.log('drew a job?')
  }

  const drawTimeline = (y) => {
    ctx.strokeStyle = 'orange'
    ctx.lineWidth = 4

    ctx.beginPath()
    ctx.moveTo(W*TIMELINE_START, y)
    ctx.lineTo(W*TIMELINE_END, y)
    ctx.closePath()

    ctx.stroke()
  }

  const draw = () => {
    drawTimeline(100)
    jobs.forEach(job => drawJob(job))
  }

  const render = (state) => {
    update(state)

    clear()
    draw()
  }

  return { render }
}

/**
 * Scheduler renderer.
 * @param  {array} constants  Constants specific to the algorithm's drawings. KEEP?
 * @return {Object}           Object with render function
 */
export default (constants) => {
  // Canvas, context
  const canvas = document.createElement('canvas')
  const W = canvas.width = window.innerWidth
  const H = canvas.height = window.innerHeight
  const ctx = canvas.getContext('2d')

  const { PENDING_CONSIDERATION, REJECTED, ACCEPTED, CURRENT_SMALLEST } = constants

  // Append to body
  document.body.style.margin = 0
  document.body.appendChild(canvas)

  // Settings
  const TIMELINE_START = 0.2
  const TIMELINE_END = 0.8
  const ROW_HEIGHT = 20
  const ROW_PADDING = 10
  const OFFSET_TOP = 50

  let jobs = []

  const update = ({ js }) => {
    jobs = []
    js.forEach( (job, i) => jobs.push({
      ...job,
      row: i
    }))
  }

  const clear = () => {
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,W, H)
  }

  /**
   * Draw a job.
   * (job, state)
   * @param  {Number} start  Start time.
   * @param  {Number} end    End Time.
   * @param  {Number} row    Row, or array index.
   * @param  {String} status Current job status.
   * @param  {Number} smallest  Index of currently smallest job.
   * @return none
   */
  const drawJob = ({ start, end, row, status }, { smallest }) => {
    let colour
    let fontColour = 'white'
    if (status === PENDING_CONSIDERATION) {
      colour = 'blue'
    } else if (status === REJECTED) {
      colour = 'red'
    } else if (status === ACCEPTED) {
      colour = 'green'
    } else if (status === CURRENT_SMALLEST) {
      colour = 'yellow'
      fontColour = 'black'
    }

    ctx.strokeStyle = colour
    ctx.lineWidth = ROW_HEIGHT

    const x1 = W*TIMELINE_START + start*(W*(TIMELINE_END - TIMELINE_START))
    const x2 = W*TIMELINE_START + end*(W*(TIMELINE_END - TIMELINE_START))
    const y1 = row*(ROW_HEIGHT + ROW_PADDING) + OFFSET_TOP
    const y2 = y1

    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.closePath()

    ctx.stroke()

    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = fontColour
    ctx.fillText(row, x1, y1 + 7)
  }

  const drawTimeline = () => {
    ctx.strokeStyle = 'orange'
    ctx.lineWidth = 4

    const y = jobs.length*(ROW_HEIGHT + ROW_PADDING) + OFFSET_TOP

    ctx.beginPath()
    ctx.moveTo(W*TIMELINE_START, y)
    ctx.lineTo(W*TIMELINE_END, y)
    ctx.closePath()

    ctx.stroke()
  }

  const draw = (state) => {
    drawTimeline()
    jobs.forEach(job => drawJob(job, state))
  }

  const render = (state) => {
    console.log(state)

    update(state)

    clear()
    draw(state)
  }

  return { render }
}

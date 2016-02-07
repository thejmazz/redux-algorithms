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
  const ROW_HEIGHT = 20
  const ROW_PADDING = 10
  const OFFSET_TOP = 50

  let jobs = []

  const update = ({ js }) => {
    js.forEach( (job, i) => jobs.push({
      ...job,
      row: i
    }))
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
    ctx.fillStyle = 'white'
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

  const draw = () => {
    drawTimeline()
    jobs.forEach(job => drawJob(job))
  }

  const render = (state) => {
    update(state)

    clear()
    draw()
  }

  return { render }
}

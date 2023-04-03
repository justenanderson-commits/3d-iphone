import React, { useRef } from 'react'

const WebgiViewer = () => {
  const canvasRef = useRef(null)
  return (
    <div id="webgi-canvas-container">
      <canvas id="webgiv-canvas" ref={canvasRef} />
    </div>
  )
}

export default WebgiViewer

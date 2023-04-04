// Left off at ____ https://www.youtube.com/watch?v=IyBhFma4H1A&t=98s //
import React, { useRef, useEffect, useState, useCallback, forwardRef } from 'react'
import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  BloomPlugin,
  GammaCorrectionPlugin,
  CanvasSnipperPlugin,
  mobileAndTabletCheck
} from 'webgi'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const WebgiViewer = () => {
  const canvasRef = useRef(null)
  const setupViewer = useCallback(async () => {
    const viewer = new ViewerApp({
      canvas: canvasRef.current
  })

    const manager = await viewer.addPlugin(AssetManagerPlugin)

    const camera = viewer.scene.activeCamera
    const position = camera.position
    const target = camera.target

    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin)
    await viewer.addPlugin(new ProgressivePlugin(32))
    await viewer.addPlugin(new TonemapPlugin(true))
    await viewer.addPlugin(GammaCorrectionPlugin)
    await viewer.addPlugin(SSRPlugin)
    await viewer.addPlugin(SSAOPlugin)
    await viewer.addPlugin(BloomPlugin)

    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline()

    await manager.addFromPath('scene-black.glb')

    viewer.getPlugin(TonemapPlugin).config.clipBackground = true
    viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false})
    window.scrollTo(0, 0)
    
    let needsUpdate = true
    
    viewer.addEventListener("preframe", () => {
      if(needsUpdate) {
      camera.positionTargetUpdated(true)
      }
    })
  }, [])

  useEffect(() => {
    setupViewer()
  }, [])
   
  return (
    <div id="webgi-canvas-container">
      <canvas id="webgiv-canvas" ref={canvasRef} />
    </div>
  )
}

export default WebgiViewer
 
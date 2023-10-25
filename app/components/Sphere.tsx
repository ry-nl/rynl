// 'use client'
// import React, { useRef, useEffect } from 'react'
// import * as THREE from 'three'

// const Sphere: React.FC = () => {
//     const containerRef = useRef<HTMLDivElement>(null)
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             const scene = new THREE.Scene()
//             const camera = new THREE.PerspectiveCamera(
//                 75,
//                 window.innerWidth / window.innerHeight,
//                 0.1,
//                 1000
//             )
//             const renderer = new THREE.WebGLRenderer()
//             renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5)
//             renderer.setClearColor(0xffffff, 0)
//             containerRef.current?.appendChild(renderer.domElement)
//             camera.position.z = 2

//             if (typeof window !== 'undefined') {
//                 const geometry = new THREE.SphereGeometry()
//                 const wireframe = new THREE.WireframeGeometry(geometry)

//                 const line = new THREE.LineSegments(wireframe)
//                 line.material.depthTest = false
//                 line.material.opacity = 0.25
//                 line.material.color = new THREE.Color(0xffffff)
//                 line.material.transparent = true

//                 scene.add(line)

//                 const renderScene = () => {
//                     // line.rotation.x += 0.002
//                     line.rotation.y += 0.002
//                     renderer.render(scene, camera)
//                     requestAnimationFrame(renderScene)
//                 }

//                 // Call the renderScene function to start the animation loop
//                 renderScene()

//                 const handleResize = () => {
//                     const width = window.innerWidth
//                     const height = window.innerHeight

//                     camera.aspect = width / height
//                     camera.updateProjectionMatrix()

//                     renderer.setSize(width, height)
//                 }

//                 window.addEventListener('resize', handleResize)

//                 // Clean up the event listener when the component is unmounted
//                 return () => {
//                     window.removeEventListener('resize', handleResize)
//                 }
//             }
//         }
//     }, [])
//     return <div ref={containerRef} />
// }
// export default Sphere

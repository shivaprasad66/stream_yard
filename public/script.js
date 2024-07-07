const userVideo = document.getElementById('user-Video')
const startButton= document.getElementById('start-btn')

const state ={ media: null }

const socket=io()

startButton.addEventListener('click',()=>{
 const mediaRecoder = new MediaRecorder(state.media,{
 audioBitsPerSecond:128000,
 videoBitsperSecond: 2500000,
 framerate: 25
 })

 mediaRecoder.ondataavailable = ev => {
    console.log('Binary Stream Available', ev.data)
    socket.emit('binarystream', ev.data)
 }
 mediaRecoder.start(25)
})
window.addEventListener('load',async e =>{
    const media = await navigator.mediaDevices.getUserMedia({audio:true,video:true})
state.media = media
userVideo.srcObject=media
})
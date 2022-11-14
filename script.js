const peer = new Peer()
const videodiv = document.getElementById("videos")

console.log(peer);

navigator.mediaDevices.getUserMedia({video:true})
  .then((stream) => {
    window.video = stream
    const video = document.createElement("video")
    video.srcObject = stream
    videodiv.appendChild(video)
    video.play()
  })
  .catch((err) => {
    /* handle the error */
  });

  function callOther(id){
    var call = peer.call(id, window.video);
    call.on("stream", (remoteStream) => {
        const video = document.createElement("video")
        video.srcObject = remoteStream
        videodiv.appendChild(video)
        video.play()
      });
}
peer.on("call",(call)=>{
    call.answer(window.video)
    call.on('stream', function(remoteStream) {
        const video = document.createElement("video")
        video.srcObject = remoteStream
        videodiv.appendChild(video)
        video.play()
    
      // Show stream in some video/canvas element.
    });
    
})

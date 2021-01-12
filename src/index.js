const start = document.getElementById("start");
const stop = document.getElementById("stop");
const video = document.querySelector("video");
let recorder, stream;

async function startRecording() {
  stream = await navigator.mediaDevices.getDisplayMedia({//for screen and with screen sound
    video: { 
    		mediaSource: "screen",
    		 cursor: "always" 
    		},
    audio: true
    //audio: { :true}
  });

  // stream = await navigator.mediaDevices.getUserMedia({//for webcam and audio
  //   video: true,
  //   audio: true
  // });
  var options = {mimeType: 'video/webm; codecs=vp9'};//{mimeType: 'video/mp4; codecs=vp9'}--> is not supported
  recorder = new MediaRecorder(stream, options);

  const chunks = [];
  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = e => {
    const completeBlob = new Blob(chunks, { type: chunks[0].type });//type: chunks[0].type {type: "video\/mp4"}
    video.src = URL.createObjectURL(completeBlob);
  };

  recorder.start();
}

start.addEventListener("click", () => {
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");

  startRecording();
});

stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");

  recorder.stop();
  stream.getVideoTracks()[0].stop();
});

import { color, squat, bench, deadlift } from "./static/lib/style.js"
import { modify, makeGif } from "./static/lib/data.js"

squat.addEventListener('click', () => { color('#c53737') })
bench.addEventListener('click', () => { color('#2232e0') })
deadlift.addEventListener('click', () => { color('#d0ba11') })

const input = document.getElementById('video')
const video = document.getElementById('playback')
const uploadbtn = document.getElementById('uploadbtn')
const hidden_vid = document.getElementById('vid-hidden')

// this variable will avoid repeated callbacks on the hidden_vid 'canplaythrough' event
var called = false
// when you upload a video...
input.addEventListener('change', () => {
    const file = input.files[0]
    if (file) {
        // reset 'called' so it can be processed
        called = false
        // place the video in our hidden <video> for processing
        hidden_vid.src = URL.createObjectURL(file)
    }
})

// when the uploaded video is loaded into the hidden <video>...
hidden_vid.addEventListener('canplaythrough', async () => {
    // make sure we dont get repeated callbacks for the same vid
    if (!called) {
        called = true
        // call all our formatting functions on it
        modify(hidden_vid, (frames) => {
            // make the frames into a gif and display it
            makeGif(frames, (blob) => {
                video.src = URL.createObjectURL(blob)
                video.style.display = "block"
                uploadbtn.style.display = "none"
                input.style.display = "none"
            })
        })
    }
})

/*
const subbtn = document.getElementById('subbtn')
subbtn.addEventListener('click', async () => {
    console.log('submitted')
    // our two parameters here are *video* - the HTML <video> element containing the processed submition
    // and the type of video (s/b/d), determined by the currently selected button
    var model = 0
    if (squat.checked) { model = await tf.loadLayersModel('static/models/squat/model.json') }
    else if (bench.checked) { model = await tf.loadLayersModel('static/models/bench/model.json') }
    else if (deadlift.checked) { model = await tf.loadLayersModel('static/models/deadlift/model.json') }

    const circ1 = document.getElementById('light1')
    const circ2 = document.getElementById('light2')
    const circ3 = document.getElementById('light3')

    // SPECIFICALLY DISCARD THE MODEL FROM MEMORY AT THE END OF THIS FUNCTION
})
*/
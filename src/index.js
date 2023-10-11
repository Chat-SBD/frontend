import { modify, makeGif } from "./static/lib/data.js"

const squat = document.getElementById('squat')
const bench = document.getElementById('bench')
const deadlift = document.getElementById('deadlift')

const type = document.getElementById('types')
const file = document.getElementById('file')
const submit = document.getElementById('submit')

function color(hex) {
    type.style.borderColor = hex
    file.style.borderColor = hex
    submit.style.borderColor = hex
}

squat.addEventListener('click', () => {
    color('#c53737')
})

bench.addEventListener('click', () => {
    color('#2232e0')
})

deadlift.addEventListener('click', () => {
    color('#d0ba11')
})

const input = document.getElementById('video')
const video = document.getElementById('playback')
const uploadbtn = document.getElementById('uploadbtn')
const hidden_vid = document.getElementById('vid-hidden')

var called = 0
// when you upload a video this happens
input.addEventListener('change', () => {
    const file = input.files[0]
    if (file) {
        // place the video in our hidden <video> for processing
        called = 0
        hidden_vid.src = URL.createObjectURL(file)
    }
})

// when the uploaded video is loaded into the hidden <video>, this happens
hidden_vid.addEventListener('canplaythrough', async () => {
    // make sure we dont get a loop
    if (called == 0) {
        called = 1
        console.log('canplay')
        // call all our formatting functions on it
        const frames = await modify(hidden_vid)

        // then place the formatted video in the visible <video> element
        console.log(frames)
        video.src = makeGif(frames)
        video.style.display = "block"
        uploadbtn.style.display = "none"
        input.style.display = "none"
    }
})

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
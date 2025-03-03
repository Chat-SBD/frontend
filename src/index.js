import { color, squat, bench, deadlift } from './static/lib/style.js'
import { modify, makeGif } from './static/lib/data.js'

var clicked = false
squat.addEventListener('click', () => { color('#c53737'); clicked = true })
bench.addEventListener('click', () => { color('#2232e0'); clicked = true })
deadlift.addEventListener('click', () => { color('#d0ba11'); clicked = true })

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
        // make our progress window show up
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        message.innerHTML = 'Processing...'
        // reset 'called' so it can be processed
        called = false
        // reset the lights too
        for (var i = 0; i < 3; i ++) {
            circs[i].style.backgroundColor = 'black'
        }
        // place the video in our hidden <video> for processing
        hidden_vid.src = URL.createObjectURL(file)
    }
})

var currentFrames = false
// when the uploaded video is loaded into the hidden <video>...
hidden_vid.addEventListener('canplaythrough', async () => {
    // make sure we dont get repeated callbacks for the same vid
    if (!called) {
        called = true
        // call all our formatting functions on it
        modify(hidden_vid, (frames) => {
            currentFrames = frames
            // make the frames into a gif and display it
            makeGif(frames, (blob) => {
                video.src = URL.createObjectURL(blob)
                video.style.display = "block"
                uploadbtn.style.display = "none"
                input.style.display = "none"
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'
                message.innerHTML = ''
            })
        })
    }
})


const subbtn = document.getElementById('subbtn')
const circ1 = document.getElementById('light1')
const circ2 = document.getElementById('light2')
const circ3 = document.getElementById('light3')
const circs = [circ1, circ2, circ3]

const overlay = document.getElementById('overlay')
const message = document.getElementById('status')

subbtn.addEventListener('click', async () => {
    if(currentFrames) {
        // if you havent selected a lift...
        if (!clicked) {
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
            message.innerHTML = 'Select a lift above'
            return
        }
        for (var i = 0; i < 3; i ++) {
            circs[i].style.backgroundColor = 'black'
        }
        // make our progress window show up
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        message.innerHTML = 'Loading model...'

        var model = null
        if (squat.checked) { model = await tf.loadLayersModel('static/models/squat/model.json') }
        else if (bench.checked) { model = await tf.loadLayersModel('static/models/bench/model.json') }
        else if (deadlift.checked) { model = await tf.loadLayersModel('static/models/deadlift/model.json') }

        var input = tf.tensor(currentFrames)
        // add a dimension to the end of the tensor for the channels (64, 300, 300, 1)
        input = tf.expandDims(input, -1)
        // and another at the beginning for the batch (1, 64, 300, 300, 1)
        input = tf.expandDims(input, 0)

        // get the batch of results as an array of arrays
        message.innerHTML = 'Loading model...<br>Predicting...'
        var result = await model.predict(input).array()
        // get the result we want
        result = result[0]
        // get the light count
        const label = result.indexOf(Math.max(...result))

        // light control
        for (var i = 0; i < 3; i ++) {
            circs[i].style.backgroundColor = 'red'
        }
        for (var i = 0; i < label; i ++) {
            circs[i].style.backgroundColor = 'white'
        }

        model = null
        message.innerHTML = 'Loading model...<br>Predicting...<br>Done'
        setTimeout(() => {
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'
            message.innerHTML = ''
        }, 2000)
    }
})
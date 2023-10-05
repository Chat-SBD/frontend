import { getFrames } from "./static/lib/data.js";

const squat = document.getElementById('squat');
const bench = document.getElementById('bench');
const deadlift = document.getElementById('deadlift');

const type = document.getElementById('types');
const file = document.getElementById('file');
const submit = document.getElementById('submit');

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

const input = document.getElementById('video');
const video = document.getElementById('playback');
const uploadbtn = document.getElementById('uploadbtn')

input.addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const objectURL = URL.createObjectURL(file);
        video.src = objectURL;

        video.style.display = "block";
        uploadbtn.style.display = "none";
        input.style.display = "none";
    }
}

async function run() {
    console.log('started load')
    const model = await tf.loadLayersModel('static/models/squat/model.json');

    const circ1 = document.getElementById('light1')
    const circ2 = document.getElementById('light2')
    const circ3 = document.getElementById('light3')

    circ1.style.backgroundColor = '#000000';
    console.log('finished load')
    console.log('predicting')
    const frames = getFrames('squat-vid1-4_3.mp4')
}

run();
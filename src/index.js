import { trim } from "./static/lib/data.js";

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
async function handleFileUpload(event) {
    const file = event.target.files[0];
    console.log('uploaded')
    if (file) {
        var newfile = await trim(file);
        console.log('trimmed')
        // first place the video in the video element
        // i think this is needed to read it into something
        const objectURL = URL.createObjectURL(newfile);
        video.src = objectURL;
        video.style.display = "block";
        uploadbtn.style.display = "none";
        input.style.display = "none";
    }
    return null;
}

const subbtn = document.getElementById('subbtn');
subbtn.addEventListener('click', handleSubmit);
async function handleSubmit(event) {
    console.log('submitted')
    // our two parameters here are *video* - the HTML <video> element containing the processed submition
    // and the type of video (s/b/d), determined by the currently selected button
    var model = 0;
    if (squat.checked) { model = await tf.loadLayersModel('static/models/squat/model.json'); }
    else if (bench.checked) { model = await tf.loadLayersModel('static/models/bench/model.json'); }
    else if (deadlift.checked) { model = await tf.loadLayersModel('static/models/deadlift/model.json'); }

    const circ1 = document.getElementById('light1')
    const circ2 = document.getElementById('light2')
    const circ3 = document.getElementById('light3')

    // SPECIFICALLY DISCARD THE MODEL FROM MEMORY AT THE END OF THIS FUNCTION
}
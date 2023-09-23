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
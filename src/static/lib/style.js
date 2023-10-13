const type = document.getElementById('types')
const file = document.getElementById('file')
const submit = document.getElementById('submit')

function color(hex) {
    type.style.borderColor = hex
    file.style.borderColor = hex
    submit.style.borderColor = hex
}

const squat = document.getElementById('squat')
const bench = document.getElementById('bench')
const deadlift = document.getElementById('deadlift')

export {
    color,
    squat,
    bench,
    deadlift
}
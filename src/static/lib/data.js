import { FRAMES, SIZE, FPS } from './CONSTANTS.js'

async function getCtx() {
    const canvas = document.getElementById('frame-hidden')
    const context = await canvas.getContext('2d', {willReadFrequently: true})
    return context
}

// this takes a <video> element
async function modify(video) {
    const width = video.videoWidth
    const height = video.videoHeight
    // GUYS YOU SHOULDVE CROPPED IT SQUARE BUT WHATEVER I GUESS
    // IF YOU DIDNT AND YOU HAVE A VERTICAL VID...
    async function delay(width, height, SIZE) {
        if (height > width) {
            const scalar = width / SIZE
            const newHeight = height / scalar
            const newWidth = SIZE
            const yOffset = -((newHeight - SIZE) / 2)
            const xOffset = 0
            return [newHeight, newWidth, xOffset, yOffset]
        } else {
            const scalar = height / SIZE
            const newWidth = width / scalar
            const newHeight = SIZE
            const xOffset = -((newWidth - SIZE) / 2)
            const yOffset = 0
            return [newHeight, newWidth, xOffset, yOffset]
        }
    }
    
    const params = await delay(width, height, SIZE)
    frames = new Array(FRAMES)
    video.pause()
    video.currentTime = 0
    await crop(video, frames, await getCtx(), ...params)
    return frames
}

var count = 0
async function crop(video, frames, context, newHeight, newWidth, xOffset, yOffset) {
    //setTimeout(async () => {
    if (count == FRAMES) {
        count = 0
        console.log('done')
        return frames
    }
    context.drawImage(video, xOffset, yOffset, newWidth, newHeight)
    // make the frame 2d 300 x 300 array
    async function makeFrame(SIZE) {
        var frame = new Array(SIZE)
        for (var i = 0; i < SIZE; i ++) {
            frame[i] = new Array(SIZE)
        }
        return frame
    }
    var frame
    
    // get image data
    const data = await context.getImageData(0, 0, SIZE, SIZE).data
    // loop through the pixels and convert to greyscale and append
    var row = 0
    var col = 0
    frame = await makeFrame(SIZE)
    for (var i = 0; i < data.length; i += 4) {
        frame[row][col] = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2])
        col ++
        if (col == SIZE) {
            col = 0
            row ++
        }
    }
    frames.push(frame)
    // advance the counter
    video.currentTime += 1 / FPS
    count ++
    requestAnimationFrame(() => { crop(video, frames, context, newHeight, newWidth, xOffset, yOffset) })
    //}, 0)
}

// make the data into a gif and return the object url
function makeGif(frames) {
    const gif = new GIF({
        workers: 2,
        quality: 10,
    });

    frames.forEach((frame) => {
        gif.addFrame(frame, { delay: 100 });
    });

    gif.render();
    gif.on('finished', function(blob) {
        return URL.createObjectURL(blob);
    });
}

export {
    modify,
    makeGif
}
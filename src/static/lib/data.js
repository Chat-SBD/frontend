import { FRAMES, SIZE, PERIOD } from './CONSTANTS.js'

const canvas = document.getElementById('frame-hidden')
const context = await canvas.getContext('2d', {willReadFrequently: true})

// this takes a <video> element, and a function to call with the frames once theyre extracted
function modify(video, lambda) {
    var newHeight, newWidth, xOffset, yOffset, scalar
    // GUYS YOU SHOULDVE CROPPED IT SQUARE BUT WHATEVER I GUESS
    // IF YOU DIDNT AND YOU HAVE A VERTICAL VID...
    if (video.videoHeight > video.videoWidth) {
        scalar = video.videoWidth / SIZE
        newHeight = video.videoHeight / scalar
        newWidth = SIZE
        yOffset = -((newHeight - SIZE) / 2)
        xOffset = 0
    }
    
    else {
        scalar = video.videoHeight / SIZE
        newWidth = video.videoWidth / scalar
        newHeight = SIZE
        xOffset = -((newWidth - SIZE) / 2)
        yOffset = 0
    }
    
    frames = new Array(FRAMES)
    video.pause()
    video.currentTime = 0
    crop(video, frames, context, newHeight, newWidth, xOffset, yOffset, lambda)
}

var count = 0
function crop(video, frames, context, newHeight, newWidth, xOffset, yOffset, lambda) {
    // if we've gone through all frames...
    if (count == FRAMES) {
        count = 0
        // call the inputted function with frames as a param
        lambda(frames)
        return
    }

    // draw the frame on the canvas in a way that crops it and downscales it by fitting it into 300 x 300
    context.drawImage(video, xOffset, yOffset, newWidth, newHeight)

    // make a 2d 300 x 300 array
    const frame = new Array(SIZE)
    for (var i = 0; i < SIZE; i ++) {
        frame[i] = new Array(SIZE)
    }
    
    // get image data
    const data = context.getImageData(0, 0, SIZE, SIZE).data

    // loop through the pixels and convert to greyscale and append
    var row = 0
    var col = 0
    for (var i = 0; i < data.length; i += 4) {
        frame[row][col] = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2])
        col ++
        if (col == SIZE) {
            col = 0
            row ++
        }
    }
    frames[count] = frame

    // advance the counters
    video.currentTime += PERIOD
    count ++
    requestAnimationFrame(() => { return crop(video, frames, context, newHeight, newWidth, xOffset, yOffset, lambda) })
}

// make the data into a gif and execute the lambda with the blob lmao
function makeGif(frames, lambda) {
    // initialize gif idk what this does tbh
    const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: 'static/lib/gif.worker.js',
        width: SIZE,
        height: SIZE
    });

    // for each frame
    frames.forEach((frame) => {
        // we have to put the greyscale data BACK onto the canvas to convert BACK to RGBA to make a gif :|
        const imgData = context.createImageData(SIZE, SIZE)
        // for every greyscale pixel
        for (var row = 0; row < SIZE; row ++) {
            for (var col = 0; col < SIZE; col ++) {
                // just trust the math tbh
                const index = ((row * SIZE) + col) * 4
                const grey = frame[row][col]

                // turn into RBGA and add to imageData
                imgData.data[index] = grey
                imgData.data[index + 1] = grey
                imgData.data[index + 2] = grey
                // this one is 'alpha', 255 is full opaque
                imgData.data[index + 3] = 255
            }
        }
        
        // put on the canvas and add to the gif
        context.putImageData(imgData, 0, 0)
        gif.addFrame(context, { copy: true, delay: PERIOD });
    });

    gif.on('finished', function(blob) {
        lambda(blob)
    });

    gif.render();
}

export {
    modify,
    makeGif
}
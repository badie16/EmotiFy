// convert.js
import Ffmpeg from "fluent-ffmpeg"
import ffmpegPath from "ffmpeg-static"
import path from "path"

Ffmpeg.setFfmpegPath(ffmpegPath) 

function convertWebmToWav(inputPath, outputDir = "uploads") {
    const outputFilename = `${Date.now()}.wav`
    const outputPath = path.join(outputDir, outputFilename)

    return new Promise((resolve, reject) => {
        Ffmpeg(inputPath)
            .toFormat("wav")
            .on("end", () => resolve(outputPath))
            .on("error", reject)
            .save(outputPath)
    })
}

export default convertWebmToWav

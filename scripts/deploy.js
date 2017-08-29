const s3 = require('s3')

const client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

const params = {
  localDir: "client/build",
  deleteRemoved: true,

  s3Params: {
    Bucket: "aws-website-everee-th71y"
  }
}

const uploader = client.uploadDir(params)

uploader.on('error', function(err) {
  console.error("unable to sync:", err.stack)
})

uploader.on('progress', function() {
  console.log("progress", uploader.progressAmount, uploader.progressTotal)
})

uploader.on('end', function() {
  console.log("done uploading")
})
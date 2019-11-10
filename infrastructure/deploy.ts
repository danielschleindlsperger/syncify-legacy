import AWS from 'aws-sdk'
import fs from 'fs'
import path from 'path'
import mime from 'mime-types'

const credentials = process.env.AWS_ACCESS_KEY_ID
  ? undefined
  : new AWS.SharedIniFileCredentials({ profile: 'dev' })

const s3 = new AWS.S3({
  region: 'eu-central-1',
  credentials,
})

function walkSync(currentDirPath: string, callback: (filePath: string, stat: fs.Stats) => void) {
  fs.readdirSync(currentDirPath).forEach(name => {
    const filePath = path.join(currentDirPath, name)
    const stat = fs.statSync(filePath)
    if (stat.isFile()) {
      callback(filePath, stat)
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback)
    }
  })
}

function uploadFrontendAssets() {
  const assetsPath = path.resolve(__dirname, '../dist')
  walkSync(assetsPath, async (filePath, stats) => {
    const assetKey = path.relative(assetsPath, filePath)
    const ContentType = mime.lookup(path.extname(assetKey)) || 'application/octet-stream'
    let params = {
      Bucket: 'syncify-assets',
      Key: assetKey,
      Body: fs.readFileSync(filePath),
      ACL: 'public-read',
      ContentType,
      CacheControl: assetKey === 'index.html' ? 'max-age=2' : 'max-age=31536000',
    }
    await s3.putObject(params).promise()
    console.log(`Successfully uploaded ${assetKey}.`)
  })
}

uploadFrontendAssets()

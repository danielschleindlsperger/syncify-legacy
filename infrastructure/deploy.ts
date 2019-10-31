import AWS from 'aws-sdk'
import fs from 'fs'
import path from 'path'
import mime from 'mime-types'
import shell from 'shelljs'

const credentials = process.env.AWS_ACCESS_KEY_ID
  ? undefined
  : new AWS.SharedIniFileCredentials({ profile: 'dev' })

const s3 = new AWS.S3({
  region: 'eu-central-1',
  credentials,
})

const eb = new AWS.ElasticBeanstalk({ region: 'eu-central-1', credentials })

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
  const assetsPath = path.resolve(__dirname, '../dist/apps/webapp')
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

async function deployApiArtifact() {
  const applicationName = 'syncify-api'
  const deployEnvironment = 'prod'
  const artifactPath = path.resolve(__dirname, '../dist/apps/api/artifact.zip')
  const version = new Date()
    .toISOString()
    .replace('T', '-')
    .replace(/:/g, '-')
    .replace('Z', '')
    .slice(0, 19)
  const Key = `${version}.zip`
  const Bucket = 'syncify-artifacts'
  let params = {
    Bucket,
    Key,
    Body: fs.readFileSync(artifactPath),
  }
  await s3.putObject(params).promise()

  console.log(`Uploaded artifact ${Key}.`)

  await eb
    .createApplicationVersion({
      ApplicationName: applicationName,
      VersionLabel: version,
      SourceBundle: {
        S3Bucket: Bucket,
        S3Key: Key,
      },
    })
    .promise()

  console.log(`Created Beanstalk application version for artifact ${Key}.`)

  await eb
    .updateEnvironment({
      EnvironmentName: deployEnvironment,
      ApplicationName: applicationName,
      VersionLabel: version,
    })
    .promise()

  console.log(`Succesfully deployed Beanstalk app.`)
}

const prepareArtifact = () => {
  const artifactFolder = path.join(__dirname, '../dist/apps/api')

  // remove dev deps, since they will be included in the bundle
  shell.exec('npm prune --production')

  // copy node_modules
  shell.cp('-R', 'node_modules', path.join(artifactFolder, 'node_modules'))

  // rename files to match beanstalk convention
  shell.mv(path.join(artifactFolder, 'main.js'), path.join(artifactFolder, 'app.js'))
  shell.mv(path.join(artifactFolder, 'main.js.map'), path.join(artifactFolder, 'app.js.map'))

  // package
  shell.cd(artifactFolder)
  shell.exec('zip -r artifact.zip node_modules app.js app.js.map')
}

prepareArtifact()
deployApiArtifact()
uploadFrontendAssets()

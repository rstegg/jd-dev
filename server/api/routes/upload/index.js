const passport = apiRequire('service/auth')

const router = require('express').Router()

const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const imager = require('multer-imager')

const uploadProfileImage = require('./handlers/uploadProfileImage')
const uploadCaseFile = require('./handlers/uploadCaseFile')
const uploadExtraCaseFile = require('./handlers/uploadExtraCaseFile')

const debug = require('debug')('aws-s3')

const winston = require('winston')

const logger = (req, res, next) => winston.log('info', req) && next()

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'freecontour-stls',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
})

const uploadImg = multer({
  storage: imager({
    dirname: 'images',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
    bucket: 'freecontour-images',
    acl: 'public-read',
    contentType: imager.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    filename: (req, file, cb) => {
      cb(null, shortId.generate() + '__' + Date.now().toString())
    },
    gm: {
      format: 'png',
      width: 250,
      height: 250,
      options: '%@'
    }
  })
})

const success =
  (req, res) => res.status(200).json({image: req.file.location})

module.exports =
  router
    .use(passport.authenticate('jwt', { session: false }))
    .post('/profile',
      uploadImg.single('image'),
      uploadProfileImage
    )
    .post('/orders/:uid',
      upload.single('file'),
      uploadExtraCaseFile
    )
    .post('/orders',
      upload.array('file'),
      uploadCaseFile
    )

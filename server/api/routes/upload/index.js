const passport = apiRequire('service/auth')

const router = require('express').Router()

const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const imager = require('multer-imager')
const shortId = require('shortid')

const uploadProfileImage = require('./handlers/uploadProfileImage')
const uploadScanFile = require('./handlers/uploadScanFile')
const uploadExtraScanFile = require('./handlers/uploadExtraScanFile')
const uploadDesignFile = require('./handlers/uploadDesignFile')
const uploadExtraScanFileAdmin = require('./handlers/uploadExtraScanFileAdmin')
const uploadDesignFileAdmin = require('./handlers/uploadDesignFileAdmin')
const uploadProfileImageAdmin = require('./handlers/uploadProfileImageAdmin')

const authenticateAdmin = apiRequire('middleware/authenticate-admin')

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
    bucket: 'jawdrop-s3',
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
    bucket: 'jawdrop-images',
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
      upload.single('file'),
      uploadProfileImage
    )
    .post('/orders/:uid',
      upload.single('file'),
      uploadExtraScanFile
    )
    .post('/design/:uid',
      upload.single('file'),
      uploadDesignFile
    )
    .post('/orders',
      upload.array('file'),
      uploadScanFile
    )
    .post('/admin/design/:uid',
      authenticateAdmin,
      upload.single('file'),
      uploadDesignFileAdmin
    )
    .post('/admin/orders/:uid',
      authenticateAdmin,
      upload.single('file'),
      uploadExtraScanFileAdmin
    )
    .post('/admin/profile',
      authenticateAdmin,
      upload.single('file'),
      uploadProfileImageAdmin
    )

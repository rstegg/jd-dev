const IGNORED_COLLECTIONS = [
  /98mm Zirconia Blocks/,
  /Dental Marketing/,
  /Full Countour Wax/,
  /Souvenir Shop/,
  /Wax/,
  /Supplies/,
  /Implant/,
  /3\/4/,
  /Custom Abutments/,
  /Dental Cad Cam Design Services/,
  /Milling Services/,
  /Dental CAD CAM Milling Burs/,
  /3M Lava/,
]

const ACCEPTED_COLLECTIONS = [
  /Full Solid Crowns/,
  /Zirconia Copings/,
  /Anatomical Copings/,
  /Full Solid Anterior/,
  /Inlay/,
  /Veneer/,
  /Guard/,
  /Surgical/,
]

const IGNORED_DATA = [
  /Upload/,
  /Dropbox/,
  /Ship/,
  /Scanner/,
  /Series/,
  /Cement/,
  /mm/,
  /Yes$/,
  /No$/,
  /Screw/,
]

module.exports = {
  IGNORED_COLLECTIONS,
  ACCEPTED_COLLECTIONS,
  IGNORED_DATA
}

import xml2js from 'xml2js'
import { promisify } from 'es6-promisify'
import { length, map, pipe, head, find, pathEq, prop, path, uniq, range } from 'ramda'
import JSZip from 'jszip'

export const parseXml = xml => {

  var parseString = promisify(xml2js.parseString);

  return parseString(xml)
    .then(result => {
      const getRootObj = path(['DentalContainer', 'Object'])

      if (!getRootObj(result)) {
        return { units: '', type: '', orderComments: '', orderItems: [], orderManufacturer: '', orderFirstname: '', orderLastname: '', isValid: false  }
      }

      const getMainObj = pipe( getRootObj, head, prop('Object') )

      const getModelList = pipe( getMainObj, find(pathEq(['$', 'name'], 'ModelElementList')), prop('List'), head, prop('Object') )

      const modelList = getModelList(result)

      const getModelPropertyByName = name => modelList.map(x => getPropertyByName(name, prop('Property', x)))

      const orderList = getMainObj(result)

      const getItemOrder = pipe( head, prop('List'), head, prop('Object'), head, prop('Property') )
      const getModelElementList = pipe( head, prop('List'), head, prop('Object'), head, prop('Property') )

      const itemOrder = getItemOrder(orderList)

      const getPropertyByName = (name, properties) => pipe( find(pathEq(['$', 'name'], name)), path(['$', 'value']) )(properties)

      const teeth = getModelPropertyByName('Items')

      const numRegex = /\d*\S*\d+$/

      const teethNumsStr = teeth.map(x => {
        const teethNums = numRegex.exec(x)
        if (teethNums) {
          return teethNums[0]
        }
      }).filter(x => !!x);

      const restoType = getPropertyByName('Items',itemOrder)
      const orderComments = getPropertyByName('OrderComments',itemOrder)
      const orderItems = getPropertyByName('Items',itemOrder)
      const orderManufacturer = getPropertyByName('ManufName',itemOrder)
      const orderFirstname = getPropertyByName('Patient_FirstName',itemOrder)
      const orderLastname = getPropertyByName('Patient_LastName',itemOrder)

      const getUnitRanges = itms => itms.split(' ').reduce((acc, item) => {
        if (item.includes('-')) {
          const workingItem = item.replace(/,/g, '').split('-')
          const workingNumbersStart = workingItem[0].replace(/,/g, '')
          const workingNumbersEnd = workingItem[1].replace(/,/g, '')
          return acc.concat(
            range(Number(workingNumbersStart), Number(workingNumbersEnd))
              .map(String)
              .concat(workingNumbersEnd)
          )
        }
        return acc
      }, [])

      const units = orderItems.includes('-') ? uniq(getUnitRanges(orderItems)) : uniq(orderItems.match(/\d+/g))

      let type = restoType.split(' ')[0]
      if (restoType.includes('Crown')) {
        type = 'Full Crown'
      } else if (restoType.includes('Anatomy Bridge')) {
        type = 'Full Crown Bridge'
      } else if (restoType.includes('Frame Bridge')) {
        type = 'Coping Bridge'
      } else if (restoType.includes('Anatomical Coping') || restoType.includes('Anatomy')) {
        type = 'Anatomical Coping'
      } else if (restoType.includes('Inlay')) {
        type = 'Inlay'
      } else if (restoType.includes('Artificial')) {
        type = 'Dentures'
      }

      const isValid = type && length(units)

      return { units: teethNumsStr, type, notes: [ orderComments ], units, orderManufacturer, orderFirstname, orderLastname, isValid }

    })
    .catch(err => console.log(err))

}

export const dropStlFile = (accept, acceptStl) => {
  const reader = new FileReader();
  reader.onload = () => {
    acceptStl(accept, reader.result);
  };
  reader.readAsDataURL(accept);
}

export const dropXmlFile = (accept, acceptXml) => {
  const reader = new FileReader()
  reader.readAsText(accept)
  reader.onload = () => {
    parseXml(reader.result)
      .then(jsonFromXML => acceptXml(accept, jsonFromXML))
  };
}

export const dropZipFile = (accept, acceptZip) => {
  const new_zip = new JSZip()
  const reader = new FileReader()
  new_zip.loadAsync(accept)
    .then(zip => {
      const strippedName = accept.name.split('.').slice(0, -1).join('')
      const xmlName = strippedName + '/' + strippedName + '.xml'

      const bestGuess = zip.file(xmlName)
      if (bestGuess) {
        const promised = zip.file(xmlName).async('string')

        promised
          .then(xml => parseXml(xml))
          .then(jsonFromXML => acceptZip(accept, jsonFromXML))
      } else {
        const xmlFiles = Object.keys(zip.files).filter((fileName, idx) => {
          if (/\.xml$/.test(fileName)) {
            const fileTest = fileName.split('/')[1]
            const xmlFileTest = fileTest.replace('.xml', '')
            const originalFile = strippedName.split(' ')[0]
            const firstFewCharsEq = xmlFileTest.slice(0, 8) === originalFile.slice(0,8)
            return xmlFileTest.includes(originalFile) || firstFewCharsEq
          }
          return false
        })
      const nextXmlName = xmlFiles[0]
      const nextBestGuess = zip.file(nextXmlName)
      if (nextBestGuess) {
        zip.file(nextXmlName).async('string')
          .then(xml => {
            const jsonFromXML = parseXml(xml)
            acceptZip(accept, jsonFromXML);
          })
      } else {
        const jsonFromXML = { units: '', type: '', orderComments: '', orderItems: [], orderManufacturer: '', orderFirstname: '', orderLastname: '', isValid: false  }
        acceptZip(accept, jsonFromXML);
      }
    }
  })
}

export const isMobile = () => {
  if (navigator.userAgent.match(/Mobi/)) {
    return true;
  }

  if ('screen' in window && window.screen.width < 1081) {
    return true;
  }

  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection && connection.type === 'cellular') {
    return true;
  }

  return false;
}

export const DESIGN_TYPES = [
  { label: 'Full Crown', value: 'Full Crown', },
  { label: 'Coping', value: 'Coping', },
  { label: 'Anatomical Coping', value: 'Anatomical Coping', },
  { label: 'Full Crown Bridge', value: 'Full Crown Bridge', },
  { label: 'Coping Bridge', value: 'Coping Bridge', },
  { label: 'Inlay', value: 'Inlay', },
  { label: 'Onlay', value: 'Onlay', },
  { label: 'Model', value: 'Model' },
  { label: 'Dentures', value: 'Dentures' },
]
export const CONTACT_TYPES = [
  { label: '+0.05 mm Open Contact', value: '+0.05 mm Open Contact' },
  { label: '+0.04 mm Open Contact', value: '+0.04 mm Open Contact' },
  { label: '+0.03 mm Open Contact', value: '+0.03 mm Open Contact' },
  { label: '+0.025 mm Open Contact', value: '+0.025 mm Open Contact' },
  { label: '+0.10 mm Open Contact', value: '+0.10 mm Open Contact' },
  { label: '+0.00 mm', value: '+0.00 mm' },
  { label: '-0.01 mm', value: '-0.01 mm' },
  { label: '-0.02 mm', value: '-0.02 mm' },
  { label: '-0.025 mm', value: '-0.025 mm' },
  { label: '-0.03 mm', value: '-0.03 mm' },
  { label: '-0.035 mm', value: '-0.035 mm' },
  { label: '-0.04 mm', value: '-0.04 mm' },
  { label: '-0.045 mm', value: '-0.045 mm' },
  { label: '-0.05 mm', value: '-0.05 mm' },
  { label: '-0.06 mm', value: '-0.06 mm' },
  { label: '-0.07 mm', value: '-0.07 mm' },
  { label: '-0.08 mm', value: '-0.08 mm' },
  { label: '-0.09 mm', value: '-0.09 mm' },
  { label: '-0.10 mm', value: '-0.10 mm' },
  { label: '-0.20 mm', value: '-0.20 mm' },
]
export const OCCLUSION_TYPES = [
  { label: '+0.10 mm Supra Occlusion', value: '+0.10 mm Supra Occlusion' },
  { label: '+0.04 mm Supra Occlusion', value: '+0.04 mm Supra Occlusion' },
  { label: '0.00 mm OUT of Occlusion', value: '0.00 mm OUT of Occlusion' },
  { label: '-0.07 mm OUT of Occlusion', value: '-0.07 mm OUT of Occlusion' },
  { label: '-0.08 mm OUT of Occlusion', value: '-0.08 mm OUT of Occlusion' },
  { label: '-0.10 mm OUT of Occlusion', value: '-0.10 mm OUT of Occlusion' },
  { label: '-0.12 mm OUT of Occlusion', value: '-0.12 mm OUT of Occlusion' },
  { label: '-0.15 mm OUT of Occlusion', value: '-0.15 mm OUT of Occlusion' },
  { label: '-0.20 mm OUT of Occlusion', value: '-0.20 mm OUT of Occlusion' },
  { label: '-0.25 mm OUT of Occlusion', value: '-0.25 mm OUT of Occlusion' },
  { label: '-0.30 mm OUT of Occlusion', value: '-0.30 mm OUT of Occlusion' },
  { label: '-0.32 mm OUT of Occlusion', value: '-0.32 mm OUT of Occlusion' },
  { label: '-0.35 mm OUT of Occlusion', value: '-0.35 mm OUT of Occlusion' },
  { label: '-0.37 mm OUT of Occlusion', value: '-0.37 mm OUT of Occlusion' },
  { label: '-0.40 mm OUT of Occlusion', value: '-0.40 mm OUT of Occlusion' },
  { label: '-0.45 mm OUT of Occlusion', value: '-0.45 mm OUT of Occlusion' },
  { label: '-0.50 mm OUT of Occlusion', value: '-0.50 mm OUT of Occlusion' },
  { label: '-0.60 mm OUT of Occlusion', value: '-0.60 mm OUT of Occlusion' },
  { label: '-0.70 mm OUT of Occlusion', value: '-0.70 mm OUT of Occlusion' },
  { label: '-0.80 mm OUT of Occlusion', value: '-0.80 mm OUT of Occlusion' },
  { label: '-0.90 mm OUT of Occlusion', value: '-0.90 mm OUT of Occlusion' },
  { label: '-1.00 mm OUT of Occlusion', value: '-1.00 mm OUT of Occlusion' },
]
export const PONTIC_TYPES = [
  { label: 'Conical', value: 'Conical' },
  { label: 'Hygenic', value: 'Hygenic' },
  { label: 'Modified Ridge Lap', value: 'Modified Ridge Lap' },
  { label: 'Ovate', value: 'Ovate' },
  { label: 'Saddle Ridge', value: 'Saddle Ridge' },
]
export const LINER_SPACER_TYPES = [
  { label: '0.030 mm - 30 Microns', value: '0.030 mm - 30 Microns' },
  { label: '0.020 mm - 20 Microns', value: '0.020 mm - 20 Microns' },
  { label: '0.010 mm - 10 Microns', value: '0.010 mm - 10 Microns' },
  { label: '0.040 mm - 40 Microns', value: '0.040 mm - 40 Microns' },
  { label: '0.050 mm - 50 Microns', value: '0.050 mm - 50 Microns' },
  { label: '0.060 mm - 60 Microns', value: '0.060 mm - 60 Microns' },
  { label: '0.005 mm - 05 Microns', value: '0.005 mm - 05 Microns' },
  { label: '0.00 mm - No Liner Spacer', value: '0.00 mm - No Liner Spacer' },
  { label: '0.015 mm - 15 Microns', value: '0.015 mm - 15 Microns' },
  { label: '0.150 mm - 150 Microns', value: '0.150 mm - 150 Microns' },
  { label: '0.200 mm - 200 Microns', value: '0.200 mm  200 Microns' },
  { label: '0.270 mm - 270 Microns', value: '0.270 mm -270 Microns' },
]

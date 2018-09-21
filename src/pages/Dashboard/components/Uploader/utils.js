import xml2js from 'xml2js'
import { promisify } from 'es6-promisify'
import { map, pipe, head, find, pathEq, prop, path, uniq, range } from 'ramda'
import JSZip from 'jszip'

export const parseXml = xml => {

  var parseString = promisify(xml2js.parseString);

  return parseString(xml)
    .then(result => {
      const getRootObj = path(['DentalContainer', 'Object'])

      if (!getRootObj(result)) {
        return { units: '', type: '', orderComments: '', orderItems: [], orderManufacturer: '', orderFirstname: '', orderLastname: ''  }
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

      console.log(orderItems);
      console.log(getUnitRanges(orderItems));

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

      return { units: teethNumsStr, type, notes: [ orderComments ], units, orderManufacturer, orderFirstname, orderLastname  }

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
            this.props.acceptZip(accept, jsonFromXML);
          })
      }
    }
  })
}

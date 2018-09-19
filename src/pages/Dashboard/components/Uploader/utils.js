import xml2js from 'xml2js'
import { promisify } from 'es6-promisify'
import { pipe, head, find, trim, replace, map, pathEq, prop, path, uniq } from 'ramda'

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

      const units = uniq(orderItems.match(/\d+/g))

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
      }

      return { units: teethNumsStr, type, notes: [ orderComments ], units, orderManufacturer, orderFirstname, orderLastname  }

    })
    .catch(err => console.log(err))

}

import JSZip from 'jszip'
import xml2js from 'xml2js'
import { pipe, head, propEq, match, find, trim, replace, findIndex, findLastIndex, mergeAll, flatten, map, filter, length, pathEq, prop, path, sort } from 'ramda'

const designTypes = [/crown/, /coping/, /anatomical coping/, /bridge/, /abutment/, /inlay/, /onlay/, /model/]

export const parseXml = xml => {

  var parseString = xml2js.parseString;

  console.log(xml);

  parseString(xml, function (err, result) {
    if (err) {

    }
    const getRootObj = path(['DentalContainer', 'Object'])
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

    const restoTypes = pipe( map(replace(/\d*\S*\d+$/, '')), map(trim) )(teeth)
    const orderComments = getPropertyByName('OrderComments',itemOrder)
    const orderItems = getPropertyByName('Items',itemOrder)
    const orderManufacturer = getPropertyByName('ManufName',itemOrder)
    const orderFirstname = getPropertyByName('Patient_FirstName',itemOrder)
    const orderLastname = getPropertyByName('Patient_LastName',itemOrder)

    return { units: teethNumsStr, type: restoTypes, orderComments, orderItems, orderManufacturer, orderFirstname, orderLastname  }
    console.log(restoTypes);
  });


}

import JSZip from 'jszip'
import xmljs from 'xml-js'
import { reverse, symmetricDifference, curry, reduce, assoc, keys, find, mergeAll, flatten, map, filter, length, pathEq, prop, path, sort } from 'ramda'

const designTypes = [/Crown/, /Coping/, /Anatomical Coping/, /bridge/, /Abutment/, /Inlay/, /Onlay/, /Model/]

const renameKeys = curry((keysMap, obj) =>
  reduce((acc, key) => assoc(keysMap[key] || key, obj[key], acc), {}, keys(obj))
)


export const parseXml = xml => {
  const jsObj = xmljs.xml2js(xml, { compact: true })

  const mainObject = jsObj.DentalContainer.Object.Object
  const itemOrders = jsObj.DentalContainer.Object.Object[0]

  const modelElementList = mainObject.filter(pathEq(['_attributes', 'name'], 'ModelElementList'))[0]
  const itemModelList =
    modelElementList.List.Object
      .map(model => model.Property
        .map(({ _attributes: { name, value } }) => name === 'Items' ? value : null, {})
        .filter(x => !!x)
      )

  //find(propEq('name', 'Items'), itemOrder)
  //
  // const objNames = tdmContainerEls.map(obj => obj.attributes.name)
  // const idx = objNames.indexOf('ToothElementList')
  // const mainContainer = tdmContainerEls[idx]
  // const toothElementList = flatten(mainContainer.elements.map(el => el.elements.filter(el => el.attributes)))
  // const propList = flatten(toothElementList.map(el => el.elements))
  //
  // const hasToothNums = pathEq(['attributes', 'name'], 'ToothNumber')
  // const hasDesignType = pathEq(['attributes', 'name'], 'CacheToothTypeClass')

  // const toothNumbers = map(path(['attributes', 'value']), filter(hasToothNums, propList))
  // const designTypes = map(path(['attributes', 'value']), filter(hasDesignType, propList))
  // const teDesignType = length(designTypes) ? designTypes[0] : ''
  // let restoType = teDesignType
  // if (teDesignType.indexOf('te') === 0) {
  //   restoType = teDesignType.replace('te', '')
  // }

  // const parsedToothNumbers = map(parseInt, toothNumbers)
  // const sortedParsedToothNumbers = sort((a,b) => a > b, parsedToothNumbers)
  // let sortedToothNumbers = sortedParsedToothNumbers;
  // if (toothNumbers) {
  //   sortedToothNumbers = map(String, sortedParsedToothNumbers)
  // }
  // console.log(sortedToothNumbers);
  //
  // const jsonFromXML = {
  //   units: sortedToothNumbers,
  //   type: restoType
  // }

  return { units: [], type: '' }
}

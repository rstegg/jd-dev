import JSZip from 'jszip'
import xmljs from 'xml-js'
import { flatten, map, filter, length, pathEq, prop, path, sort } from 'ramda'

export const parseXml = xml => {
  const jsObj = xmljs.xml2js(xml, { compact: false })

  const tdmContainerEls = jsObj.elements[0].elements[0].elements

  const objNames = tdmContainerEls.map(obj => obj.attributes.name)
  const idx = objNames.indexOf('ToothElementList')
  const mainContainer = tdmContainerEls[idx]
  const toothElementList = flatten(mainContainer.elements.map(el => el.elements.filter(el => el.attributes)))
  const propList = flatten(toothElementList.map(el => el.elements))

  const hasToothNums = pathEq(['attributes', 'name'], 'ToothNumber')
  const hasDesignType = pathEq(['attributes', 'name'], 'CacheToothTypeClass')

  const toothNumbers = map(path(['attributes', 'value']), filter(hasToothNums, propList))
  const designTypes = map(path(['attributes', 'value']), filter(hasDesignType, propList))
  const teDesignType = length(designTypes) ? designTypes[0] : ''
  let restoType = teDesignType
  if (teDesignType.indexOf('te') === 0) {
    restoType = teDesignType.replace('te', '')
  }

  const parsedToothNumbers = map(parseInt, toothNumbers)
  const sortedParsedToothNumbers = sort((a,b) => a > b, parsedToothNumbers)
  let sortedToothNumbers = sortedParsedToothNumbers;
  if (toothNumbers) {
    sortedToothNumbers = map(String, sortedParsedToothNumbers)
  }
  console.log(sortedToothNumbers);

  const jsonFromXML = {
    units: sortedToothNumbers,
    type: restoType
  }

  return jsonFromXML
}

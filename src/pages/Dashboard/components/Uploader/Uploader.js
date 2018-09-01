import React, { Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import filext from 'file-extension'
import JSZip from 'jszip'
import { flatten, map, filter, length, pathEq, prop, path } from 'ramda'

import Dropzone from 'react-dropzone'

import UploadFiles from './UploadFiles'
import { acceptStl, acceptXml, acceptZip, acceptGeneric, rejectUpload } from './actions/products'

import { parseXml } from './utils'

class Uploader extends Component {
  constructor() {
    super()
    this.state = {
      dropzoneActive: false
    }
  }
  onDragEnter = () => {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave = () => {
    this.setState({
      dropzoneActive: false
    });
  }
  render() {

    const overlayStyle = {
      position: 'fixed',
      pointerEvents: 'auto',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: '2.5em 0',
      background: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
      color: '#fff',
      zIndex: 100000
    };

    const { files, products, options, productTypes, allProducts, isLoading, errors } = this.props

    const uploadedFiles = files.accepted.length && products.length ?
      <UploadFiles
        files={files.accepted}
        products={products}
        productTypes={productTypes}
        allProducts={allProducts}
        options={options}
        isLoading={isLoading}
        errors={errors} /> : null

    return (
      <Dropzone
        disableClick
        name='file'
        style={{position: "relative"}}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDrop={(accepted, rejected) => {
          this.setState({
            dropzoneActive: false
          })
          accepted.forEach(accept => {
            switch (filext(accept.name)) {
              case 'stl':
                const reader = new FileReader();
                reader.onload = () => {
                  this.props.acceptStl(accept, reader.result);
                };
                reader.readAsDataURL(accepted);
                break;
              case 'xml':
                this.props.acceptXml(accept);
                break;
              case 'zip':
              const new_zip = new JSZip()
              new_zip.loadAsync(accept)
                .then(zip => {
                  const strippedName = accept.name.split('.').slice(0, -1).join('')
                  const xmlName = strippedName + '/' + strippedName + '.xml'

                  const bestGuess = zip.file(xmlName)
                  if (bestGuess) {
                    const promised = zip.file(xmlName).async('string')

                    promised
                      .then(xml => {
                        const jsonFromXML = parseXml(xml)

                        this.props.acceptZip(accept, jsonFromXML);
                      })
                  } else {
                    const allFilenames = map(file => file.name, zip.files)
                    const xmlFiles = Object.keys(zip.files).filter((fileName, idx) => {
                      if (/\.xml$/.test(fileName)) {
                        const xmlFileTest = fileName.split('/')[1].replace('.xml', '')
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
                this.props.acceptZip(accept);
                break;
              default:
                this.props.acceptGeneric(accept)
                break;
            }
          })
          rejected.forEach(reject => {
            this.props.rejectUpload(reject)
          })
        }}
      >
        <div>
          { this.state.dropzoneActive && <div style={overlayStyle}><img src="https://cdn.shopify.com/s/files/1/0935/7892/files/dropper.png?11094828472765099266" alt="DropperImage" width="590" height="400" /></div> }
          <div className="layout ant-layout">
            <div className="ant-layout-content" style={{ margin: '24px 16px' }}>
              <div className="dropzone">
                <Dropzone
                  onDrop={(accepted, rejected) => {
                    this.setState({
                      dropzoneActive: false
                    })
                    accepted.forEach(accept => {
                      const reader = new FileReader();
                      switch (filext(accept.name)) {
                        case 'stl':
                          reader.onload = () => {
                            this.props.acceptStl(accept, reader.result);
                          };
                          reader.readAsDataURL(accept);
                          break;
                        case 'xml':
                          const xml = reader.readAsText(accept);
                          const jsonFromXML = parseXml(accept)
                          this.props.acceptXml(accept, jsonFromXML);
                          break;
                        case 'zip':
                          const new_zip = new JSZip()
                          new_zip.loadAsync(accept)
                            .then(zip => {
                              const strippedName = accept.name.split('.').slice(0, -1).join('')
                              const xmlName = strippedName + '/' + strippedName + '.xml'

                              const bestGuess = zip.file(xmlName)
                              if (bestGuess) {
                                const promised = zip.file(xmlName).async('string')

                                promised
                                  .then(xml => {
                                    const jsonFromXML = parseXml(xml)

                                    this.props.acceptZip(accept, jsonFromXML);
                                  })
                              } else {
                                const allFilenames = map(file => file.name, zip.files)
                                const xmlFiles = Object.keys(zip.files).filter((fileName, idx) => {
                                  if (/\.xml$/.test(fileName)) {
                                    const xmlFileTest = fileName.split('/')[1].replace('.xml', '')
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
                          break;
                        default:
                          this.props.acceptGeneric(accept)
                          break;
                      }
                    })
                    rejected.forEach(reject => {
                      this.props.rejectUpload(reject)
                    })
                  }}
                  className="ant-upload ant-upload-drag"
                 >
        	       <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                   <span className="fa fa-5x fa-cloud-upload" />
                   <p>Drag & Drop case files here to create new orders</p>
                 </div>
        	     </Dropzone>
        	   </div>
        	   <aside>
               {uploadedFiles}
             </aside>
          </div>
        </div>
      </div>
    </Dropzone>
    )
  }
}

const mapStateToProps = ({
  files,
  products,
  options,
  productTypes,
  allProducts,
  errors,
  redirects: {
    isLoading,
  }
}) => ({
  files,
  products,
  options,
  productTypes,
  allProducts,
  errors,
  isLoading
})

const mapDispatchToProps = dispatch => ({
  acceptStl: (accepted, stl) => dispatch(acceptStl(accepted, stl)),
  acceptXml: (accepted, xml) => dispatch(acceptXml(accepted, xml)),
  acceptZip: (accepted, zip) => dispatch(acceptZip(accepted, zip)),
  acceptGeneric: accepted => dispatch(acceptGeneric(accepted)),
  rejectUpload: rejected => dispatch(rejectUpload(rejected)),
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader))

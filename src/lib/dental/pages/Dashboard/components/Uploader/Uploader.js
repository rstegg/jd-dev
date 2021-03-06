import React, { Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import filext from 'file-extension'

import Dropzone from 'react-dropzone'

import UploadFiles from './UploadFiles'
import { acceptStl, acceptXml, acceptZip, acceptGeneric, rejectUpload } from './actions/products'

import { parseXml, dropStlFile, dropZipFile, dropXmlFile } from './utils'

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

    const { files, products, isLoading, errors } = this.props

    const uploadedFiles = files.accepted.length && products.length ?
      <UploadFiles
        files={files.accepted}
        products={products}
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
                dropStlFile(accept, this.props.acceptStl)
                break;
              case 'xml':
                dropXmlFile(accept, this.props.acceptXml)
                break;
              case 'zip':
                dropZipFile(accept, this.props.acceptZip)
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
                      switch (filext(accept.name)) {
                        case 'stl':
                          dropStlFile(accept, this.props.acceptStl)
                          break;
                        case 'xml':
                          dropXmlFile(accept, this.props.acceptXml)
                          break;
                        case 'zip':
                          dropZipFile(accept, this.props.acceptZip)
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
                   <p>Drag & Drop Scan Files here to create new orders</p>
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
  errors,
  redirects: {
    isLoading,
  }
}) => ({
  files,
  products,
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

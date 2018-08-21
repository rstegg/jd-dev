import React, { Component} from 'react'
import { connect } from 'react-redux'

import UploadFiles from './UploadFiles'
import { acceptUpload, rejectUpload, fetchTypes } from './actions/products'

import Dropzone from 'react-dropzone'

class Uploader extends Component {
  constructor() {
    super()
    this.state = {
      dropzoneActive: false
    }
  }
  componentWillMount() {
    this.props.fetchTypes()
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
        accept='.stl'
        disableClick
        style={{position: "relative"}}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDrop={(accepted, rejected) => {
          this.setState({
            dropzoneActive: false
          })
          accepted.forEach(accept => {
            this.props.acceptUpload(accept)
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
                  accept='.stl'
                  onDrop={(accepted, rejected) => {
                    this.setState({
                      dropzoneActive: false
                    })
                    accepted.forEach(accept => {
                      this.props.acceptUpload(accept)
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
  acceptUpload: accepted => dispatch(acceptUpload(accepted)),
  rejectUpload: rejected => dispatch(rejectUpload(rejected)),
  fetchTypes: () => dispatch(fetchTypes())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader)
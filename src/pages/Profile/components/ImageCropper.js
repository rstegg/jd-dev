import React, { Component } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { Modal } from 'antd'

class ImageCropper extends Component {
  onSave = () => {
    const { uploadImage, closeCropper } = this.props
    this.editor.getImageScaledToCanvas().toBlob(blob => {
      uploadImage(blob)
      closeCropper()
    })
  }
  render() {
    const { image, isOpen, closeCropper } = this.props
    if (!isOpen) {
      return null
    }
    return (
      <Modal
        visible={isOpen}
        title='Position and size your photo'
        style={{ textAlign: 'center' }}
        onOk={this.onSave}
        onCancel={closeCropper}
        >
          <AvatarEditor
            ref={ref => { this.editor = ref }}
            image={image}
            width={300}
            height={300}
            border={50}
            color={[ 255, 255, 255, 0.6 ]}
            scale={1}
          />
      </Modal>
    )
  }
}

export default ImageCropper

import React, { Component } from 'react'
import { Upload, Icon, message } from 'antd';

import './Styles.css'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type.includes('image/');
  if (!isJPG) {
    message.error('You can only upload Image file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class AvatarUpload extends Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          loading: false,
        })
        if (info.file.response) {
          this.props.openProfileCropper(imageUrl)
        }
      });



    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl || this.props.user.image || this.props.profile.image;
    return (
      <Upload
        accept='image/*'
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`/api/v1/upload/profile`}
        headers={{ authorization: this.props.user.token }}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}

export default AvatarUpload

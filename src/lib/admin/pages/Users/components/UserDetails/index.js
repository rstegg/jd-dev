import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd'
import { Redirect } from 'react-router-dom'

import AvatarUpload from './components/AvatarUpload'
import ImageCropper from './components/ImageCropper'

import ProfileForm from './form'

import { onProfileSubmit, openProfileCropper, closeProfileCropper, uploadProfileImage, onUploadProfileImageFailure } from './actions/profile'

class ProfileView extends Component {
  render() {
    const {
      onProfileSubmit,
      openProfileCropper,
      closeProfileCropper,
      uploadProfileImage,
      onUploadProfileImageFailure,
      profile,
      user
    } = this.props
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', marginBottom: '50px' }}>
        <Card
          style={{ width: 500 }}
          title="Edit User Profile">
          <AvatarUpload profile={profile} user={user} openProfileCropper={openProfileCropper} onUploadProfileImageFailure={onUploadProfileImageFailure} />
          <ProfileForm onSubmit={profile => onProfileSubmit(profile, user.token)} />
        </Card>
        <ImageCropper isOpen={profile.isCropperOpen} image={profile.imagePreview} uploadImage={img => uploadProfileImage(img, user.token)} closeCropper={closeProfileCropper} />
      </div>
    )
  }
}

const mapStateToProps = ({ profile }) =>
({
  profile
})

const mapDispatchToProps = dispatch =>
({
  onProfileSubmit: (profile, token) => dispatch(onProfileSubmit(profile, token)),
  openProfileCropper: img => dispatch(openProfileCropper(img)),
  closeProfileCropper: () => dispatch(closeProfileCropper()),
  uploadProfileImage: (img, token) => dispatch(uploadProfileImage(img, token)),
  onUploadProfileImageFailure: () => dispatch(onUploadProfileImageFailure()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileView)

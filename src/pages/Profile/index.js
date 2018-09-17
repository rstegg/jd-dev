import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Avatar, Tag, Dimmer, Spin } from 'antd'
import { Redirect } from 'react-router-dom'

import AvatarUpload from './components/AvatarUpload'
import ImageCropper from './components/ImageCropper'

import ProfileForm from './form'

import { onProfileSubmit, switchToProfileUser, openProfileCropper, closeProfileCropper, uploadProfileImage, onUploadProfileImageFailure, editProfileField } from './actions/profile'

class ProfileView extends Component {
  render() {
    const {
      onProfileSubmit,
      editProfileField,
      openProfileCropper,
      closeProfileCropper,
      uploadProfileImage,
      onUploadProfileImageFailure,
      switchToProfileUser,
      profile,
      user
    } = this.props
    if (!user.isAuthenticated) {
      return <Redirect to='/login' from='/profile' />
    }
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', marginBottom: '50px' }}>
        <Card
          style={{ width: 500 }}
          title="Edit Profile">
          <AvatarUpload profile={profile} user={user} openProfileCropper={openProfileCropper} onUploadProfileImageFailure={onUploadProfileImageFailure} />
          <ProfileForm onSubmit={profile => onProfileSubmit(profile, user.token)} />
        </Card>
        <ImageCropper isOpen={profile.isCropperOpen} image={profile.imagePreview} uploadImage={img => uploadProfileImage(img, user.token)} closeCropper={closeProfileCropper} />
      </div>
    )
  }
}

const mapStateToProps = ({ user, profile }) =>
({
  user,
  profile,
})

const mapDispatchToProps = dispatch =>
({
  onProfileSubmit: (profile, token) => dispatch(onProfileSubmit(profile, token)),
  openProfileCropper: img => dispatch(openProfileCropper(img)),
  closeProfileCropper: () => dispatch(closeProfileCropper()),
  uploadProfileImage: (img, token) => dispatch(uploadProfileImage(img, token)),
  onUploadProfileImageFailure: () => dispatch(onUploadProfileImageFailure()),
  switchToProfileUser: () => dispatch(switchToProfileUser()),
  editProfileField: field => dispatch(editProfileField(field))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileView)

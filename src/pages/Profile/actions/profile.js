import su from 'superagent'
import { path } from 'ramda'
import { SubmissionError } from 'redux-form'

export const uploadProfileImage = (image, token) =>
  dispatch => {
    dispatch(onUploadProfileImage(image))
    return su.post(`/api/v1/upload/profile`)
      .accept('application/json')
      .attach('file', image)
      .set('Authorization', token)
      .then(res => dispatch(onUploadProfileImageSuccess(res)))
      .catch(err => console.log(err))
  }

export const onUploadProfileImage = (image) =>
({
  type: 'UPLOAD_PROFILE_IMAGE',
  payload: {
    image
  }
})

export const openProfileCropper = image =>
({
  type: 'OPEN_PROFILE_CROPPER',
  payload: {
    image
  }
})

export const closeProfileCropper = () =>
({
  type: 'CLOSE_PROFILE_CROPPER'
})

export const switchToProfileAdmin = () =>
({
  type: 'SWITCH_TO_PROFILE_ADMIN'
})

export const switchToProfileUser = () =>
({
  type: 'SWITCH_TO_PROFILE_USER'
})


export const onUploadProfileImageFailure = () =>
({
  type: 'UPLOAD_PROFILE_IMAGE_FAILURE'
})

export const onUploadProfileImageSuccess = res =>
({
  type: 'UPLOAD_PROFILE_IMAGE_SUCCESS',
  payload: {
    image: res.body.image
  }
})

export const fetchProfile = (username, user) =>
({
  type: 'FETCH_PROFILE',
  payload: {
    username,
    token: user.token
  }
})

export const onFetchProfileSuccess = res =>
({
  type: 'FETCH_PROFILE_SUCCESS',
  payload: {
    profile: res.body.profile
  }
})

export const editProfileField = field =>
({
  type: 'EDIT_PROFILE_FIELD',
  payload: {
    field
  }
})

export const onProfileSubmit = (profile, token) =>
  dispatch => {
    dispatch(onEditProfile(profile))
    return su.put(`/api/v1/user`)
      .accept('application/json')
      .set('Authorization', token)
      .send({ profile })
      .then(res => dispatch(onEditProfileSuccess(res)))
      .catch(err => console.log(err))
  }

export const onEditProfile = profile =>
({
  type: 'EDIT_PROFILE',
  payload: {
    profile
  }
})

export const onEditProfileSuccess = res =>
({
  type: 'EDIT_PROFILE_SUCCESS',
  payload: {
    user: res.body.profile
  }
})

export const refreshProfile = () =>
({
  type: 'REFRESH_PROFILE'
})

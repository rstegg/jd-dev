import React, { Component } from 'react'
import { connect } from 'react-redux'

import RouterButton from '../../elements/RouterButton'

import { Card, Image } from 'antd'
import { fetchProfile, refreshProfileEditing } from '../../redux/actions/profile'

import RootLayout from '../../components/layouts/Root'

class ViewProfile extends Component {
  componentWillMount() {
    this.props.fetchProfile(this.props.match.params.id, this.props.user)
    this.props.refreshProfileEditing()
  }
  render() {
    const { user, profile } = this.props
    return (
      <RootLayout>
        <Card>
          <Image src={profile.image || '/images/placeholder.png'} className='profimg' />
          <Card.Content>
            <Card.Header>{profile.name}</Card.Header>
            <Card.Description>{profile.bio || 'New user'}</Card.Description>
          </Card.Content>
          {profile.userId === user.id && <Card.Content extra>
            <RouterButton to="/profile/edit" from="/profile" label="Edit" />
          </Card.Content>}
        </Card>
      </RootLayout>
    )
  }
}

const mapStateToProps = ({user, profile}) =>
({
  user,
  profile
})

const mapDispatchToProps = dispatch =>
({
  fetchProfile: (id, user) => dispatch(fetchProfile(id, user)),
  refreshProfileEditing: () => dispatch(refreshProfileEditing())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProfile)

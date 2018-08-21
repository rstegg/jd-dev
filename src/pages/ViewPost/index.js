import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Redirect, NavLink } from 'react-router-dom'
import { Card, Image, Label } from 'antd'
import RootLayout from '../../components/layouts/Root'
import RouterButton from '../../elements/RouterButton'

import PostMenu from '../../components/PostMenu'

import { fetchSinglePost, deletePost } from '../../redux/actions/posts'

const renderAmount = (amt_type, amt) =>
  amt_type === 'fixed' ? `Price: ${amt}` : 'Open donation'

class ViewPost extends Component {
  componentWillMount() {
    const { match: { params }, fetchSinglePost, user } = this.props
    fetchSinglePost(params.id, user)
  }
  render() {
    const { post, user, deletePost } = this.props
    if(!post) {
      return <Redirect to='/' />
    }
      return (
        <RootLayout>
          <Card>
            <Image src={post.image || '/images/postholder.png'} className='post--image' />
            <Card.Content>
              <Card.Header>{post.name}</Card.Header>
              {post.user &&
                <NavLink to={`/user/${post.user.username}`} from={`/post/${post.slug}`}>
                  started by <Image avatar src={post.user.image || '/images/placeholder.png'} /> {post.user.username}
                </NavLink>
              }
              <Card.Meta>{renderAmount(post.amount_type, post.amount)}, ${post.raised} raised</Card.Meta>
              <Card.Description>{post.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              { post.userId === user.id ?
                <RouterButton to={`/posts/edit/${post.slug}`} from={`/post/${post.slug}`} label='Edit' />
                :
                <RouterButton to={`/payments/new/${post.slug}`} from={`/post/${post.slug}`} label='Show some post' />
              }
              { post.userId === user.id &&
                <button onClick={() => deletePost(post.id, user)}>
                  <Label basic>Delete</Label>
                </button>
              }
            </Card.Content>
          </Card>
          <PostMenu url={`https://postwau.io/post/${post.slug}`} postId={post.id} />
        </RootLayout>
      )
  }
}

const mapStateToProps = ({posts, user}) =>
({
  post: posts.current,
  user,
})

const mapDispatchToProps = dispatch =>
({
  fetchSinglePost: (id, user) => dispatch(fetchSinglePost(id, user)),
  deletePost: (id, user) => dispatch(deletePost(id, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPost)

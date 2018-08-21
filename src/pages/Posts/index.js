import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'antd'
import PostsList from './list'
import RouterButton from '../../elements/RouterButton'

import { fetchPosts, refreshPosts, setCurrentPost } from '../../redux/actions/posts'

import RootLayout from '../../components/layouts/Root'

class Posts extends Component {
  componentDidMount() {
    if(this.props.user.isAuthenticated) {
      this.props.fetchPosts(this.props.user)
    }
    this.props.refreshPosts()
  }
  render() {
    const { posts, setCurrentPost, user } = this.props
    if(!user.isAuthenticated) {
      return <Redirect to="/login" from="/posts" />
    }
    return (
      <RootLayout>
        <Card className='posts'>
          <Card.Content>
            <Card.Header>Posts</Card.Header>
          </Card.Content>
          <Card.Content>
              <PostsList
                posts={posts.list}
                setCurrentPost={setCurrentPost}
              />
          </Card.Content>
          <Card.Content extra>
            <RouterButton to='/posts/new' from='/posts' label='start a post' />
          </Card.Content>
        </Card>
      </RootLayout>
    )
  }
}
const mapStateToProps = ({posts, user}) =>
({
  posts,
  user
})

const mapDispatchToProps = dispatch =>
({
  fetchPosts: user => dispatch(fetchPosts(user)),
  refreshPosts: () => dispatch(refreshPosts()),
  setCurrentPost: Post => dispatch(setCurrentPost(Post)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts)

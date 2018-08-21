import React from 'react'

import PostsItem from '../../elements/PostsItem'
import { Feed } from 'antd'

const PostsList =
({
  posts,
  setCurrentPost
}) =>
      <Feed>
      {posts.length ? posts.map((post, i) =>
        <PostsItem key={`post-${i}`} post={post} onClick={() => setCurrentPost(post)} />
      ) :
      <Feed.Event>
        <Feed.Label image='/images/postholder.png' />
        <Feed.Content content='No Posts!' />
      </Feed.Event>
      }
    </Feed>





export default PostsList

import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'
import store from '@/redux/store'

function Posts() {
  const {posts} = useSelector(store => store.post)
  return (
    <div className="px-4 md:px-16 py-4 md:py-4">
      {
        posts?.map((post) => (
          <Post key={post?._id} post={post} />
        ))
      }
    </div>
  )
}

export default Posts
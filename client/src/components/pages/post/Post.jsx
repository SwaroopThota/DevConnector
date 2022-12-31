import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getPost } from '../../../redux/postSlice'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = () => {
	const { id } = useParams(),
		dispatch = useDispatch(),
		{ loading, post } = useSelector((state) => state.posts),
		auth = useSelector((state) => state.auth)
	useEffect(() => {
		dispatch(getPost(id))
	}, [dispatch, id])

	return loading || post === null ? (
		'Loading...'
	) : (
		<section className='container'>
			<Link to='/posts' className='btn'>
				Back To Posts
			</Link>
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} dispatch={dispatch} />
			<div className='comments'>
				{post.comments.map((comment) => (
					<CommentItem
						key={comment._id}
						comment={comment}
						postId={post._id}
						dispatch={dispatch}
						auth={auth}
					/>
				))}
			</div>
		</section>
	)
}

export default Post

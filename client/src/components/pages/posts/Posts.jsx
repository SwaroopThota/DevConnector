import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../../redux/postSlice'
import PostForm from './PostForm'
import PostItem from './PostItem'

const Posts = () => {
	const dispatch = useDispatch(),
		{ posts, loading } = useSelector((state) => state.posts)
	useEffect(() => dispatch(getPosts()), [dispatch])
	return (
		<section className='container'>
			<h1 className='large text-primary'>Posts</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Welcome to the community
			</p>
			{loading ? (
				'Loading...'
			) : (
				<>
					<PostForm />
					<div className='posts'>
						{posts.map((post) => (
							<PostItem key={post._id} post={post} />
						))}
					</div>
				</>
			)}
		</section>
	)
}

export default Posts

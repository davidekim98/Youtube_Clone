import React, {useState, useEffect} from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function LikeDislikes(props) {
	
	let variable = {}
	
	if(props.video) {
		variable = {videoId: props.videoId, userId: localStorage.getItem('userId')}
	} else if(props.comment) {
		variable = {commentId: props.commentId, userId: localStorage.getItem('userId')}
	}
	
	const [Liked, setLiked] = useState(null)
	const [Disliked, setDisliked] = useState(null)
	const [LikeNum, setLikeNum] = useState(0)
	const [DislikeNum, setDislikeNum] = useState(0)
	
	useEffect(() => {
		Axios.post('/api/likedislikes/getLike', variable)
			.then(response => {
				if(response.data.success) {
					console.log(response.data)
					setLikeNum(response.data.likes.length)
					
					response.data.likes.map(like => {
						if(like.userId === props.userId) {
							setLiked('liked')
						}
					})
					
				} else {
					alert('좋아요 정보 가져오기 실패')
				}
				
			})
		
		Axios.post('/api/likedislikes/getDislike', variable)
			.then(response => {
				if(response.data.success) {
					console.log(response.data)
					setDislikeNum(response.data.dislikes.length)
					
					response.data.dislikes.map(dislike => {
						if(dislike.userId === props.userId) {
							setDisliked('disliked')
						}
					})
					
				} else {
					alert('싫어요 정보 가져오기 실패')
				}
				
			})
	}, [])
	
	
	const onLike = () => {
		
		if(Liked===null) {
			Axios.post('/api/likedislikes/like', variable)
			.then(response => {
				if(response.data.success) {
					console.log(response.data)
					setLiked('liked')
					setLikeNum(LikeNum+1)
				} else {
					alert('좋아요 실패')
				}
			})
			
			if(Disliked!==null) {
				setDislikeNum(DislikeNum-1)
				setDisliked(null)
			}
		} else if(Liked!==null) {
			Axios.post('/api/likedislikes/unlike', variable)
			.then(response => {
				if(response.data.success) {
					console.log(response.data)
					setLiked(null)
					setLikeNum(LikeNum-1)
				} else {
					alert('좋아요 삭제 실패')
				}
			})
		}
		
	}
	
	const onDislike = () => {
		
		if(Disliked===null) {
			Axios.post('/api/likedislikes/dislike', variable)
			.then(response => {
				if(response.data.success) {
					console.log(response.data)
					setDisliked('disliked')
					setDislikeNum(DislikeNum+1)
				} else {
					alert('싫어요 실패')
				}
			})
			
			if(Liked!==null) {
				setLikeNum(LikeNum-1)
				setLiked(null)
			}
		} else if(Disliked!==null) {
			Axios.post('/api/likedislikes/undislike', variable)
			.then(response => {
				if(response.data.success) {
					console.log(response.data)
					setDisliked(null)
					setDislikeNum(DislikeNum-1)
				} else {
					alert('싫어요 삭제 실패')
				}
			})
		}
		
	}
	
	
	return (
		<div>
			<span key="comment-basic-like">
				<Tooltip title="Like">
					<Icon type="like"
						theme={Liked === "liked" ? "filled" : "outlined"}
						onClick={onLike}
					/>
				</Tooltip>
			<span style={{paddingLeft: '8px', cursor: 'auto'}}>{LikeNum}</span>
			</span>
			
			
			
			<span key="comment-basic-dislike">
				<Tooltip title="Dislike">
					<Icon type="dislike"
						theme={Disliked === "disliked" ? "filled" : "outlined"}
						onClick={onDislike}
					/>
				</Tooltip>
			<span style={{paddingLeft: '8px', cursor: 'auto'}}>{DislikeNum}</span>
			</span>
		</div>
	)
}

export default LikeDislikes
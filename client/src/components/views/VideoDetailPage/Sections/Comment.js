import React, {useState} from 'react'
import Axios from 'axios'
import {useSelector} from 'react-redux'
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {
	
	const user = useSelector(state => state.user)
	
	const [CommentValue, setCommentValue] = useState("")
	
	const handleClick = (event) => {
		setCommentValue(event.currentTarget.value)
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		
		const variables = {
			content: CommentValue,
			writer: user.userData._id,
			postId: props.postId
		}
		
		Axios.post('/api/comment/saveComment', variables)
			.then(response => {
			if(response.data.success) {
				console.log(response.data.result)
				props.refreshFunction(response.data.result)
				setCommentValue("")
			} else {
				alert('댓글 저장 실패')
			}
		})
	}
	
	return (
		<div>
			<br/>
			<p>Replies</p>
			<hr/>
			
			{/*Comment Lists*/}
			
			{props.commentLists && 
				props.commentLists.map((comment, index) => (
					(!comment.responseTo &&
						<React.Fragment>
							<SingleComment 
								postId={props.postId}
								comment={comment}
								refreshFunction={props.refreshFunction}
							/>
							<ReplyComment 
								postId={props.postId}
								parentCommentId={comment._id}
								commentLists={props.commentLists}
								refreshFunction={props.refreshFunction}
							/>
						</React.Fragment>
					)
				))
			}
			
			{/*Root Comment Form */}
			{localStorage.getItem('userId') &&
			<form style={{display:'flex'}} onSubmit={onSubmit}>
				<textarea
					style={{width:'100%', borderRadius:'5px'}}
					onChange={handleClick}
					value={CommentValue}
					placeholder="댓글 작성"
				/>
				<br/>
				<button 
					style={{width:'20%', height:'52px'}} 
					onClick={onSubmit}
				>
					Submit
				</button>
			</form>
			}
			
		</div>
	)
}

export default Comment
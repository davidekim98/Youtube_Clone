import React, {useEffect, useState} from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {
	
	const [ChildCommentNumber, setChildCommentNumber] = useState(0)
	const [OpenReplyComments, setOpenReplyComments] = useState(false)
	
	useEffect(() => {
		let commentNumber = 0
		
		props.commentLists.map((comment) => {
			if(comment.responseTo === props.parentCommentId) {
				commentNumber++
			}
		})
		
		setChildCommentNumber(commentNumber)
		
	}, [props.commentLists, props.parentCommentId])
	
	let renderReplyComment = (parentCommentId) =>
		props.commentLists.map((comment, index) => (
				<React.Fragment>
					{comment.responseTo === parentCommentId &&
						<div style={{width:'80%', marginLeft:'40px'}}>
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
						</div>
					}
				</React.Fragment>
			)
		)
	
	const onHandleChange = () => {
		setOpenReplyComments(!OpenReplyComments)
	}
	
	return (
		<div>
			
			{ChildCommentNumber > 0 &&
				<div>	
					<p style={{ fontSize: '14px', margin: 0, color: 'gray' }}
                    onClick={onHandleChange} >
						View {ChildCommentNumber} more comment(s)
					</p>
				</div>
			}

			{OpenReplyComments &&
				<div>
					{renderReplyComment(props.parentCommentId)}
				</div>
			}
		
		</div>
	)
}

export default ReplyComment
import { useDispatch } from 'react-redux';
import {useState } from 'react';

import {createComment} from '../../../../store/comment';
import { loadPosts } from '../../../../store/post';


function CommentPost({postId}){
  const dispatch = useDispatch();
  const [comment, setComment] = useState('')

  const handleSubmit = (e) =>{
    e.preventDefault();
    const payload = {
      postId,
      comment
    }
    dispatch(createComment(payload))
    dispatch(loadPosts())
    setComment('')
  }

  const updateComment = (e) =>{
    setComment(e.target.value)
  }

  return (
    <form className="comment-form">
      <input
      type="text"
      name="comment"
      value={comment}
      placeholder="Add a comment... "
      onChange={updateComment}
      />
      <p onClick={handleSubmit} >Post</p>
    </form>
  )

}

export default CommentPost;

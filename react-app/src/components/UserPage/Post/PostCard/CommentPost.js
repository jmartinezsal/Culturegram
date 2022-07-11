import { useDispatch } from 'react-redux';
import {useEffect, useState } from 'react';

import {createComment} from '../../../../store/comment';
import { loadPosts } from '../../../../store/post';


function CommentPost({postId}){
  const dispatch = useDispatch();
  const [comment, setComment] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [length, setLength] = useState(0);

  useEffect(() =>{
    if(comment.length > 0 && comment.length <= 255){
      setDisabled(false)
    } else{
      setDisabled(true)
    }
    setLength(comment.length)
  },[comment.length])

  const handleSubmit = (e) =>{
    e.preventDefault();
    const payload = {
      postId,
      comment
    }
     dispatch(createComment(payload))
    dispatch(loadPosts())
    setComment('')
    setLength(0)
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
      minLength={1}
      maxLength={255}
      />
      <p className="length">{length}/255</p>
      <button onClick={handleSubmit} className={disabled ? "active" : ""}
      disabled={disabled}>Post</button>
    </form>
  )

}

export default CommentPost;

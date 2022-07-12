import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { updateComment } from '../../../../store/comment';
import { loadPosts } from '../../../../store/post';


function EditCommentModal({ currComment, setEditModal, setOptionsModal }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState(currComment.comment)
  const [disabled, setDisabled] = useState(true)
  const [length, setLength] = useState(currComment.comment.length);

  useEffect(() => {
    if (comment.length > 0 && comment.length <= 255) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
    setLength(comment.length)
  }, [comment.length])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      "id": currComment.id,
      comment
    }
    await dispatch(updateComment(payload))
    await dispatch(loadPosts())
    setOptionsModal(false)
    setEditModal(false)
  }

  const changeComment = (e) => {
    setComment(e.target.value)
  }

  return (
    <form className="comment-form">
      <input
        type="text"
        name="comment"
        value={comment}
        placeholder={currComment ? comment : "Add a comment... "}
        onChange={changeComment}
        minLength={1}
        maxLength={255}
      />
      <p className="length">{length}/255</p>
      <button onClick={handleSubmit} className={disabled ? "active" : ""}
        disabled={disabled}>Post</button>
    </form>
  )

}

export default EditCommentModal;

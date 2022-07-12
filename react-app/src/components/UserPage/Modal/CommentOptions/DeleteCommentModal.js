import { useDispatch } from 'react-redux'
import { removeComment } from '../../../../store/comment'
import { loadPosts } from '../../../../store/post';

function DeleteCommentModal({ setDeleteModal, commentId, setOptionsModal }) {
  const dispatch = useDispatch();


  const deleteHandler = async(e) => {
    await dispatch(removeComment(commentId))
    await dispatch(loadPosts())
    setOptionsModal(false)
  }

  return (
    <div className="delete-modal">
      <div className="delete-header">
        <p className="bold">Delete post?</p>
        <p>Are you sure you want to delete this post?</p>
      </div>
      <div className="delete-options">
        <div className='options'>
          <p className="option-delete bold" onClick={deleteHandler}>Delete</p>
        </div>
        <div className='options'>
          <p onClick={() => setDeleteModal(false)}>Cancel</p>
        </div>
      </div>
    </div>

  )
}

export default DeleteCommentModal;

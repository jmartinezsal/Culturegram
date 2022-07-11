import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { removePost } from '../../../../store/post'

function DeletePostModal({ setDeleteModal, postId, setOptionsModal }) {
  const dispatch = useDispatch();
  const history = useHistory();


  const deleteHandler = (e) => {
    dispatch(removePost(postId))
    history.push('/')
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

export default DeletePostModal;

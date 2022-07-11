import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import {removePost} from '../../../../store/post'

function DeletePostModal({setDeleteModal, postId}) {
  const dispatch = useDispatch();
  const history = useHistory();


  const deleteHandler = async(e) =>{
    dispatch(removePost(postId))
    history.push('/')
  }

  return (
    <div className="delete-modal">
      <div className="delete-header">
        <p className="bold">Delete post?</p>
        <p>Are you sure you want to delete this post?</p>
      </div>
      <p className="option-delete options" onClick={deleteHandler}>Delete</p>
      <p className="options" onClick={() => setDeleteModal(false)}>Cancel</p>
    </div>

  )
}

export default DeletePostModal;

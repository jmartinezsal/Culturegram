import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../../context/Modal";
import DeleteCommentModal from "./DeleteCommentModal";
import EditCommentModal from "./EditCommentModal";

function CommentOptions({ setOptionsModal, commentId}) {
  const comment = useSelector(state => state.comment[commentId])
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  console.log(comment)
  return (
    <div className="post-options-modal" >
      <div className="options">
        <p className="option-delete bold" onClick={() => setDeleteModal(true)}>Delete</p>
      </div>
      {deleteModal &&
        <Modal onClose={() => setDeleteModal(false)}>
          <DeleteCommentModal setDeleteModal={setDeleteModal} setOptionsModal={setOptionsModal} commentId={comment?.id} />
        </Modal>
      }
      <div className="options">
        <p onClick={() => setEditModal(true)}>Edit</p>
      </div>
      {editModal &&
        <Modal onClose={() => setEditModal(false)}>
          <EditCommentModal setEditModal={setEditModal} setOptionsModal={setOptionsModal} currComment={comment} />
        </Modal>
      }
      <div className="options">
        <p onClick={() => setOptionsModal(false)}>Cancel</p>
      </div>
    </div>

  )
}

export default CommentOptions;

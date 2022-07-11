import { useEffect, useState } from "react";
import { Modal } from "../../../../context/Modal";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from './EditPostModal';

function PostOptions({ post, setOptionsModal }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);


  return (
    <div className="post-options-modal" >
      <div className="options">
        <p className="option-delete bold" onClick={() => setDeleteModal(true)}>Delete</p>
      </div>
      {deleteModal &&
        <Modal onClose={() => setDeleteModal(false)}>
          <DeletePostModal setDeleteModal={setDeleteModal} postId={post.id} />
        </Modal>
      }
      <div className="options">
        <p onClick={() => setEditModal(true)}>Edit</p>
      </div>
      {editModal &&
        <Modal onClose={() => setEditModal(false)}>
          <EditPostModal setEditModal={setEditModal} setOptionsModal={setOptionsModal} post={post} />
        </Modal>
      }
      <div className="options">
        <p>Go to post</p>
      </div>
      <div className="options">
        <p onClick={() => setOptionsModal(false)}>Cancel</p>
      </div>
    </div>

  )
}

export default PostOptions;

import { useEffect, useState } from "react";
import { Modal } from "../../../../context/Modal";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from './EditPostModal';

function PostOptions({post, setOptionsModal}){
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);


  return(
    <div className="post-options-modal" >
      <p className="option-delete options" onClick={() => setDeleteModal(true)}>Delete</p>
      {deleteModal &&
      <Modal onClose={() =>setDeleteModal(false)}>
        <DeletePostModal setDeleteModal={setDeleteModal} postId={post.id} />
      </Modal>
      }
      <p className="options" onClick={() =>setEditModal(true)}>Edit</p>
      {editModal &&
      <Modal onClose={() =>setEditModal(false)}>
        <EditPostModal setEditModal={setEditModal} setOptionsModal={setOptionsModal} post={post} />
      </Modal>
      }
      <p className="options">Go to post</p>
      <p className="options" onClick={() => setOptionsModal(false)}>Cancel</p>
    </div>

  )
}

export default PostOptions;

import { useState } from "react";
import { Modal } from "../../../../context/Modal";
import DeletePostModal from "./DeletePostModal";

function PostOptions({postId, setOptionsModal}){
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  return(
    <div className="post-options-modal" >
      <p className="option-delete options" onClick={() => setDeleteModal(true)}>Delete</p>
      {deleteModal &&
      <Modal onClose={() =>setDeleteModal(false)}>
        <DeletePostModal setDeleteModal={setDeleteModal} postId={postId} />
      </Modal>
      }
      <p className="options">Edit</p>
      <p className="options">Go to post</p>
      <p className="options" onClick={() => setOptionsModal(false)}>Cancel</p>
    </div>

  )
}

export default PostOptions;

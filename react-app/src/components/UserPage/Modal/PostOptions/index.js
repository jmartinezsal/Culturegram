import { useState } from "react";
import { Modal } from "../../../../context/Modal";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from './EditPostModal';
import PostModal from "../PostModal";
import { Link, useLocation } from "react-router-dom";

function PostOptions({ post, setOptionsModal, comments }) {
  const location = useLocation();
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [postModal, setPostModal] = useState(false);

  return (
    <div className="post-options-modal" >
      <div className="options">
        <p className="option-delete bold" onClick={() => setDeleteModal(true)}>Delete</p>
      </div>
      {deleteModal &&
        <Modal onClose={() => setDeleteModal(false)}>
          <DeletePostModal setDeleteModal={setDeleteModal} setOptionsModal={setOptionsModal} postId={post.id} />
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
      {
        !location.pathname.includes('posts') &&
        <div className="options">
          <Link to={`/posts/${post?.id}`} >
            <p>Go to post</p></Link>

        </div>
      }
      <div className="options">
        <p onClick={() => setOptionsModal(false)}>Cancel</p>
      </div>
    </div>

  )
}

export default PostOptions;

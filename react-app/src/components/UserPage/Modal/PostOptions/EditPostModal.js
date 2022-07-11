import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ImageSlider from "../../../Tools/ImageSlider"
import { updatePost } from "../../../../store/post";
import { useHistory } from "react-router-dom";

function EditPostModal({ post, setEditModal, setOptionsModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const images = post.images;
  const id = post.id;

  const [content, setContent] = useState(post.content);
  const [hashtags, setHashtags] = useState([]);
  const [errors, setErrors] = useState([]);

  const updateContent = (e) => {
    setContent(e.target.value)
  }

  const updateHashtag = (e) => {
    setHashtags(e.target.value)
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      content,
      id
    }

    let post = await dispatch(updatePost(data))
    const post_id = post.id;
    if (Number.isInteger(post_id)) {
      history.push('/')
      setEditModal(false);
      setOptionsModal(false);
    }
    setErrors(post);
  }

  return (
    <div className="post-modal">
      <div className="modal-header submit-header">
        <p onClick={() => setEditModal(false)}>Cancel</p>
        <p>Edit info</p>
        <p className="modal-right-btn submit btn" onClick={submitHandler}>Done</p>
      </div>
      <div className="submit-modal">
        <ImageSlider images={images} />
        <form className="form-modal" onSubmit={submitHandler}>
          <div className='top'>
            <img className="profile-pciture" src={user.profilePicture} alt="profile"></img>
            <p>{user.username}</p>
          </div>
          <textarea
            placeholder='Write a caption...'
            type='text'
            name='bio'
            onChange={updateContent}
            value={content}
          > </textarea>
          {/* <input
          placeholder="Hashtags(optional)"
          type='text'
          namme="hastag"
          onChange={updateHashtag}
          value={hashtags}
            >
            </input> */}
          <div className='errors'>
            {errors.map((error, ind) => (
              <div key={ind}>{error.includes(':') ? error.split(':')[1] : error}</div>
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPostModal;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrFormPreviousLink } from 'react-icons/gr';

import ImageSlider from "../../../Tools/ImageSlider"
import { createPost, uploadImage, loadPosts } from "../../../../store/post";
import { useHistory } from "react-router-dom";

function ModalSubmit({ images, Previous, setCreateModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [errors, setErrors] = useState([]);

  const updateContent = (e) => {
    setContent(e.target.value)
  }

  const updateHashtag = (e) => {
    setHashtags(e.target.value)
  }

  const addImages = async(images, post_id) => {
    for(let i= 0; i < images.length; i++){
      let image = images[i];

      const imageData = {
        "image": image,
        "url": image.name.replace(/ /g,"+"),
        "post_id": post_id,
      };

      await dispatch(uploadImage(imageData));
  }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const imageFiles = images.map((image) => image.file)
    const data = {
      content
    }

    let post = await dispatch(createPost(data))
    const post_id = post.id;
    if (Number.isInteger(post_id)) {
      await addImages(imageFiles, post_id)
      history.push('/')
      setCreateModal(false);
      await dispatch(loadPosts())
    }
    setErrors(post);
  }

  return (
    <div className="post-modal">
      <div className="modal-header submit-header">
        <GrFormPreviousLink className="modal-left-btn btn" onClick={Previous} />
        <p>Preview and submit!</p>
        <p className="modal-right-btn submit btn" onClick={submitHandler}>Share</p>
      </div>
      <div className="submit-modal">
        <ImageSlider images={images} type="post" />
        <form className="form-modal" onSubmit={submitHandler}>
                    <div className='top'>
            <img className="profile-picture" src={user.profilePicture} alt="profile"></img>
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

export default ModalSubmit;

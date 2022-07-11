import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCommentDots, FaRegHeart } from 'react-icons/fa';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

import { Modal } from '../../../context/Modal';
import PostOptions from '../Modal/PostOptions';
import ImageSlider from '../../Tools/ImageSlider';


function PostCard({ post, user }) {
  const sessionUser = useSelector(state => state.session.user);
  const [optionModal, setOptionsModal] = useState(false);


  return (

    <div className="post-card" key={post.id}>
      <div className="post-card-top">
        <div className='left-top'>
          <img src={user.profilePicture} alt={user.username} />
          <p className="bold">{user.username}</p>
        </div>
        {
          user.id === sessionUser.id &&
          <BiDotsHorizontalRounded onClick={() => setOptionsModal(true)} />
        }
      </div>
      {optionModal && (
        <Modal onClose={() => setOptionsModal(false)}>
          <PostOptions setOptionsModal={setOptionsModal} post={post}/>
        </Modal>
      )
      }
      <div className='post-card-img'>
        <ImageSlider images={post.images} type="profile" />
      </div>
      <div className="post-card-bottom">
        <div className="post-card-btns">
          <FaRegCommentDots />
          <FaRegHeart />
        </div>
        <div className="post-card-liked">
          "How many people liked this"
        </div>
        <div className="post-card-header">
          <p><p className="bold">{user.username}</p> {post.content}</p>
        </div>
      </div>

    </div>
  )
}

export default PostCard;

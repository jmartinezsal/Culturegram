import {useState} from 'react';
import { useSelector } from 'react-redux';
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import {BiDotsHorizontalRounded} from 'react-icons/bi';

import ImageSlider from "../../../Tools/ImageSlider";
import timeUpdatedAt from "../../../Tools/Utils";
import CommentPost from "../../Post/PostCard/CommentPost";
import CommentSection from "./CommentSection";
import PostOptions from '../../Modal/PostOptions';
import { Modal } from '../../../../context/Modal';



function PostModal({ post, comments }) {
  const sessionUser = useSelector(state => state.session.user);
  const [optionModal, setOptionsModal] = useState(false);


  const user = post.user;
  return (
    <div className="post-modal-view">
      <ImageSlider images={post.images} />
      <div className="post-modal-right">
        <div className="top">
          <img className="profile-picture" src={user.profilePicture} alt={user.username}></img>
          <p className="bold">{user.username}</p>
          {
            post.user.id === sessionUser.id &&
            <BiDotsHorizontalRounded onClick={() => setOptionsModal(true)} />
          }
        {optionModal && (
          <Modal onClose={() => setOptionsModal(false)}>
            <PostOptions setOptionsModal={setOptionsModal} post={post}  />
          </Modal>
        )}
      </div>
      <div className="comment-container">
        <div className="comment-top">
          <img className="profile-picture" src={user.profilePicture} alt={user.username}></img>
          <p className="bold">{user.username}</p>
          <p>{post.content}</p>
        </div>
        <p className="created-at">{timeUpdatedAt(post.updatedAt)}</p>
        <CommentSection comments={comments} />
      </div>
      <div className="post-modal-right-bottom">
        <div className="post-card-btns post-card-content">
          <FaRegHeart />
          <FaRegCommentDots />
        </div>
        <p>"Number of people liked this post"</p>
        <p className="created-at">{timeUpdatedAt(post.updatedAt)}</p>
      </div>
      <CommentPost postId={post.id} />
    </div>

    </div >
  )
}

export default PostModal;

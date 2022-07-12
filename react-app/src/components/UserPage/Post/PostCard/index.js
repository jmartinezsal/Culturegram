import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCommentDots, FaRegHeart } from 'react-icons/fa';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

import { Modal } from '../../../../context/Modal';
import PostOptions from '../../Modal/PostOptions';
import ImageSlider from '../../../Tools/ImageSlider';
import timeUpdatedAt from '../../../Tools/Utils';
import CommentPost from './CommentPost';
import PostModal from '../../Modal/PostModal';
import Like from '../../../Tools/Like';

function PostCard({ post }) {
  const sessionUser = useSelector(state => state.session.user);
  const comments = useSelector(state => state.comment);
  const likes = useSelector(state => state.like);
  const [optionModal, setOptionsModal] = useState(false);
  const [postModal, setPostModal] = useState(false);


  useEffect(()=>{
    let modalDiv= document.body.getElementsByClassName("comment-container")[0]
    document.body.style.overflowY = postModal ? "hidden" : "scroll";
    if(modalDiv){
      modalDiv.style.overflowY = postModal ? "scroll" : "hidden";
    }
  }, [postModal])
  const user = post.user;

  const likedChecker = () => {
    let likeIds = post.likes;
    for (const id of likeIds) {
      let userId =  likes[id]?.userId;
      if(userId ===sessionUser.id) return {[id]: true}
    }
    return false;
  }
  const [liked, setLiked] = useState(likedChecker())


  const commentsForPost = () => {
    let commentsId = post.comments;
    let commentsFiltered = [];
    for (const id of commentsId) {
      commentsFiltered.push(comments[id])
    }
    return commentsFiltered;
  }

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
          <PostOptions setOptionsModal={setOptionsModal} post={post} />
        </Modal>
      )
      }
      <div className='post-card-img'>
        <ImageSlider images={post.images} type="profile" />
      </div>
      <div className="post-card-bottom">
        <div className="post-card-btns post-card-content">
          <Like postId={post?.id} liked={liked} setLiked={setLiked} sessionUserId={sessionUser.id}/>
          <FaRegCommentDots onClick={() => setPostModal(true)} />
        </div>
        <div className="post-card-liked post-card-content">
          <p>{post.likes.length === 0 ? "No Likes at the moment" : `Liked by ${post.likes.length}`}</p>
        </div>
        <div className="post-card-header post-card-content">
          <p className="bold">{user.username}</p> <p>{post.content}</p>
        </div>
        <div className="light post-card-content">
          <p onClick={() => setPostModal(true)}>{post.comments.length === 0 ? "No comments" : `View all ${post.comments.length} comments`} </p>
          {postModal &&
            (
              <Modal onClose={() => setPostModal(false)}>
                <PostModal setPostModal={setPostModal} setOptionsModal={setOptionsModal} post={post} comments={commentsForPost()} liked={liked} setLiked={setLiked}/>
              </Modal>
            )}
          <p className="created-at">{timeUpdatedAt(post.updatedAt)}</p>
        </div>
      </div>
      <CommentPost postId={post.id} />
    </div>
  )
}

export default PostCard;

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FaRegCommentDots } from "react-icons/fa";
import { BiDotsHorizontalRounded } from 'react-icons/bi';

import ImageSlider from "../../Tools/ImageSlider";
import { timeUpdatedAt, likedChecker, commentsForPost } from "../../Tools/Utils";
import CommentPost from "../Post/PostCard/CommentPost";
import CommentSection from "../Modal/PostModal/CommentSection"
import PostOptions from '../Modal/PostOptions';
import { Modal } from '../../../context/Modal';
import Like from '../../Tools/Like';
import PageNotFound from '../../PageNotFound';

function PostView({loaded}) {
  const { postId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const post = useSelector(state => state.post[postId]);
  const comments = useSelector(state => state.comment);
  const likes = useSelector(state => state.like);
  const [liked, setLiked] = useState(likedChecker(post, likes, sessionUser))
  const [optionModal, setOptionsModal] = useState(false);

  if(!post && loaded){
    return <PageNotFound />
  }
  const user = post?.user;
  return (
    <div className="post-view">
      <div className="post-modal-view">
        <ImageSlider images={post?.images} />
        <div className="post-modal-right">
          <div className="top">
            <Link to={`/${user.username}`}>
              <img className="profile-picture" src={user?.profilePicture} alt={user?.username}></img>
              <p className="bold">{user?.username}</p>
            </Link>
            {
              post?.user.id === sessionUser?.id &&
              <BiDotsHorizontalRounded onClick={() => setOptionsModal(true)} />
            }
            {optionModal && (
              <Modal onClose={() => setOptionsModal(false)}>
                <PostOptions setOptionsModal={setOptionsModal} post={post} />
              </Modal>
            )}
          </div>
          <div className="comment-container">
            <div className="comment-top">
              <img className="profile-picture" src={user?.profilePicture} alt={user?.username}></img>
              <p className="bold">{user?.username}</p>
              <p>{post?.content}</p>
            </div>
            <p className="created-at">{timeUpdatedAt(post.updatedAt)}</p>
            <CommentSection comments={commentsForPost(post, comments)} />
          </div>
          <div className="post-modal-right-bottom">
            <div className="post-card-btns post-card-content">
              <Like postId={post?.id} liked={liked} setLiked={setLiked} sessionUserId={sessionUser.id} />
              <FaRegCommentDots />
            </div>
            <p>{post.likes.length === 0 ? "No Likes at the moment" : `Liked by ${post.likes.length}`}</p>
            <p className="created-at">{timeUpdatedAt(post.updatedAt)}</p>
          </div>
          <CommentPost postId={post.id} />
        </div>
      </div >
    </div>
  )
}

export default PostView;

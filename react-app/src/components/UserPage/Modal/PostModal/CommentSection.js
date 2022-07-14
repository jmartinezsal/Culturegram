import { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";

import {timeUpdatedAt}  from '../../../Tools/Utils';
import CommentOptions from "../CommentOptions";
import { Modal } from '../../../../context/Modal';
import { Link } from "react-router-dom";
function CommentSection({ comments }) {
  const sessionUser = useSelector(state => state.session.user);
  const [current, setCurrent ] = useState({});
  const [optionsModal, setOptionsModal] = useState(false);


  return (
    <>
      {comments?.map((comment, idx) => {
        let commentUser = comment?.user;
        return (
          <div className="comment" key={idx}>
            <div className="comment-top">
              <img className="profile-picture" src={commentUser?.profilePicture} alt={commentUser?.username}></img>
              <Link to={`/${commentUser?.username}`}>
              <p className="bold">{commentUser?.username}</p>
              </Link>
              <p className="contained">{comment?.comment}</p>
              {
                commentUser?.id === sessionUser.id &&
                <BiDotsHorizontalRounded onClick={() =>
                  (
                    <>
                   {setOptionsModal(true)}
                   {setCurrent(comment.id)}
                    </>
                   )}
                   />
              }
              {
                optionsModal && (
                  <Modal onClose={() => setOptionsModal(false)}>
                    <CommentOptions commentId={current} setOptionsModal={setOptionsModal} />
                  </Modal>
                )
              }
            </div>
            <p className="created-at">{timeUpdatedAt(comment?.updatedAt)}</p>
          </div>
        )
      })}
    </>
  )
}


export default CommentSection;

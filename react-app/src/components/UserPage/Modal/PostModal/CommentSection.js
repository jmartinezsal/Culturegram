import { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";

import timeUpdatedAt from "../../../Tools/Utils";

function CommentSection({ comments }) {
  const [optionsModal, setOptionsModal] = useState(false);
  const sessionUser = useSelector(state => state.session.user);


  return (
    <>
      {comments.map((comment, idx) => {
        let commentUser = comment.user;
        return (
          <div className="comment" key={idx}>
            <div className="comment-top">
              <img className="profile-picture" src={commentUser.profilePicture} alt={commentUser.username}></img>
              <p className="bold">{commentUser.username}</p>
              <p className="contained">{comment.comment}</p>
              {
                commentUser.id === sessionUser.id &&
                <BiDotsHorizontalRounded onClick={() => setOptionsModal(true)} />
              }
            </div>
            <p className="created-at">{timeUpdatedAt(comment.updatedAt)}</p>
          </div>
        )
      })}
    </>
  )
}


export default CommentSection;

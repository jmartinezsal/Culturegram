import ImageSlider from "../../../Tools/ImageSlider";
import timeUpdatedAt from "../../../Tools/Utils";

function PostModal({ post, comments }) {
  const user = post.user;
  return (
    <div className="post-modal">
      <ImageSlider images={post.images} />
      <div className="post-modal-right">
        <img className="profile-picture" src={user.profilePicture} alt={user.username}></img>
        <p className="bold">{user.username}</p>
        <div className="comment-container">
          <img className="profile-picture" src={user.profilePicture} alt={user.username}></img>
          <p>{post.content}</p>
          {comments.map((comment, idx) => {
            let commentUser = comment.user;
            return (
              <div className="comment" key={idx}>
                <div className="comment-top">
                  <img className="profile-picture" src={commentUser.profilePicture} alt={commentUser.username}></img>
                  <p className="bold">{commentUser.username}</p>
                  <p>{comment.comment}</p>
                </div>
                <p className="created-at">{timeUpdatedAt(post.updatedAt)}</p>
              </div>

            )
          })}
        </div>
      </div>

    </div>
  )
}

export default PostModal;

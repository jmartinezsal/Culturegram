

function CommentSection({ comments }) {


  return (
    <div className="comment-section">
      {comments.map((comment, idx) => (
        <div className="comment">
          {}

        </div>

      ))}

    </div>
  )
}

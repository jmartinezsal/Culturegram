from flask import Blueprint,  session, request
from app.models import db, Like
from flask_login import login_required, current_user
from .utils import validation_errors_to_error_messages

like_routes = Blueprint('likes', __name__)

@like_routes.route('')
def all_likes():
  likes = Like.query.all()
  return {like.id: like.to_dict() for like in likes}


@like_routes.route('/<int:post_id>', methods=["POST"])
@login_required
def liked(post_id):
  new_like = Like(
      user_id = current_user.to_dict()['id'],
      post_id = post_id
  )

  db.session.add(new_like)
  db.session.commit()
  return new_like.to_dict()

@like_routes.route('/<int:like_id>', methods=["DELETE"])
@login_required
def unlike(like_id):
  unlike = Like.query.get(like_id)

  db.session.delete(unlike)
  db.session.commit()
  return {"success": "You have unliked this post"}

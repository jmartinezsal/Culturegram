from flask import Blueprint,  session, request
from app.api.auth_routes import login
from app.models import db, user_following
from flask_login import login_required, current_user
from .utils import validation_errors_to_error_messages

follow_routes = Blueprint('follows', __name__)

@follow_routes.route('')
def all_follows():
  follows = user_following.query.all()
  return {follow.id: follow.to_dict() for follow in follows}


@follow_routes.route('<int:following_id>', ["POST"])
@login_required
def follow(following_id):
  new_follow = user_following(
    follower = current_user.to_dict()['id'],
    following = following_id
  )
  db.session.add(new_follow)
  db.seesion.commit()
  return {"success": "You are now following this person"}


@follow_routes.route('', ["DELETE"])
@login_required
def follow(following_id):

  db.session.delete(unfollow)
  db.seesion.commit()
  return {"success": "You are now unfollowing this person"}

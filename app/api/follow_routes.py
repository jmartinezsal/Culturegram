from flask import Blueprint,  session, request
from app.models import db, User_Following
from flask_login import login_required, current_user
from app.forms import FollowingForm

follow_routes = Blueprint('follows', __name__)

@follow_routes.route('')
def all_follows():
  follows = User_Following.query.all()
  return {follow.id: follow.to_dict() for follow in follows}


@follow_routes.route('', methods=["POST"])
@login_required
def follow():
  form = FollowingForm()
  data = form.data

  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_follow = User_Following(
      follower_id = current_user.to_dict()['id'],
      following_id = data['following_id'],
      blocked = data['blocked']
    )

    db.session.add(new_follow)
    db.session.commit()
    return {"success": "You are now following this person"}


@follow_routes.route('<int:user_following_id>', methods=["PUT"])
@login_required
def updateFollow(user_following_id):
  following = User_Following.query.filter(User_Following.id==user_following_id).first()

  print(following.to_dict())

  form = FollowingForm()
  data = form.data
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    following.blocked = data["blocked"]

    db.session.commit()
    return {"success": "This person has been blocked"}


@follow_routes.route('<int:user_following_id>', methods=["DELETE"])
@login_required
def unfollow(user_following_id):
  following = User_Following.query.filter(User_Following.id==user_following_id).first()

  db.session.delete(following)
  db.session.commit()
  return {"success": "You are now unfollowing this person"}

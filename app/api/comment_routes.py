from flask import Blueprint, jsonify, session, request, redirect
from app.models import db, Comment
from app.forms import CommentForm
from flask_login import login_required, current_user
from .utils import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('')
def all_comments():
  comments = Comment.query.all()
  return {comment.id: comment.to_dict() for comment in comments}


@comment_routes.route('/<int:post_id>',methods=["POST"] )
@login_required
def post_comment(post_id):
  form = CommentForm()
  data = form.data
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_comment = Comment(
      user_id = current_user.to_dict()['id'],
      post_id = post_id,
      comment =  data['comment']
    )

    db.session.add(new_comment)
    db.session.commit()
    return new_comment.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route('/edit/<int:comment_id>',methods=["PUT"] )
@login_required
def edit_comment(comment_id):
  comment = Comment.query.get(comment_id)
  form = CommentForm()
  data = form.data
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():

    comment.comment =  data['comment']

    db.session.commit()
    return comment.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route('/delete/<int:comment_id>',methods=["DELETE"] )
@login_required
def delete_comment(comment_id):
  comment = Comment.query.get(comment_id)
  db.session.delete(comment)
  db.session.commit()
  return {"successful": "Comment has been deleted"}

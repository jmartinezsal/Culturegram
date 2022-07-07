from flask import Blueprint, jsonify, session, request, redirect
from app.models import db, Post
from app.forms import PostForm
from flask_login import login_required, current_user
from .utils import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)

@post_routes.route('')
def all_posts():
  posts = Post.query.all()
  return {post.id: post.to_dict() for post in posts}

@post_routes.route('/upload', methods=["POST"])
@login_required
def create_post():
  form = PostForm()
  data = form.data
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_post = Post(
      user_id = current_user.to_dict()['id'],
      content = data['content']
    )

    db.session.add(new_post)
    db.session.commit()
    return new_post.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route('/edit/<int:post_id>', methods=["PUT"])
@login_required
def edit_post(post_id):
  """
  Edit post that is already made
  """
  post = Post.query.get(post_id)
  form = PostForm()
  data = form.data
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    post.content = data['content']

    db.session.commit()
    return post.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@post_routes.route('/delete/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
  """
  Delete a post made by the user
  """
  post = Post.query.get(post_id)
  db.session.delete(post)
  db.session.commit()
  return {"successful": "Post has been deleted"}

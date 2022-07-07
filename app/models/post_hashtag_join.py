from .db import db

class Post_Hashtag_Join(db.Model):
  __tablename__ = 'post_hashtags_join'

  id = db.Column(db.Integer, primary_key=True)
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
  hashtag_id = db.Column(db.Integer, db.ForeignKey('hashtags.id'), nullable=False)

  

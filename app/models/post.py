from sqlalchemy.sql import func
from .db import db

class Post(db.Model):
  __tablename__ = 'posts'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  content = db.Column(db.String(200), nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

  # Relationship
  user = db.relationship("User", back_populates="posts")
  comments = db.relationship("Comment", back_populates="posts", cascade="all, delete-orphan")
  likes = db.relationship("Like", back_populates="posts", cascade="all, delete-orphan")
  images = db.relationship("Image", back_populates="posts", cascade="all, delete-orphan")
  hashtags = db.relationship("Hashtag", back_populates="posts", cascade="all, delete-orphan")


  def to_dict(self):
    return {
      "userId": self.user_id,
      "content": self.content,
      "createdAt": self.created_at,
      "updatedAt": self.updated_at,
      "comments": [comment.id for comment in self.comments],
      "likes": [like.id for like in self.likes],
      "images": [image.to_dict() for image in self.images],
      "hashtags":[hashtag.to_dict() for hashtag in self.hashtags]
    }

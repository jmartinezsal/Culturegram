from sqlalchemy.sql import func
from .db import db

class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
  comment = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True),server_default=func.now(), onupdate=func.now())

  # Relationship
  user = db.relationship("User", back_populates="comments")
  posts = db.relationship("Post", back_populates="comments")


  def to_dict(self):
    return {
      "id":self.id,
      "user": self.user.to_dict_simple(),
      "postId": self.post_id,
      "comment": self.comment,
      "createdAt": self.created_at,
      "updatedAt": self.updated_at
    }

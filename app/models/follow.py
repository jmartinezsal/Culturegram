from email.policy import default
from sqlalchemy import ForeignKey
from sqlalchemy.sql import func
from .db import db

class Follow(db.Model):
  __tablename__ = 'follows'

  id = db.Column(db.Integer, primary_key=True)
  follower = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
  following = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
  blocked = db.Column(db.Boolean, nullable=False, default=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

  def to_dict(self):
    return {
      "id": self.id,
      "follower_id": self.follower_id,
      "following_id": self.following_id,
      "blocked": self.blocked
    }

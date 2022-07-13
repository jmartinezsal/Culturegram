from sqlalchemy.sql import func
from .db import db

class User_Following(db.Model):
  __tablename__ = 'user_followings'

  id = db.Column(db.Integer, primary_key=True)
  follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
  following_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
  blocked = db.Column(db.Boolean, nullable=False, default=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True),server_default=func.now(), onupdate=func.now())

  user = db.relationship("User", foreign_keys=[follower_id], back_populates="user_followings")
  followie = db.relationship("User", foreign_keys=[following_id], back_populates="user_followers")
  
  def to_dict(self):
    return {
      "id": self.id,
      "follower_id": self.follower_id,
      "following_id": self.following_id,
      "blocked": self.blocked
    }

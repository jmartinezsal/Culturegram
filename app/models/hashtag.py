from .db import db

class Hashtag(db.Model):
  __tablename__ = 'hashtags'

  id = db.Column(db.Integer, primary_key=True)
  hashtag = db.Column(db.String(20), nullable=False)

  # Relationship
  posts = db.relationship("Post", secondary="Post_Hashtag_Join", back_populates="hashtags")

  def to_dict(self):
    return {
      "id": self.id,
      "hastag": self.hashtag
    }

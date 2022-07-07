from .db import db

class Hashtag(db.Model):
  __tablename__ = 'hashtags'

  id = db.Column(db.Integer, primary_key=True)
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
  hashtag = db.Column(db.String(20), nullable=False)

  # Relationship
  posts = db.relationship("Post", back_populates="hashtags")

  def to_dict(self):
    return {
      "hashtag": self.hashtag
    }

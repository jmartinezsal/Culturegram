from .db import db

post_hashtags_join = db.Table('post_hashtags_join',
                              db.Model.metadata,
                              db.Column('posts', db.ForeignKey('posts.id'), nullable=False, primary_key=True),
                              db.Column('hashtags', db.ForeignKey('hashtags.id'), nullable=False, primary_key=True)
                              )


class Hashtag(db.Model):
  __tablename__ = 'hashtags'

  id = db.Column(db.Integer, primary_key=True)
  hashtag = db.Column(db.String(20), nullable=False)

  # Relationship
  post_hashtags = db.relationship("Post", secondary=post_hashtags_join, back_populates="hashtag_posts")

  def to_dict(self):
    return {
      "id": self.id,
      "hastag": self.hashtag
    }

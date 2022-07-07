from .db import db

class Image(db.Model):
  __tablename__ = "images"

  id = db.Column(db.Integer, primary_key=True)
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
  url = db.Column(db.String(255), nullable=False)


  # Relationships
  posts = db.relationship("Post", back_populates="images")

  def to_dict(self):
    return {
       "url": self.url
    }

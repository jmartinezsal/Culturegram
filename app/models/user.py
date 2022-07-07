from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

user_following = db.Table(
    'user_following', db.Model.metadata,
    db.Column("follower", db.ForeignKey('users.id'), primary_key=True, nullable=False ),
    db.Column("following", db.ForeignKey('users.id'), primary_key=True, nullable=False )
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    bio = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String(255), nullable=False, default="https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg")
    private = db.Column(db.Boolean(), default=False, nullable=False)

    # Relationships
    posts = db.relationship("Post", back_populates="user", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    likes = db.relationship("Like", back_populates="user", cascade="all, delete-orphan")
    followings = db.relationship("User", secondary=user_following,
                    primaryjoin= id == user_following.c.follower,
                    secondaryjoin= id ==user_following.c.following,
                    backref="followers",  cascade="all, delete"
                    )
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'profilePicture': self.profile_picture,
            'bio': self.bio,
            'private': self.private,
            "posts": [post.id for post in self.posts],
            "likes": [like.id for like in self.likes],
            "comments": [comment.id for comment in self.comments],
        }

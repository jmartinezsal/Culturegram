from email.policy import default
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import ValidationError, Length, InputRequired, Email
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    firstName = StringField('First Name', validators=[InputRequired('First Name is required.')])
    lastName = StringField('Last Name', validators=[InputRequired("Last Name is required.")])
    username = StringField('Username', validators=[InputRequired("Username is required."), Length(min=3, max=20, message="Username must be between 5 and 20 characters."), username_exists])
    email = StringField('Email', validators=[InputRequired("Email is required."),Email(message="Enter a valid email"), user_exists ])
    password = StringField('Password', validators=[InputRequired("Password is required")])
    bio = StringField('Bio', validators=[InputRequired("A bio is required."), Length(min=3, max=255, message="Bio must be between 3 and 255 characters.")])

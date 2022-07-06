from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length
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
    username = StringField('Username', validators=[DataRequired(), Length(min=1, max=20, message="Bio must be between 1 and 20 characters"), username_exists])
    email = StringField('Email', validators=[DataRequired(), user_exists])
    password = StringField('Password', validators=[DataRequired()])
    first_name = StringField('First Name', validators=[DataRequired(),  Length(min=1, max=20, message="Bio must be between 1 and 20 characters")])
    last_name = StringField('Last Name', validators=[DataRequired(), Length(min=1, max=20, message="Bio must be between 1 and 20 characters")])
    bio = StringField('Bio', validators=[DataRequired(), Length(min=1, max=255, message="Bio must be between 5 and 255 characters")])
    profile_picture = StringField('Profile Picture')
    private = BooleanField('Private', validators=[DataRequired()])

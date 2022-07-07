from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Length




class ProfileForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired(),  Length(min=1, max=20, message="Bio must be between 1 and 20 characters")])
    last_name = StringField('Last Name', validators=[DataRequired(), Length(min=1, max=20, message="Bio must be between 1 and 20 characters")])
    bio = StringField('Bio', validators=[DataRequired(), Length(min=1, max=255, message="Bio must be between 5 and 255 characters")])
    profile_picture = StringField('Profile Picture', default="https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg")
    private = BooleanField('Private', default=False)

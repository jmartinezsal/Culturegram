from re import M
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
  commnent = StringField("Comment", validators=[DataRequired(), Length(min=1, max=255, message="Comment must be between 1 to 255 characters.")])

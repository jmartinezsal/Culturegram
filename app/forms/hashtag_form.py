from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length

class HashtagForm(FlaskForm):
  hashtag = StringField("Hashtag", validators=[DataRequired(), Length(min=1,max=20, message="Hashtag must be between 1 to 20 characters.")])

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class PostForm(FlaskForm):
  content = StringField("Content", validators=[DataRequired(), Length( min=1, max=500, message="Content for this post must be between 1 to 500 characters." )])

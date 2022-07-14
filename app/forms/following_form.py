from email.policy import default
from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField
from wtforms.validators import DataRequired

class FollowingForm(FlaskForm):
  blocked = BooleanField("Blocked", validators=[DataRequired()], default=False )
  following_id = IntegerField("Following", validators=[DataRequired()])

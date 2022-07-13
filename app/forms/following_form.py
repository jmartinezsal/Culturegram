from flask_wtf import FlaskForm
from wtforms import BooleanField
from wtforms.validators import DataRequired

class FollowingForm(FlaskForm):
  blocked = BooleanField("Following", default=False )

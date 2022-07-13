from app.models import db, User_Following


# Adds a demo user, you can add other users here if you want
def seed_following():
    demo = User_Following(follower_id=1, following_id=2)

    db.session.add(demo)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the following table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_following():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

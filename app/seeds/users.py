from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password',
        first_name='Demo', last_name='User', bio="This is a demo account and can be used as a tester for the functionality of the website.")
    marnie = User(
        username='marnie32', email='marnie@aa.io', password='password123',
            first_name='Marnie', last_name='Smith', bio="This is a demo account and can be used as a tester for the functionality of the website.")
    bobbie = User(
        username='cultureLover', email='bobbie@aa.io', password='password123456',
        first_name='Jay', last_name='Cruz', bio="This is a demo account and can be used as a tester for the functionality of the website.")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

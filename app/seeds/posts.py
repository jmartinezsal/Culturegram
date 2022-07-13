from app.models import db, Post


# Adds a demo user, you can add other users here if you want
def seed_posts():
    posts = [
      Post(user_id=1, content="During our time in Nepal 😀"),
      Post(user_id=1, content="Had to share the beautiful Henna I got done for the wedding"),
      Post(user_id=1, content="Turkana"),
      Post(user_id=1, content="Texas Culture Festival- Czech Culture Display"),
      Post(user_id=1, content="Pic from Japanese Culture in Arlington Heights"),
      Post(user_id=1, content="Dragon"),
      Post(user_id=1, content="From my time in Japan"),
      Post(user_id=1, content="Native American Culture Festival- North Dakota"),
      Post(user_id=1, content="Guyana Traditional Attire"),
      Post(user_id=1, content="From my time in Ukraine"),
      Post(user_id=1, content="Paris"),

      Post(user_id=2, content="Look at the detail on these masks!"),
      Post(user_id=2, content="Got these dolls while at Rajasthan"),
      Post(user_id=2, content="Got to witness traditional Hungary performance"),
      Post(user_id=2, content="Solo Batik Carnival"),
      Post(user_id=2, content="🌞"),
      
      Post(user_id=3, content="😀"),
      Post(user_id=3, content="Happy St. Patrick’s Day"),
      Post(user_id=3, content="Festival in India"),
      Post(user_id=3, content="Ethiopian Head Wear"),
      Post(user_id=3, content="Can’t wait to go back to Mexico!"),
      Post(user_id=3, content="<3"),
      Post(user_id=3, content="Tanzania"),
      Post(user_id=3, content="Pakistan"),
    ]

    for post in posts:
      db.session.add(post)
      db.session.commit()


# Uses a raw SQL query to TRUNCATE the posts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

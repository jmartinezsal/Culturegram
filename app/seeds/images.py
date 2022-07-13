from app.models import db, Image


# Adds a demo user, you can add other users here if you want
def seed_images():

  images = [
    Image(post_id=1,  url="https://www.nepalkameleonholidays.com/uploads/banner/around-kathmandu-culture-tour_1491119111.jpg"),
    Image(post_id=1,  url="https://i.pinimg.com/originals/59/c3/f1/59c3f179fa50d6439ecb6593f8f1d1b0.jpg"),

    Image(post_id=2,  url="https://www.tnminoritypages.com/wp-content/uploads/2020/03/Celebrate-Nashville-Photo-1--scaled.jpg"),

    Image(post_id=3, url="http://www.visitturkanaland.com/wp-content/uploads/2014/03/Fiebig-Turkana-7687.jpg"),

    Image(post_id=4, url="https://usercontent2.hubstatic.com/5443259_f1024.jpg"),

    Image(post_id=5, url="http://www.dailyherald.com/storyimage/DA/20180603/NEWS/180609746/AR/0/AR-180609746.jpg"),

    Image(post_id=6, url="https://www.cravebits.com/wp-url/uploads/2014/07/chin3-1728x800_c.jpg"),

    Image(post_id=7, url="https://ramatniseko.com/wp-content/uploads/shutterstock_193421459_min-e1560128306371.jpg"),
    Image(post_id=7, url="http://blog.luulla.com/wp-content/uploads/2017/04/japanese-culture.jpg"),

    Image(post_id=8, url="https://www.ndtourism.com/sites/default/files/legacy_images/DSC_2645_0.jpg"),
    Image(post_id=8, url="https://www.travelsouthdakota.com/sites/default/files/styles/hero_l/public/2020-03/nativedancersfallspark07-27-19cc0590opt.jpg"),

    Image(post_id=9, url="https://i.ytimg.com/vi/IY2T-FwRXxA/maxresdefault.jpg"),

    Image(post_id=10, url="https://www.atlanticcouncil.org/wp-content/uploads/2021/01/2017-05-27T123025Z_1124266678_RC1DD0E8F540_RTRMADP_3_UKRAINE-CULTURE-scaled-e1611085518513.jpg"),
    Image(post_id=10, url="https://cdn.britannica.com/09/95909-050-B60AA0D5/Urkrainian-folk-dance-troupe-street.jpg"),
    Image(post_id=10, url="http://2.bp.blogspot.com/-g6vdZEPgNK4/T3HsD2AA1gI/AAAAAAAAAJ8/M1S5pbrsx0w/s1600/file_.jpg"),

    Image(post_id=11, url="https://www.fluentu.com/blog/educator-french/wp-content/uploads/sites/12/2015/10/teaching-french-culture2.jpg"),

    Image(post_id=12, url="https://static.toiimg.com/photo/61593712/.jpg"),

    Image(post_id=13, url="https://routeprints.com/wp-content/uploads/2019/05/Rajasthan-Tradition-1.png"),

    Image(post_id=14, url="http://www.studyinhungary.hu/static/upload/dance-sih.jpg"),

    Image(post_id=15, url="https://img.jakpost.net/c/2019/07/28/2019_07_28_77094_1564312875._large.jpg"),

    Image(post_id=16, url="https://dsctnb75btila.cloudfront.net/uploads/tour_image/file/58fafafd-4fa6-43a2-bea1-6aa934a466b9/fa2e73d0-4c34-4b0f-8347-6cb05df77522.jpg"),

    Image(post_id=17, url="http://static.thanhniennews.com/Uploaded/thuyvi/2016_06_03/8_EELV.JPG"),

    Image(post_id=18, url="https://i1.wp.com/www.travelsignposts.com/Ireland/files/2016/03/irishgroup_1920.jpg?fit=1920%2C1125&ssl=1"),

    Image(post_id=19, url="https://www.skymetweather.com/content/wp-content/uploads/2014/12/Diwali.jpg"),

    Image(post_id=20, url="https://www.gorebet.com/wp-content/uploads/2020/08/Woman-wearing-Ethiopian-cultural-clothes.jpg"),

    Image(post_id=21, url="https://acutrans.com/wp-content/uploads/2020/06/Mexican-Festival-scaled.jpg"),
    Image(post_id=21, url="https://30oblu3w47uz1frbsw2k01dp-wpengine.netdna-ssl.com/wp-content/uploads/2018/07/12669199_web1_180513-VNE-Mexicano.jpg"),
    Image(post_id=21, url="https://www.goatsontheroad.com/wp-content/uploads/2020/02/festivals-in-mexico-day-of-the-dead.jpg"),

    Image(post_id=22, url="https://jwcdaily.com/wp-content/uploads/2016/04/African-singers-sized.jpg"),

    Image(post_id=23, url="https://i1.wp.com/www.ecologicaladventure.com/wp-content/uploads/2016/09/Maasai-man-1.jpg"),

    Image(post_id=24, url="http://i.dawn.com/primary/2013/10/524bf86a972d8.jpg"),
    Image(post_id=24, url="http://4.bp.blogspot.com/-Y_KSfbdzGHk/T0shHkVw2pI/AAAAAAAAAXg/y0vbeTJgpoE/s1600/7557403-lg.jpg")
  ]

  for image in images:
    db.session.add(image)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the images table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()

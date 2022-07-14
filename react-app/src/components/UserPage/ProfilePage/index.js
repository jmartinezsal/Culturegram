import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PageNotFound from '../../PageNotFound';
import Follow from '../../Tools/Follow';
import { iFollow } from '../../Tools/Utils';

function ProfilePage({ loaded }) {
  const { username } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const allFollowing = useSelector(state => state.follow);
  const posts = useSelector(state => state.post);
  const [user, setUser] = useState({});
  const [follow, setFollow] = useState();

  useEffect(() => {

    (async () => {
      const response = await fetch(`/api/users/${username}`);
      const user = await response.json()
      setUser(user)
      setFollow(iFollow(sessionUser, user, allFollowing))
    })();
  }, [username]);

  console.log(user)
  const postIds = user?.posts
  const myPosts = postIds?.map(postId => posts[postId])

  if (user["Unsuccess"] && loaded) {
    return <PageNotFound />;
  }

  return (
    <div className="profile-page">
      <div className="profile">
        <div className='profile-header'>
          <img src={user?.profilePicture} alt={user?.username} />
          <div className='profile-header-right'>
            <p className="username">{user?.username}</p>
            {/* {
              sessionUser.username !== user.username &&
              <Follow follow={follow} setFollow={setFollow} following_id={user.id}/>
            } */}
            <div className="profile-info">
              <div className='info-section'>
                <p className="length">{user?.posts?.length}</p>
                <p className="info-name">posts</p>
              </div>
              <div className='info-section'>
                <p className="length">{user?.follower?.length} </p>
                <p className="info-name">followers</p>
              </div>
              <div className='info-section'>
                <p className="length">{user?.following?.length} </p>
                <p className="info-name">following</p>
              </div>
            </div>
            <div className="profile-about">
              <p className="bold">{user?.firstName} {user?.lastName}</p>
              <p className="bio"> {user?.bio}</p>
            </div>
          </div>
        </div>
        <div className="my-post-container">
          {myPosts?.length === 0
            ?
            <p>You currently have no pictures in your profile</p>
            :
            myPosts?.map((post) => (
              <Link to={`/posts/${post.id}`} key={post.id}>
                <img src={post?.images[0].url} alt={post?.images[0].url} />
              </Link>
            ))

          }
        </div>
      </div>

    </div>
  )
}

export default ProfilePage;

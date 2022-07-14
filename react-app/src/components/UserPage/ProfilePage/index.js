import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

function ProfilePage() {
  const { username } = useParams();
  console.log(username)
  const [user, setUser] = useState({});
  const posts = useSelector(state => state.post);
  useEffect(() => {
    if (!username) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${username}`);
      const user = await response.json();
      setUser(user)
    })();
  }, [username]);

  if (!user) {
    return null;
  }
  const postIds = user?.posts
  const myPosts = postIds?.map(postId => posts[postId])



  return (
    <div className="profile-page">
      <div className="profile">
        <div className='profile-header'>
          <img src={user?.profilePicture} alt={user?.username} />
          <div className='profile-header-right'>
            <p className="username">{user?.username}</p>
            <div className="profile-info">
              <div className='info-section'>
                <p className="length">{user.posts?.length}</p>
                <p className="info-name">posts</p>
              </div>
              <div className='info-section'>
                <p className="length">{user.follower?.length} </p>
                <p className="info-name">followers</p>
              </div>
              <div className='info-section'>
                <p className="length">{user.following?.length} </p>
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
              <Link to={`/posts/${post.id}`}>
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

import { useSelector } from 'react-redux';
import PostCard from '../Post/PostCard';


function HomePage() {
  const posts = Object.values(useSelector(state => state.post));

  return (
    <div className="home-page">
      <div className="post-card-container">
        {posts.map(post => (
          <PostCard post={post} key={post.id}/>
        ))}
      </div>
    </div>

  )

}

export default HomePage;

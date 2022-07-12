import { FaRegHeart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { removeLike, createLike } from '../../store/like';
import { loadPosts } from '../../store/post';

function Like({ postId, liked, setLiked}) {
  const dispatch = useDispatch();

  const onClickLiker = async () => {
      if(liked){
        await dispatch(removeLike(Object.keys(liked)[0]))
        setLiked(false)
      } else{
        const like = await dispatch(createLike(postId))
        const id = like.id
        setLiked({[id]: true})
      }
      await dispatch(loadPosts());
  }

  return (
    <>
      <FaRegHeart onClick={onClickLiker} style={liked ? { "backgroundColor": "red"} : {}} />
    </>
  )
}

export default Like;

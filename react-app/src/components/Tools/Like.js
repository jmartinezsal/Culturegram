import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { removeLike, createLike } from '../../store/like';
import { loadPosts } from '../../store/post';

function Like({ postId, liked, setLiked }) {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState();

  const onClickLiker = async () => {
    setDisable(true)
    if (liked) {
      await dispatch(removeLike(Object.keys(liked)[0]))
      setLiked(false)
    } else {
      const like = await dispatch(createLike(postId))
      const id = like.id
      setLiked({ [id]: true })
    }
    await dispatch(loadPosts());
    setTimeout(function () {
      setDisable(false)
    }, [500])
  }

  return (
    <>
      <FaRegHeart onClick={disable ? undefined : onClickLiker} style={liked ? { "color": "red" } : {}} />
    </>
  )
}

export default Like;

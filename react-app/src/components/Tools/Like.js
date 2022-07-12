import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { removeLike, createLike } from '../../store/like';
import { authenticate } from '../../store/session';

function Like({ postId, liked, setLiked}) {
  const dispatch = useDispatch();

  const onClickLiker = async () => {
      if(liked){
        await dispatch(removeLike(Object.keys(liked)[0]))
        setLiked(false)
        return;
      }

    const like = await dispatch(createLike(postId))
    const id = like.id
    setLiked({[id]: true})
  }




  return (
    <>
      <FaRegHeart onClick={onClickLiker} style={liked ? { "color": "red" } : {}} />
    </>
  )
}

export default Like;

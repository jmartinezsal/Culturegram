import { useState } from 'react';
import {RiUserFollowLine} from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import {createFollow, removeFollow} from '../../store/follow';
import {authenticate} from '../../store/session';

function Follow({follow, setFollow, following_id}){
  const dispatch = useDispatch();
  const [disable, setDisable] = useState();

  const onClickFollow = async () => {
    setDisable(true)
    if (follow) {
      await dispatch(removeFollow(Object.keys(follow)[0]))
      setFollow(false)
    } else {
      const follow = await dispatch(createFollow(following_id))
      const id = follow.id
      await setFollow({ [id]: true })
    }
    await dispatch(authenticate());
    setTimeout(function () {
    setDisable(false)
    }, [500])
  }

  return(
    <div className="follow-container" onClick={onClickFollow}>
    {
      follow ? <RiUserFollowLine /> : <p>Follow</p>
    }

    </div>
  )
}

export default Follow;

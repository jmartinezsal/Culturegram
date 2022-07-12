const LOAD = 'likes/LOAD_LIKES';
const CREATE = 'likes/CREATE_LIKE';
const REMOVE = 'likes/REMOVE_LIKE';


const load = (likes) => {
  return {
    type: LOAD,
    likes
  }
}


const create = (like) => {
  return {
    type: CREATE,
    like
  }
}



const remove = (likeId) => {
  return {
    type: REMOVE,
    likeId,
  }
}

export const loadLikes = () => async dispatch => {
  const res = await fetch('/api/likes');

  if (res.ok) {
    const likes = await res.json();
    dispatch(load(likes))
  }

}

export const createLike = (postId) => async dispatch => {
  const res = await fetch(`/api/likes/${postId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postId),
    });

  if (res.ok) {
    const like = await res.json()
    dispatch(create(like))
    return like
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
}



export const removeLike = (likeId) => async dispatch => {
  const res = await fetch(`/api/likes/${likeId}`,{
    method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

  if(res.ok){
    dispatch(remove(likeId))
    return likeId;
  }

}


const likeReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return action.likes;
    case CREATE: {
      const newState = { ...state, [action.like.id]: action.like};
      return newState;
    }
    case REMOVE: {
      const newState = { ...state };
      delete newState[action.likeId];
      return newState;
    }
    default:
      return state
  }

}

export default likeReducer;

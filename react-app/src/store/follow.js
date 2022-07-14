const LOAD = 'follows/LOAD_FOLLOWS';
const CREATE = 'follows/CREATE_FOLLOW';
const UPDATE = 'follows/UPDATE_FOLLOW';
const REMOVE = 'follows/REMOVE_FOLLOW';


const load = (follows) => {
  return {
    type: LOAD,
    follows
  }
}


const create = (follow) => {
  return {
    type: CREATE,
    follow
  }
}

const update = (follow) => {
  return {
    type: UPDATE,
    follow
  }
}


const remove = (followId) => {
  return {
    type: REMOVE,
    followId,
  }
}

export const loadFollows = () => async dispatch => {
  const res = await fetch('/api/follows');

  if (res.ok) {
    const follows = await res.json();
    dispatch(load(follows))
  }

}

export const createFollow = (following_id) => async dispatch => {
  const res = await fetch(`/api/follows/${following_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(following_id),
    });

  if (res.ok) {
    const follow = await res.json()
    dispatch(create(follow))
    return follow
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
}

export const updateFollow = (payload) => async dispatch => {
  const res = await fetch(`/api/follows/edit/${payload.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

  if (res.ok) {
    const follow = await res.json()
    dispatch(update(follow))
    return follow
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
}

export const removeFollow = (user_following_id) => async dispatch => {
  const res = await fetch(`/api/follows/delete/${user_following_id}`,{
    method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

  if(res.ok){
    dispatch(remove(user_following_id))
    return user_following_id;
  }

}


const followReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return action.follows;
    case CREATE: {
      const newState = { ...state, [action.follow.id]: action.follow };
      return newState;
    }
    case UPDATE: {
      const newState = { ...state, [action.follow.id]: action.follow };
      return newState;
    }
    case REMOVE: {
      const newState = { ...state };
      delete newState[action.followId];
      return newState;
    }
    default:
      return state
  }

}

export default followReducer;

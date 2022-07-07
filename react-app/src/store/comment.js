const LOAD = 'comments/LOAD_COMMENTS';
const CREATE = 'comments/CREATE_COMMENT';
const UPDATE = 'comments/UPDATE_COMMENT';
const REMOVE = 'comments/REMOVE_COMMENT';


const load = (comments) => {
  return {
    type: LOAD,
    comments
  }
}


const create = (comment) => {
  return {
    type: CREATE,
    comment
  }
}

const update = (comment) => {
  return {
    type: UPDATE,
    comment
  }
}


const remove = (commentId) => {
  return {
    type: REMOVE,
    commentId,
  }
}

export const loadComments = () => async dispatch => {
  const res = await fetch('/api/comments');

  if (res.ok) {
    const comments = await res.json();
    dispatch(load(comments))
  }

}

export const createComment = (payload) => async dispatch => {
  const res = await fetch(`/api/comments/${payload.postId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

  if (res.ok) {
    const comment = await res.json()
    dispatch(create(comment))
    return comment
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
}

export const updateComment = (payload) => async dispatch => {
  const res = await fetch(`/api/comments/edit/${payload.postId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

  if (res.ok) {
    const comment = await res.json()
    dispatch(update(comment))
    return comment
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
}

export const removeComment = (commentId) => async dispatch => {
  const res = await fetch(`/api/comments/delete/${commentId}`,{
    method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

  if(res.ok){
    dispatch(remove(commentId))
    return commentId;
  }

}


const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return action.comments;
    case CREATE: {
      const newState = { ...state, [action.comment.id]: action.comment };
      return newState;
    }
    case UPDATE: {
      const newState = { ...state, [action.comment.id]: action.comment };
      return newState;
    }
    case REMOVE: {
      const newState = { ...state };
      delete newState[action.commentId];
      return newState;
    }
    default:
      return state
  }

}

export default commentReducer;

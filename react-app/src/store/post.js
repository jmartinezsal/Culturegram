const LOAD = 'posts/LOAD_POSTS';
const CREATE = 'posts/CREATE_POST';
const UPDATE = 'posts/UPDATE_POST';
const REMOVE = 'posts/REMOVE_POST';


const load = (posts) => {
  return {
    type: LOAD,
    posts
  }
}


const create = (post) => {
  return {
    type: CREATE,
    post
  }
}

const update = (post) => {
  return {
    type: UPDATE,
    post
  }
}


const remove = (postId) => {
  return {
    type: REMOVE,
    postId,
  }
}

export const loadPosts = () => async dispatch => {
  const res = await fetch("/api/posts")

  if (res.ok) {
    const posts = await res.json()
    dispatch(load(posts))
  }
}

export const createPost = (payload) => async dispatch => {
  const res = await fetch("/api/posts/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const post = await res.json()
    dispatch(create(post));
    return post;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
}

export const updatePost = (payload) => async dispatch => {
  const res = await fetch(`/api/posts/edit/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const post = await res.json()
    dispatch(update(post))
    return post
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
}

export const removePost = (postId) => async dispatch => {
  const res = await fetch(`/api/posts/delete/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    dispatch(remove(postId))
    return postId
  }
}

//AWS upload images
export const uploadImage = (imageData) => async dispatch => {
  const { url, post_id, image } = imageData;

  const formData = new FormData();
  formData.append("url", url);
  formData.append("post_id", post_id);
  formData.append("image", image);

  console.log(formData)

  const res = await fetch('/api/images/upload', {
    method: "POST",
    body: formData,
  });


  if (res.ok) {
    return await res.json();
  }

}


const postReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return action.posts;
    case CREATE: {
      const newState = { ...state, [action.post.id]: action.post };
      return newState;
    }
    case UPDATE: {
      const newState = { ...state, [action.post.id]: action.post };
      return newState;
    }
    case REMOVE: {
      const newState = { ...state };
      delete newState[action.postId];
      return newState;
    }
    default:
      return state
  }

}

export default postReducer;

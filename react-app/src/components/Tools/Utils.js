export function timeUpdatedAt(updatedAt){
  const today = new Date();
  const updated = new Date(updatedAt)
  const offset = today.getTimezoneOffset()
  const postedTime = today - updated - offset
  let diffDays = Math.floor(postedTime / 86400000); // days
  let diffHrs = Math.floor((postedTime % 86400000) / 3600000); // hours
  let diffMins = Math.round(((postedTime % 86400000) % 3600000) / 60000); // minutes

  if( diffDays > 10 ){
    return `${updated.getMonth()} ${updated.getDay()}, ${updated.getFullYear()} `
  }
  if(Number.isInteger(diffDays) && diffDays !== 0){
    return`${diffDays} days ago`;
  } else if(Number.isInteger(diffHrs) && diffHrs !== 0){
    return  `${diffHrs}  hours ago`;
  }else if(Number.isInteger(diffMins)){
    return `${diffMins} minutes ago`;
  }
}

export const likedChecker = (post, sessionUser, likes) => {
  let likeIds = post.likes;
  for (const id of likeIds) {
    let userId =  likes[id]?.userId;
    if(userId ===sessionUser.id) return {[id]: true}
  }
  return false;
}

export const commentsForPost = (post, comments) => {
  let commentsId = post.comments;
  let commentsFiltered = [];
  for (const id of commentsId) {
    commentsFiltered.push(comments[id])
  }
  return commentsFiltered;
}

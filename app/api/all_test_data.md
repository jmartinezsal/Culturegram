#This will be used to test out the routes in a faster manner

### Sessions POST AND PUT data
* Post
{
  "username":"creator",
  "email" : "test@test.com",
  "password":"password",
  "first_name":"test",
  "last_name":"creator",
  "bio": "THIS IS A SMALL BIO"

}

* PUT
{
  "first_name":"test",
  "last_name":"creator",
  "bio": "THIS IS A SMALL BIO",
 "private": false
}

### Posts POST AND PUT data
* Post
{
  "content": "This is the content for the post"
}

* PUT
{
  "content": "This is the edited content for the post"
}


### Comments POST AND PUT data
* Post
{
  "comment": "This is the comment for the post"
}

* PUT
{
  "comment": "This is the edited comment for the post"
}

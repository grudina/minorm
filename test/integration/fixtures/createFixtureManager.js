/** @flow */
import type {Manager} from '../../../src/types'

function randomString() {
  return Math.random().toString(36).substring(7)
}

function range(from, to): Array<number> {
  return Array.from(new Uint32Array(to - from + 1).map((val, index) => index + from))
}

export function createFixtureManager(manager: Manager) {

  let usersCount = 0

  function createUser(): Promise<Object> {
    return manager.getRepository('users')
      .create({
        login: 'user' + (++usersCount),
        password: randomString()
      })
      .save()
  }

  function createUsers(count: number = 1): Promise<Array<Object>> {
    return Promise.all(range(0, count).map(createUser))
  }

  function createPostToUser(id: number): Promise<Object> {
    return manager.getRepository('posts')
      .create({
        title: 'post ' + randomString(),
        body: randomString(),
        creator_id: id
      })
      .save()
  }

  async function createPost(): Promise<Object> {
    const user = await createUser()
    return createPostToUser(user.id)
  }

  function createPostsToUser(count: number = 1, id: number): Promise<Array<Object>> {
    return Promise.all(range(0, count).map(createPostsToUser.bind(id)))
  }

  async function createPosts(userCount?: number = 1, postsPerUser?: number = 1): Promise<Array<Array<Object>>> {
    const users = await createUsers(usersCount)
    return Promise.all(users.map(user => createPostsToUser(postsPerUser, user.id)))
  }

  function createPostComment(postId: number, userId: number): Promise<Object> {
    return manager.getRepository('comments')
      .create({
        creator_id: userId,
        post_id: postId,
        body: randomString()
      })
      .save()
  }

  async function createPostCommentWithUser(postId: number): Promise<Object> {
    const user = await createUser()
    return createPostComment(postId, user.id)
  }

  async function createPostWithComments(count: number = 1): Promise<Array<Object>> {
    const post = await createPost()
    return Promise.all(range(0, count).map(createPostCommentWithUser.bind(post.id)))
  }

  return {
    createUser,
    createUsers,

    createPost,
    createPostsToUser,
    createPosts,

    createPostComment,
    createPostCommentWithUser,
    createPostWithComments
  }
}

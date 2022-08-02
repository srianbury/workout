function PostView({ post }) {
  console.log({ post });
  return (
    <div>
      <main>
        <h1>Post {post.postId}</h1>
        <div>TODO: Design the Post layout</div>
      </main>
    </div>
  );
}

export { PostView };

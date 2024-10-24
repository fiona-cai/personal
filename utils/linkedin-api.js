import React from 'react';

const LinkedInPost = ({ post }) => (
  <div className="linkedin-post">
    <h3>{post.specificContent['com.linkedin.ugc.ShareContent'].shareCommentary.text}</h3>
    <p>Posted on: {new Date(post.created.time).toLocaleDateString()}</p>
  </div>
);

const LinkedInPosts = ({ posts }) => (
  <div className="linkedin-posts">
    <h2>My LinkedIn Posts</h2>
    {posts.map((post) => (
      <LinkedInPost key={post.id} post={post} />
    ))}
  </div>
);

export default LinkedInPosts;
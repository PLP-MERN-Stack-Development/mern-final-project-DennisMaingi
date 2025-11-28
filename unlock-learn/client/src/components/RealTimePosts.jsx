// client/src/components/RealTimePosts.jsx
import { useEffect, useState } from 'react';
import { useSocket } from '@/hooks/useSocket';

const RealTimePosts = () => {
  const [posts, setPosts] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Listen for new posts
    socket.on('new_post', (newPost) => {
      setPosts(prev => [newPost, ...prev]);
    });

    // Listen for post updates
    socket.on('post_updated', (updatedPost) => {
      setPosts(prev => prev.map(post => 
        post._id === updatedPost._id ? updatedPost : post
      ));
    });

    // Listen for post deletions
    socket.on('post_deleted', (postId) => {
      setPosts(prev => prev.filter(post => post._id !== postId));
    });

    // Cleanup listeners
    return () => {
      socket.off('new_post');
      socket.off('post_updated');
      socket.off('post_deleted');
    };
  }, [socket]);

  return (
    <div>
      {posts.map(post => (
        <div key={post._id}>{post.title}</div>
      ))}
    </div>
  );
};

export default RealTimePosts;
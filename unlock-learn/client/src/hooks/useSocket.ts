import { useEffect, useRef } from 'react';
import socketService from '@/lib/socket';

export const useSocket = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to socket when hook is used
    socketService.connect();
    socketRef.current = socketService.getSocket();

    return () => {
      // Cleanup on unmount (but keep connection for now)
      // socketService.disconnect();
    };
  }, []);

  return socketRef.current;
};
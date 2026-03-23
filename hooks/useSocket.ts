import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL =
    process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

// Initialize OUTSIDE the hook to keep a single instance
const socket: Socket = io(SOCKET_URL, {
    transports: ['websocket', 'polling'],
    autoConnect: true, // You can set this to false if you want to connect manually
    auth: (cb) => {
        // Since this runs on the client, we use a client-side cookie getter
        const token = Cookies.get('ecommerce-accessToken');
        cb({ token: token || null });
    },
});

export const useSocket = () => {
    const [connected, setConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            setConnected(true);
            console.log('✅ Connected to server:', socket.id);
        }

        function onDisconnect() {
            setConnected(false);
            console.log('❌ Disconnected from server');
        }

        function onWelcome(data: { message: string }) {
            console.log('📨 Server message:', data.message);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('connected', onWelcome);

        // If it's already connected when the component mounts
        if (socket.connected) {
            setConnected(true);
        }

        return () => {
            // Only turn off listeners, DON'T disconnect the global socket
            // unless you want to kill the connection every time the component unmounts
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('connected', onWelcome);
        };
    }, []);

    return { socket, connected };
};

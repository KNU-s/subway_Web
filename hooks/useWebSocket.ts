import { LoadingState, Message } from '@/types/webSocket';
import { useCallback, useEffect, useRef, useState } from 'react';

type UseWebSocket = (lineName: string) => [Message, LoadingState];

const useWebSocket: UseWebSocket = (lineName) => {
  const [message, setMessage] = useState<Message>([]);
  const [loading, setLoading] = useState(true);
  const webSocket = useRef<WebSocket | null>(null); // 소켓을 저장할 인스턴스 변수
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const connectWebSocket = useCallback(() => {
    const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
    if (!socketUrl) {
      throw new Error('WebSocket URL is not defined in environment variables.');
    }
    webSocket.current = new WebSocket(socketUrl);

    /* 웹소켓을 열면 노선 이름을 전송하고, 5초마다 전송하도록 설정 */
    webSocket.current.onopen = () => {
      const sendLineName = () => {
        if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
          webSocket.current.send(`노선_${lineName}`);
        } else {
          console.error('WebSocket is not open.');
        }
      };
      sendLineName(); // 웹소켓 연결 후 전송
      intervalRef.current = setInterval(sendLineName, 5000); // 인터벌 설정
      setLoading(false);
    };

    webSocket.current.onmessage = (event) => {
      const uuidRegex =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
      const message = event.data;
      if (uuidRegex.test(message)) return; // UUID 형식의 메시지라면 패스한다

      try {
        const data = JSON.parse(message);
        setMessage(data);
      } catch (error) {
        console.log('Failed to parse JSON message:', error);
      }
    };

    webSocket.current.onclose = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // 인터벌 해제
        intervalRef.current = null;
      }
      setLoading(true);
      setTimeout(() => connectWebSocket(), 1000); // 재연결 시도
    };

    webSocket.current.onerror = (error) => {
      console.error('WebSocket Error: ', error);
      setLoading(false);
    };
  }, [lineName]);

  useEffect(() => {
    if (!lineName) return; // lineName이 설정된 후에만 웹소켓 연결을 시도
    connectWebSocket();

    // 컴포넌트 언마운트 시 웹소켓과 인터벌 해제
    return () => {
      if (webSocket.current) {
        webSocket.current.close();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [lineName, connectWebSocket]);

  return [message, loading];
};

export default useWebSocket;

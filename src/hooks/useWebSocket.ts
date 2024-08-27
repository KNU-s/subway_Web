import { useCallback, useEffect, useRef, useState } from "react";

interface Message {
  arvlMsg: string;
  arvlStatus: string;
  bstatnNm: string;
  btrainNo: string;
  btrainSttus: string;
  statnFNm: string;
  statnNm: string;
  statnTNm: string;
  updnLine: string;
}

type LoadingState = boolean;
type UseWebSocket = (lineName: string) => [Message[], LoadingState];

/* 지하철 노선 번호를 받아서 해당 노선 열차의 실시간 정보와 로딩 중인지 반환한다 */
const useWebSocket: UseWebSocket = (lineName) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const webSocket = useRef<WebSocket | null>(null); // 소켓을 저장할 인스턴스 변수

  const connectWebSocket = useCallback(() => {
    const socketUrl = process.env.REACT_APP_WEBSOCKET_URL; // WebSocket 연결 초기화

    // socketUrl이 undefined인 경우 에러 발생시킨다
    if (!socketUrl) {
      throw new Error("WebSocket URL is not defined in environment variables.");
    }
    webSocket.current = new WebSocket(socketUrl);

    // 소켓 연결 시
    webSocket.current.onopen = () => {
      const sendMessage = (message: string): void => {
        if (
          webSocket.current &&
          webSocket.current.readyState === WebSocket.OPEN
        ) {
          webSocket.current.send(message);
          setLoading(true);
        } else {
          console.error(
            "WebSocket is not open. ReadyState: " +
              (webSocket.current ? webSocket.current.readyState : "N/A")
          );
        }
      };

      sendMessage(lineName); // 메시지 전송
    };

    // 서버로부터 메시지를 수신했을 때 호출
    webSocket.current.onmessage = (event) => {
      // UUID 형식을 식별하기 위한 정규 표현식
      const uuidRegex =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
      const message = event.data;
      if (uuidRegex.test(message)) return; // UUID 형식의 메시지라면 패스한다

      try {
        const data = JSON.parse(message);
        setMessages((prev) => [...prev, data]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to parse JSON message:", error);
      }
    };

    // 소켓 해제 시 이벤트
    webSocket.current.onclose = () => {
      setTimeout(() => connectWebSocket(), 1000); // 재연결 시도
    };

    webSocket.current.onerror = (error) => {
      console.error("[웹소켓 에러]", error);
      setLoading(false);
    };
  }, [lineName]);

  useEffect(() => {
    if (!lineName) return; // lineName이 설정된 후에만 웹소켓 연결을 시도
    connectWebSocket();
    return () => {
      if (webSocket.current) {
        webSocket.current.close();
      }
    };
  }, [lineName, connectWebSocket]);

  return [messages, loading];
};

export default useWebSocket;

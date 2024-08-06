import { useEffect, useRef, useState } from "react";

/**
 * 지하철 노선 번호를 받아서 해당 노선 열차의 실시간 정보와 로딩 중인지 반환한다
 * @param {String} stationLine
 * @returns [messages, loading, socketConnected]
 */
const useWebSocket = (lineName) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const webSocket = useRef(null); // 소켓을 저장할 인스턴스 변수

  // str이 JSON인지 확인하는 함수
  const isJson = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      // console.warn("[isJson 에러]", str);
      return false;
    }
  };

  useEffect(() => {
    if (!lineName) return; // lineName이 설정된 후에만 웹소켓 연결을 시도

    // WebSocket 연결 초기화
    webSocket.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    // 소켓 연결 시
    webSocket.current.onopen = () => {
      console.log(`[웹소켓 연결] ${lineName}`);
      sendMessage(`${lineName}`); // 메시지 전송
      setSocketConnected(true);
    };

    // 서버로부터 메시지를 수신했을 때 호출
    webSocket.current.onmessage = (event) => {
      if (isJson(event.data)) {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
        setLoading(false);
      }
    };

    // 소켓 해제 시 이벤트
    webSocket.current.onclose = () => {
      console.log("[웹소켓 연결 해제]");
      setSocketConnected(false);
    };

    webSocket.current.onerror = (error) => {
      console.log("[웹소켓 에러]", error);
      setLoading(false);
      setSocketConnected(false);
    };

    return () => {
      webSocket.current?.close();
    };
  }, [lineName]);

  const sendMessage = (message) => {
    if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
      webSocket.current.send(message);
      setLoading(true);
    } else {
      console.error(
        "WebSocket is not open. ReadyState: " +
          (webSocket ? webSocket.current.readyState : "N/A")
      );
    }
  };

  return [messages, loading, socketConnected];
};

export default useWebSocket;

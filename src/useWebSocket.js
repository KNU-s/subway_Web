import { useEffect, useRef, useState } from "react";

const WEBSOCKET_URL = `ws://3.37.98.203:8090/socket.subway`;

/**
 * 지하철 노선 번호를 받아서 해당 노선 열차의 실시간 정보와 로딩 중인지 반환한다
 * @param {String} stationLine
 * @returns [messages, loading]
 */
const useWebSocket = (stationLine) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  let webSocket = useRef(null);

  useEffect(() => {
    // WebSocket 연결 초기화
    webSocket.current = new WebSocket(WEBSOCKET_URL);

    webSocket.current.onopen = () => {
      console.log("[웹소켓 연결]");
      sendMessage(stationLine); // 메시지 전송
      setSocketConnected(true);
    };

    // 서버로부터 메시지를 수신했을 때 호출
    webSocket.current.onmessage = (event) => {
      console.log(event.data);
      setMessages((prev) => [...prev, event.data]);
      setLoading(false);
    };

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
      console.log("clean up");
      webSocket.current?.close();
    };
  }, [stationLine]);

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

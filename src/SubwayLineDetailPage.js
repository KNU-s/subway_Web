import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "./useWebSocket";

const SubwayLineDetailPage = () => {
  const { lineNumber } = useParams();
  const [messages, loading, socketConnected] = useWebSocket(lineNumber);

  useEffect(() => {
    // 서버에서 5초마다 실시간 열차 정보가 오면 처리
    console.log(messages);
  }, [messages]);

  return (
    <div>
      <h1>{lineNumber}호선</h1>
      <div>{socketConnected ? "[연결됨]" : "[연결끊김]"}</div>
      <div>
        {socketConnected &&
          (loading ? "로딩 중..." : <div>메세지: {messages.length}개</div>)}
      </div>
    </div>
  );
};

export default SubwayLineDetailPage;

import useWebSocket from "./useWebSocket";

const SubwayLine1st = () => {
  const STATION_LINE = "1호선";
  const [messages, loading, socketConnected] = useWebSocket(STATION_LINE);

  return (
    <div>
      <h1>{STATION_LINE}</h1>
      <div>{socketConnected ? "[연결됨]" : "[연결끊김]"}</div>
      <div>메세지: {messages.length}개</div>
      {/* <button onClick={sendMessage}>정보 받아오기</button> */}
      <div>{loading ? "로딩 중..." : ""}</div>
      <div>
        {messages?.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
};

export default SubwayLine1st;

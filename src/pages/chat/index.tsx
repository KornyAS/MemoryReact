import { useEffect, useState } from "react";
import { GoArrowUp } from "react-icons/go";
import API from "../../constans/Api";
import "./chat.css";

type User = {
  ID: string;
  TimeMessToCompany: string;
  UserName: string;
  UserPhone: string;
};

type Message = {
  ID: string;
  Message: string;
  OperatorIconUrl: string;
  OperatorName: string;
  Time: string;
  isMine: string;
};

const Chat = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const defaultUserId = new URLSearchParams(window.location.search).get(
    "userId"
  );
  const [userId, setUserId] = useState(defaultUserId || "");

  const getUsers = async () => {
    console.log(1);

    const { data } = await API.get("/chat.php");
    setUsers(data);
  };

  const getMessages = async () => {
    const { data } = await API.get(`/chat.php?ID=${userId}`);
    console.log(data);

    setMessages(data);
  };

  const user = users.filter(
    (user) => user.ID.toString() === userId.toString()
  )[0];

  const handleMessage = async (e) => {
    e.preventDefault();
    await API.post(`/chat.php?ID=${userId}`, {
      Message: answer,
    });
    setAnswer("");
    getUsers();
    getMessages();
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getMessages();
  }, [userId]);

  return (
    <div className="wrapper">
      <div className="w-full flex flex-col text-center items-center">
        <h1 className="text-2xl mt-4 mb-8">Чат</h1>
        <div className="w-9/12 flex p-4 chatWrapper">
          <div className="w-4/12 flex flex-col border-r-2 pr-2 overflow-y-scroll">
            <input
              type="text"
              placeholder="Поиск"
              className="py-3 px-4 border-2 border-gray-300 w-full"
              style={{ borderRadius: "2rem", backgroundColor: "#F4F4F4" }}
            />
            <div>
              {users &&
                users.map((user) => (
                  <div
                    onClick={() => setUserId(user.ID)}
                    key={user.ID}
                    className="text-start font-medium text-lg "
                  >
                    {user.UserName.length < 15
                      ? user.UserName
                      : `${user.UserName.slice(0, 15)}...`}
                  </div>
                ))}
            </div>
          </div>
          <div className="w-9/12 flex flex-col">
            {user && (
              <div className="w-full border-b-2">
                <h2 className="text-2xl font-bold mt-6">{user.UserName}</h2>
                <p className="text-sky-400 text-l font-bold">
                  {user.UserPhone}
                </p>
              </div>
            )}
            <div className="row-span-5 col-span-4 border-l chatBlock border-gray-200 grid grid-rows-6">
              <div className="row-span-5">
                <div className="text-center text-gray-400 mb-4">Сегодня</div>
                {!!messages.length &&
                  messages
                    .sort((item1, item2) => Number(item1.ID) - Number(item2.ID))
                    .map((message) => {
                      if (message.isMine === "1") {
                        return (
                          <div className="messageWrapper messageWrapperY">
                            <div key={message.ID}>
                              <div className="message messageY text-sm font-medium">
                                {message.Message}
                              </div>
                              <p className="text-xs px-2">
                                Отправлено: {message.Time}
                              </p>
                            </div>
                          </div>
                        );
                      } else if (message.isMine === "0") {
                        return (
                          <div className="messageWrapper messageWrapperM">
                            <div key={message.ID}>
                              <div className="bg-sky-400 message messageM text-sm font-medium">
                                {message.Message}
                              </div>
                              <p className="text-xs px-2">{message.Time}</p>
                            </div>
                          </div>
                        );
                      }
                    })}
              </div>
            </div>
            <form className=" ">
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                type="text"
                placeholder="Текст сообщения"
                className="py-3 pl-4 border-2 border-gray-300 mt-6 w-full mx-2"
                style={{
                  borderRadius: "2rem",
                  backgroundColor: "#F4F4F4",
                }}
              />
              <button
                onClick={(e) => handleMessage(e)}
                className="button bg-sky-400 p-2 text-white arrowAccept"
                style={{ borderRadius: "2rem" }}
              >
                <GoArrowUp />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

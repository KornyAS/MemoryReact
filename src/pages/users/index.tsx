import { useState, useEffect } from "react";
import API from "../../constans/Api";
import { useAppDispatch } from "../../store";
import { openModal } from "../../store/ui/actions";

export type UserType = {
  Adress: string;
  City: string;
  Email: string;
  ID: string;
  IconUrl: any;
  Name: string;
  OwnerID: string;
  Pasport: string;
  Phone: string;
  SendMessages: string;
  last_order: number;
  order_count: number;
  MessagingToken: string;
};

const Users = () => {
  const dispatch = useAppDispatch();
  const [sendMessage, setSendMessage] = useState<any[]>([]);
  const [sendMessageAll, setSendMessageAll] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [filters, setFilters] = useState<any>({
    city: "",
    phone: "",
    markPlace: 1,
    ordersCount: "",
    page: "",
  });

  const fetchUsers = async () => {
    const res = await API.get(`/users.php`, {
      params: {
        city: filters.city,
        phone: filters.phone,
        mark_place: filters.markPlace,
        orders_count: filters.ordersCount,
        list_limit: users.length + 10,
      },
    });
    console.log(res);
    setUsers(res.data.users || []);
  };

  const handleChangeFilters = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  useEffect(() => {
    if (!fetching) return;
    fetchUsers();
    setFetching(false);
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  const handleAddUserToSendMessage = (MessagingToken: string) => {
    if (!MessagingToken || sendMessageAll) return;
    if (!sendMessage.length) {
      setSendMessage([MessagingToken]);
      return;
    }
    if (sendMessage.includes(MessagingToken)) {
      const updatedUsers = sendMessage.filter(
        (item) => item.MessagingToken === MessagingToken
      );
      setSendMessage(updatedUsers);
      return;
    }
    setSendMessage([...sendMessage, MessagingToken]);
  };

  return (
    <div className="flex justify-center h-[2000px]">
      <div className="container max-w-6xl">
        <h1 className="text-center font-bold text-xl">
          Пользователи приложения
        </h1>
        <div className="mx-auto text-center mt-16 mb-8">
          <input
            value={filters.city}
            onChange={(e) => handleChangeFilters("city", e.target.value)}
            placeholder="Введите город"
            className="py-5 px-16 text-gray-800 bg-gray-100 rounded-3xl border-2 border-gray-300 mx-auto"
            style={{ borderRadius: "2rem" }}
          />
        </div>
        <div className="grid grid-cols-6 gap-x-4 text-center w-96 mx-auto my-auto">
          <button
            onClick={() => handleChangeFilters("markPlace", 1)}
            className={`${
              filters.markPlace === 1
                ? "bg-gray-900 text-white col-span-2 border px-8 py-2 font-bold"
                : "bg-gray-200 col-span-2 border px-8 py-2 font-bold"
            }`}
            style={{ borderRadius: "2rem" }}
          >
            Все
          </button>
          <button
            onClick={() => handleChangeFilters("markPlace", 2)}
            className={`${
              filters.markPlace === 2
                ? "bg-gray-900 text-white col-span-4 border px-8 py-2 font-bold"
                : "bg-gray-200 col-span-4 border px-8 py-2 font-bold"
            }`}
            style={{ borderRadius: "2rem" }}
          >
            Добавлены могилки
          </button>
        </div>
        <div className=" my-auto mt-8">
          <form
            action=""
            className="w-full flex justify-center"
            name="adminSearch"
            method="POST"
          >
            <input
              value={filters.phone}
              onChange={(e) => handleChangeFilters("phone", e.target.value)}
              type="phone"
              placeholder="Номер телефона"
              className="text-xl bg-gray-100 border-2 border-gray-300 py-1 px-6 col-span-3"
              style={{ borderRadius: "2rem" }}
            />
            <div className="col-span-1 hidden">
              <button
                className="bg-sky-400 border rounded-3xl py-2 px-14 text-white"
                type="submit"
                style={{ borderRadius: "2rem" }}
              >
                Показать
              </button>
              <p className="text-center text-ls">
                {users && users.length} найдено
              </p>
            </div>
          </form>
          <div>
            <div className="grid grid-cols-4 grid-rows-2">
              <p className="text-right">{filters.ordersCount}</p>
              <p className="text-right col-span-2">400</p>
              <form
                action=""
                name="ordersCount"
                method="POST"
                className="grid grid-cols-4 col-span-4"
              >
                <label htmlFor="valueOfOreders" className="col-span-1">
                  Количетсво заказов
                </label>
                <input
                  onChange={(e) =>
                    handleChangeFilters("ordersCount", e.target.value)
                  }
                  value={filters.ordersCount || 0}
                  id="slider-snap"
                  type="range"
                  step={1}
                  min={0}
                  max={400}
                  name="oredersValue"
                  className="col-span-2"
                />
              </form>
            </div>
          </div>
          <div>
            <div className="grid gap-4 mt-6 pb-32">
              {users &&
                users.map((user, index) => (
                  <div
                    key={index}
                    className=" bg-gray-900 text-white pl-4 py-4 grid grid-cols-10 hcard"
                    style={{
                      borderRadius: "2rem",
                      backgroundColor: user.MessagingToken
                        ? sendMessage.includes(user.MessagingToken) ||
                          sendMessageAll
                          ? "rgb(56 189 248)"
                          : "#404040"
                        : "#404040",
                    }}
                    onClick={() =>
                      handleAddUserToSendMessage(user.MessagingToken)
                    }
                  >
                    <div className="col-span-3 text-xl h-full grid grid-rows-2">
                      <b>{user.Name}</b>
                      <p>{user.Phone}</p>
                    </div>
                    <div className="col-span-4"></div>
                    <div className="col-span-3">
                      <div className="grid grid-cols-3">
                        <p className="col-span-2">Количетсво заказов:</p>
                        <b className="col-span-1 text-left text-l">
                          {user.order_count}
                        </b>
                      </div>
                      <div>
                        <p>Дата последнего заказа: {user.last_order}</p>
                      </div>
                      <div>
                        <p>Город: {user.City}</p>
                      </div>
                    </div>
                  </div>
                ))}
              {fetching && <span>Loading...</span>}
            </div>
          </div>
        </div>
        {/* {modalAvtive && (
          <UsersModal active={modalAvtive} setActive={setModalActive} />
        )} */}
        {/* <style>{css}</style> */}
      </div>
      <div
        className={`w-full fixed bottom-0 bg-white py-4 ${
          sendMessage.length > 0 || sendMessageAll ? "block" : "hidden"
        }`}
      >
        <div className="w-full flex justify-around">
          <button
            onClick={() => {
              setSendMessageAll(false);
              setSendMessage([]);
            }}
            className="bg-sky-400 border rounded-3xl py-2 px-14 text-white"
          >
            Отменить выделение
          </button>{" "}
          <button
            onClick={() => setSendMessageAll(true)}
            className="bg-sky-400 border rounded-3xl py-2 px-14 text-white"
          >
            Выделить все
          </button>{" "}
          <button
            className="bg-sky-400 border rounded-3xl py-2 px-14 text-white"
            onClick={() =>
              dispatch(
                openModal({
                  modalName: "userModal",
                  data: sendMessageAll ? "all" : sendMessage,
                  open: true,
                })
              )
            }
          >
            Отправить Push-уведомление
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;

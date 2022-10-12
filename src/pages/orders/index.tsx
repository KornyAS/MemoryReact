import { useEffect, useState } from "react";

import { AiOutlineBook, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import API from "../../constans/Api";
import { useAppDispatch } from "../../store";
import { openOrderModal } from "../../store/ui/actions";

export type UserData = {
  ID: string;
  IsHaveNewMessage: string;
  MessagingToken: string;
  SendMesToCompany: string;
  TimeMessToCompany: string;
  Name: string;
  Phone: string;
};
export type ImageType = {
  ID: string;
  URL: string;
};

export type OrderType = {
  BundleID: string;
  CompanyID: string;
  ComplectationID: string;
  ComplectationName: string;
  CreateTime: string;
  DateOfBith: string;
  DateOfDeath: string;
  DocumentNumber: any;
  ID: string;
  Name: string;
  OrderID: string;
  Price: string;
  ServiceDescription: string;
  ServiceID: string;
  ServiceTitle: string;
  ServiceType: string;
  UserID: string;
  images: ImageType[];
  userData: UserData[];
};

interface IOrders {
  orders: OrderType[] | [];
  statistics: any;
}

const AllOrders = () => {
  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [statistics, setStatistics] = useState<any>();
  const [cities, setCities] = useState([]);
  const [filters, setFilters] = useState({
    phone: "",
    date: "",
    city: "",
    thisDay: false,
  });

  const fetchOrders = async () => {
    const params: any = {};
    if (filters.phone) {
      params.phone = filters.phone;
    }
    if (filters.date) {
      params.period = filters.date;
    }
    if (filters.city) {
      params.city = filters.city;
    }
    const { data } = await API.get(`/orders.php`, { params });
    console.log(data);

    setOrders(data.orders);
    setStatistics(data.statistics);
    setCities(data.cities);
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  return (
    <div className="flex justify-center">
      <div className="container bg-white max-w-6xl">
        <div className="w-full text-center">
          <span className="font-bold text-xl">Все заказы</span>
        </div>
        <div className="flex justify-center mt-3">
          <input
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="rounded-3xl py-2 px-8 text-white bg-cyan-500 mx-12"
            type="date"
          />

          <Link to="/new-orders">
            <button className="rounded-3xl py-2 px-8 text-white bg-cyan-500">
              Новые заказы
            </button>
          </Link>
        </div>
        <div className=" my-3">
          <div className=" flex justify-center">
            <div className="w-60 p-2 flex items-center justify-start rounded-xl bg-lime-500">
              <div className="w-14 h-14 m-2 flex items-center justify-center bg-white rounded-full">
                <AiOutlineBook className="w-10 h-10" />
              </div>{" "}
              <div className="text-white">
                <span className="font-bold	text-base">
                  {statistics?.total_count}
                </span>
                <br />{" "}
                <span className="break-words text-sm font-normal">
                  Количество заказов
                </span>
              </div>
            </div>
            <div className="w-60 p-2 flex items-center justify-start rounded-xl bg-cyan-500 mx-12">
              <div className="w-14 h-14 m-2 flex items-center justify-center bg-white rounded-full">
                <AiOutlineUser className="w-10 h-10" />
              </div>{" "}
              <div className="text-white">
                <span className="font-bold	text-base">
                  {statistics?.total_count_new}
                </span>
                <br />{" "}
                <span className="break-words text-sm font-normal">
                  Заказы от новых клиентов
                </span>
              </div>
            </div>
            <div className="w-60 p-2 flex items-center justify-start rounded-xl bg-violet-500">
              <div className="w-14 h-14 m-2 flex items-center justify-center bg-white rounded-full">
                <AiOutlineUser className="w-10 h-10" />
              </div>{" "}
              <div className="text-white">
                <span className="font-bold	text-base">
                  {statistics?.total_count_old}
                </span>
                <br />{" "}
                <span className="break-words text-sm font-normal">
                  Заказы тех кто уже делал заказ
                </span>
              </div>
            </div>
          </div>
          <div className="w-full text-center my-6">
            <span className="font-bold text-xl">Поиск</span>
          </div>
          <div className=" flex items-center justify-between">
            <input
              value={filters.phone}
              onChange={(e) =>
                setFilters({ ...filters, phone: e.target.value })
              }
              className="w-96 border rounded-3xl h-10 p-2 px-4 bg-slate-100"
              placeholder="Номер телефона"
              type="text"
              name=""
              id=""
            />
            {cities.length && (
              <select
                onChange={(e) =>
                  setFilters({ ...filters, city: e.target.value })
                }
                name=""
                id=""
                className="w-72 border rounded-3xl h-10 p-2 px-4 bg-slate-100"
              >
                {cities.map((city: string, i: number) => (
                  <option key={i} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="w-full flex flex-col justify-center mt-6 items-center">
            {orders &&
              !!orders.length &&
              orders.map((order, i) => (
                <div
                  key={i}
                  onClick={() =>
                    dispatch(
                      openOrderModal({
                        data: order,
                        open: true,
                      })
                    )
                  }
                  className=" w-full px-4 py-3 flex items-center justify-between rounded-2xl bg-neutral-800 mt-3"
                >
                  <div className="flex flex-col text-white">
                    <span>{order.userData[0].Name}</span>
                    <span>{order.userData[0].Phone}</span>
                  </div>
                  <div className="flex flex-col text-white">
                    <span>Номер заказа: {order.OrderID}</span>
                    <span>Дата заказа: {order.CreateTime}</span>
                    <span>Сумма заказа: {order.Price} ₽</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../constans/Api";
import { useAppDispatch } from "../../store";
import { openModal } from "../../store/ui/actions";
import { OrderType } from "./index";

const NewOrders = () => {
  const dispatch = useAppDispatch();
  const [newOrders, setNewOrders] = useState<OrderType[]>();

  const getNewOrders = async () => {
    const { data } = await API.get(`/orders.php`, {
      params: { this_day: 1 },
    });
    setNewOrders(data.orders);
  };

  useEffect(() => {
    getNewOrders();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-11/12 bg-white">
        <div className="w-full text-center">
          <span className="font-bold text-xl">Новые заказы</span>
        </div>
        <div className="w-full text-start">
          <span className="font-bold text-xl">Сегодня:</span>
        </div>
        {newOrders &&
          newOrders.map((order) => (
            <div className="w-full flex flex-col justify-berween ">
              <div className="w-full flex  justify-between mt-4">
                <div
                  onClick={() =>
                    dispatch(
                      openModal({
                        modalName: "newOrders",
                        data: order,
                        open: true,
                      })
                    )
                  }
                  className="px-4 w-3/4 py-3 flex items-center justify-between rounded-2xl bg-orange-400"
                >
                  <div className="flex flex-col text-white">
                    <span>{order.userData[0].Name}</span>
                    <span>{order.userData[0].Phone}</span>
                  </div>
                  <div className="flex flex-col text-white">
                    <span>Номер заказа: {order.ID}</span>
                    <span>Дата заказа: {order.CreateTime}</span>
                    <span>Сумма заказа: {order.Price} ₽</span>
                  </div>
                </div>
                <Link
                  to={`/chat?userId=${order.UserID}`}
                  className="w-32 flex items-center justify-center text-center rounded-2xl bg-orange-400"
                >
                  <span className="font-bold text-xl text-white">ЧАТ</span>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewOrders;

import React from "react";
import { useModal } from "../../store/ui/hooks";

const NewOrdersModal = () => {
  const modal = useModal();
  const data = modal?.data;
  console.log(data);

  return (
    <div className="m-6 flex flex-col items-center">
      <div className="w-full text-center">
        <span className="text-5xl font-medium">
          Номер заказа: {data && data.OrderID}
        </span>
      </div>
      <table className="mt-6">
        <tbody>
          <tr className="text-start">
            <td align="left">
              <div className="flex items-start mr-3 p-2 justify-start border  rounded-md">
                <div>
                  <img
                    className="object-cover rounded-md w-20 h-20"
                    src={
                      data &&
                      data.images &&
                      data.images.length &&
                      data.images[0].URL
                    }
                    alt=""
                  />
                </div>
                <div className="ml-2">
                  <span className="break-words font-medium">
                    {data && data.ServiceTitle}
                  </span>
                  <br />
                  <span className="break-words font-semibold text-cyan-500">
                    {data && data.Price} ₽
                  </span>
                </div>
              </div>
            </td>
            {/* <td align="left" className="">
                <div className="flex items-start p-2 justify-start border  rounded-md">
                  <div>
                    <img
                      className="object-cover rounded-md w-20 h-20"
                      src="http://luk-media.ru/blog/nemcov/panihida/DSC06084.jpg"
                      alt=""
                    />
                  </div>
                  <div className="ml-2">
                    <span className="break-words font-medium">
                      {data && data.ServiceTitle}
                    </span>
                    <br />
                    <span className="break-words font-semibold text-cyan-500">
                      {data && data.Price} ₽
                    </span>
                  </div>
                </div>
              </td> */}
          </tr>
          <tr>
            <td align="left">Дата заказа: {data && data.CreateTime}</td>
            <td align="left">7 495 755-69-83</td>
          </tr>
          <tr>
            <td align="left">Сумма заказа: {data && data.Price} ₽</td>
            <td align="left"></td>
          </tr>
          <tr>
            <td align="left">Данные</td>
            <td align="left">Данные о погибшем</td>
          </tr>
          <tr>
            <td align="left">
              <span>Ф.И.О</span>
              <br />
              <span>{data && data.userData[0].Name}</span>
            </td>
            <td align="left">
              <span>Ф.И.О</span>
              <br />
              <span>{data && data.Name}</span>
            </td>
          </tr>
          <tr>
            <td align="left">
              <span>Адрес</span>
              <br />
              <span>{data && data.userData[0].Adress}</span>
            </td>
            <td align="left">
              <span>Дата рождения</span>
              <br />
              <span>{data && data.DateOfBith}</span>
            </td>
          </tr>
          <tr>
            <td align="left">
              <span>Номер телефона</span>
              <br />
              <span>{data && data.userData[0].Phone}</span>
            </td>
            <td align="left">
              <span>Дата смерти</span>
              <br />
              <span>{data && data.DateOfDeath}</span>
            </td>
          </tr>
          <tr>
            <td align="left">
              <span>Паспортные данные</span>
              <br />
              <span>{data && data.userData[0].Pasport}</span>
            </td>
            <td align="left">
              <span>Номер с-ва о смерти и дата выдачи (если есть)</span>
              <br />
              <span>2386548349173 от 16.03.2022</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="w-full flex justify-center">
        <button className="bg-green-700 py-2 px-12 text-white rounded-lg mt-8">
          Принять
        </button>
      </div>
    </div>
  );
};

export default NewOrdersModal;

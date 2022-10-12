import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useAppDispatch } from "../../store";
import { closeOrderModal } from "../../store/ui/actions";
import { useOrderModal } from "../../store/ui/hooks";

const OrdersModal = () => {
  const dispatch = useAppDispatch();
  const orderModal = useOrderModal();

  const data = orderModal?.data;
  console.log(data);

  return (
    <Transition.Root show={orderModal.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-20 inset-0 overflow-y-auto"
        onClose={() => dispatch(closeOrderModal())}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed z-10 inset-0 bg-white bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0 transform scale-95"
            enterTo="opacity-100 transform scale-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 transform scale-100"
            leaveTo="opacity-0 transform scale-95 "
          >
            <div className="relative z-30 lg:w-2/4 dark:bg-black inline-block align-center align-middle rounded-xl bg-white border-2 border-gray  text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl">
              <div
                className="absolute h-6 w-6 top-0 right-0 fill-black m-4 hover:cursor-pointer"
                onClick={() => dispatch(closeOrderModal())}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 "
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    color="black dark:white"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>

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
                      <td align="left">
                        Дата заказа: {data && data.CreateTime}
                      </td>
                      <td align="left">
                        {data && data.userData.length && data.userData.Phone}
                      </td>
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
                        <span>
                          Номер с-ва о смерти и дата выдачи (если есть)
                        </span>
                        <br />
                        <span>{data && data.DocumentNumber}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default OrdersModal;

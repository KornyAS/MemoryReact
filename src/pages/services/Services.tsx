import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { fetchServices } from "../../store/services";
import { fetchServiceToEditSuccess } from "../../store/services/actions";
import { useServices } from "../../store/services/hooks";
import {
  openCreateServiceModal,
  openEditServiceModal,
} from "../../store/ui/actions";

const Services = () => {
  const dispatch = useAppDispatch();
  const services = useServices();
  const params = useParams();

  useEffect(() => {
    if (!params.subcategoryId) return;
    dispatch(fetchServices(params.subcategoryId) as any);
  }, [params, dispatch]);

  console.log(services);

  const handleOpenEditModal = (item) => {
    dispatch(fetchServiceToEditSuccess(item));
    dispatch(
      openEditServiceModal({
        data: null,
        open: true,
      })
    );
  };

  return (
    <div className=" flex justify-center">
      <div className="flex flex-col container bg-white min-h-screen mt-4">
        <div className="text-center ">
          <span className="font-bold text-xl">Редактирование</span>
        </div>
        <div className="mt-6 mx-8 border rounded-3xl  p-3 pl-6 bg-slate-300  font-normal text-slate-800 text-sm">
          Услуги Ритуальные услуги
        </div>
        <div className="flex flex-wrap mt-8">
          {services.length > 0 &&
            services.map((item: any, i: number) => (
              <div
                key={i}
                className="w-44 h-72 m-2  flex flex-col justify-start items-start shadow-xl rounded-2xl "
              >
                <div className="rounded-t-2xl w-full h-52 relative">
                  <div
                    onClick={() => handleOpenEditModal(item)}
                    className="absolute w-10 h-10 left-32 top-2 flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 rounded-full"
                  >
                    <BiEdit className="h-6 w-6 text-white" />
                  </div>
                  {item.images.length > 0 && (
                    <img
                      className="rounded-t-2xl w-full h-52"
                      src={item.images[0].URL}
                      alt=""
                    />
                  )}
                </div>
                <div className="w-full h-full  text-start p-3">
                  <span className="break-words font-medium text-sm">
                    {item.ServiceTitle}
                  </span>
                </div>
              </div>
            ))}

          <div
            onClick={() =>
              dispatch(
                openCreateServiceModal({
                  data: null,
                  open: true,
                })
              )
            }
            className="w-44 h-32 p-3 m-2 text-white rounded-2xl bg-cyan-500 hover:bg-cyan-600 flex flex-col items-center text-center shadow-xl"
          >
            <AiOutlinePlus className="w-12 h-12 mt-2" />
            <span className="mt-2 break-words font-medium text-sm">
              Добавить услугу
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

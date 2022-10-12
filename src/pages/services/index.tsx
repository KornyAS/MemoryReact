import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { fetchAllservices } from "../../store/services";
import { useALlServices } from "../../store/services/hooks";
import editIcon from "./assets/editIcon.svg";
import deleteIcon from "./assets/deleteIcon.svg";
import { openEditCategoryModal } from "../../store/ui/actions";
import { AiOutlinePlus } from "react-icons/ai";
import { useEditCategoryModal } from "../../store/ui/hooks";
import API from "../../constans/Api";

const AllServicesPage = () => {
  const dispatch = useAppDispatch();
  const services = useALlServices();
  const editCategoryModal = useEditCategoryModal();

  useEffect(() => {
    dispatch(fetchAllservices() as any);
  }, [editCategoryModal.open, dispatch]);

  const handleDeleteCategory = async (id: number) => {
    try {
      const res = await API.delete(
        `services.php?category=services&CategoryID=0&ID=${id}`
      );
      dispatch(fetchAllservices() as any);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col container bg-white min-h-screen mt-4">
        <div className="text-center ">
          <span className="font-bold text-xl">Редактирование</span>
        </div>
        <div className="mt-6 mx-8 border rounded-3xl  p-3 pl-6 bg-slate-300  font-normal text-slate-800 text-sm">
          Услуги Ритуальные услуги
        </div>
        <div className="flex flex-wrap mt-8">
          {services &&
            services.map((service: any, i: number) => (
              <div
                key={i}
                className="w-44 h-36 m-2 p-2 flex justify-center items-center text-center shadow-xl rounded-2xl break-words font-medium text-sm border relative"
              >
                {/* <div
                  onClick={() => {
                    dispatch(
                      openEditCategoryModal({
                        data: service,
                        open: true,
                      })
                    );
                  }}
                  className="absolute cursor-pointer bg-sky-400 rounded-full flex justify-center align-center top-[-5px] left-[-5px] p-2"
                >
                  <img src={editIcon} alt="" />
                </div> */}
                <Link to={`/services/${service.ID}`}>{service.Name}</Link>
                {/* <div
                  onClick={() => handleDeleteCategory(service.ID)}
                  className="absolute cursor-pointer bg-red-600 rounded-full flex justify-center align-center bottom-[-5px] right-[-5px] p-2"
                >
                  <img src={deleteIcon} alt="" />
                </div> */}
              </div>
            ))}
          <div
            onClick={() =>
              dispatch(
                openEditCategoryModal({
                  data: null,
                  open: true,
                })
              )
            }
            className="text-white w-44 h-32 p-3 m-2 rounded-2xl bg-cyan-500 hover:bg-cyan-600 flex flex-col items-center text-center shadow-xl"
          >
            <AiOutlinePlus className="w-12 h-12 mt-2 " />
            <span className="mt-2 break-words font-medium text-sm">
              Добавить услугу
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllServicesPage;

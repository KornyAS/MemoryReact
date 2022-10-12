import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../../store";
import { closeCreateServiceModal } from "../../../store/ui/actions";
import { useCreateServiceModal } from "../../../store/ui/hooks";
import {
  AiOutlineFileImage,
  AiOutlinePlus,
  AiOutlineDelete,
} from "react-icons/ai";
import API from "../../../constans/Api";
import { useParams } from "react-router-dom";
import ComplectInputs from "./ComplectInputs";

interface ImageObj {
  blobUrl: string;
  file: File;
}

const CreateServiceModal = () => {
  const dispatch = useAppDispatch();
  const createService = useCreateServiceModal();
  const params = useParams();
  const [complects, setComplects] = useState<
    [{ Name: string; Price: string; ID: number }] | []
  >([]);
  const [complectsAmount, setComplectsAmount] = useState(1);
  const [complectData, setComplectData] = useState({
    Name: "",
    Price: "",
    ID: 0,
  });
  const [images, setImages] = React.useState<ImageObj[]>([]);

  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    address: "",
    description: "",
  });

  const handleChangeInputs = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleChangeComplectData = (e: any) => {
    setComplectData({
      ...complectData,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const max = 10;
      const files = Array.from(e.target.files || []).slice(0, max);

      setImages(
        files.map((file) => ({
          file,
          blobUrl: URL.createObjectURL(new Blob([file])),
        }))
      );
    },
    []
  );
  // console.log(imagesPreviewUrl);

  const handleCreateService = async (e: any) => {
    e.preventDefault();
    if (!params.subcategoryId || !images.length) return;
    const imagesArray = images.map((img) => {
      return img.file;
    });
    console.log(imagesArray);

    const form = new FormData();
    form.append("ServiceTitle", inputs.name);
    form.append("ServiceDescription", inputs.description);
    form.append("ServiceType", params.subcategoryId);
    form.append("complect", JSON.stringify(complects));
    imagesArray.map((img) => form.append("image", img));
    try {
      const res = await API.post("/services.php?action=add", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(closeCreateServiceModal());
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateComplectDates = (complect: any) => {
    console.log(complect);

    if (complects.length < 0) return;
    const newComplects = complects.map((item) => {
      if (item.id !== complect.id) return item;
      console.log(complect);

      return (item = {
        Name: complect.updatedName,
        Price: complect.updatedPrice,
        ID: complect.id,
      });
    });
    //@ts-ignore
    setComplects(newComplects);
  };
  const handleDeleteComplection = (id: number) => {
    if (complects.length < 0) return;
    const newComplects = complects.filter((item) => {
      return item.ID !== id;
    });
    console.log(newComplects);

    //@ts-ignore
    setComplects(newComplects);
  };

  console.log(images);

  return (
    <Transition.Root show={createService.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-20 inset-0 overflow-y-auto"
        onClose={() => dispatch(closeCreateServiceModal())}
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
                onClick={() => dispatch(closeCreateServiceModal())}
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

              <form className="m-6 flex flex-col items-center">
                <div>
                  <span className="font-bold text-xl">Создание услуги</span>
                </div>
                <div className="flex justify-between mt-6  w-full">
                  <div className="w-80 h-56 flex flex-col items-center justify-center bg-slate-300 rounded-2xl">
                    {images.length ? (
                      <img
                        className="w-full h-full object-cover"
                        src={images[0].blobUrl}
                        alt=""
                      />
                    ) : (
                      <>
                        <AiOutlineFileImage className="h-12 w-12" />
                        <input
                          onChange={(e) => onSelectImage(e)}
                          className="mt-6"
                          type="file"
                          accept="image/*"
                          multiple
                          required
                        />
                      </>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-between p-2">
                    <input
                      className=" border rounded-3xl h-10 p-2 bg-slate-50"
                      placeholder="Название"
                      type="text"
                      name="name"
                      value={inputs.name}
                      onChange={handleChangeInputs}
                      required
                    />
                    {/* <input
                      className=" border rounded-3xl h-10 p-2 bg-slate-50"
                      placeholder="Цена"
                      type="text"
                      name="price"
                      value={inputs.price}
                      onChange={handleChangeInputs}
                      required
                    />
                    <input
                      className=" border rounded-3xl h-10 p-2 bg-slate-50"
                      placeholder="Адрес"
                      type="text"
                      name="address"
                      value={inputs.address}
                      onChange={handleChangeInputs}
                      required
                    /> */}
                  </div>
                </div>

                <div className="w-full flex flex-wrap">
                  {images.length
                    ? images.map((image) => (
                        <img
                          className="w-36 h-36 m-2"
                          src={image.blobUrl}
                          alt=""
                        />
                      ))
                    : null}
                </div>

                <textarea
                  placeholder="Описание"
                  className="w-full h-96 bg-slate-300 rounded-2xl mt-6 p-4"
                  name="description"
                  value={inputs.description}
                  onChange={handleChangeInputs}
                  required
                ></textarea>
                <div className="mt-6 flex flex-col items-start w-full">
                  <span>Добавление комплектация услуг</span>
                  {complects.map((el, i) => (
                    <ComplectInputs
                      key={i}
                      name={el.Name}
                      price={el.Price}
                      id={el.ID}
                      handleUpdateComplectData={(complect) =>
                        handleUpdateComplectDates(complect)
                      }
                      handleDeleteComplection={(id) => {
                        handleDeleteComplection(id);
                      }}
                    />
                  ))}
                  <div className="flex justify-between">
                    <div className="flex">
                      <div className="relative">
                        <input
                          className="mt-6 w-80 h-12 p-2 border rounded-3xl  bg-slate-300 flex items-center "
                          type="text"
                          placeholder="Название комплектации"
                          name="Name"
                          onChange={handleChangeComplectData}
                          value={complectData.Name}
                          id=""
                        />
                      </div>
                      <input
                        className="mt-6 w-32 h-12 border rounded-3xl  p-2 px-6 bg-slate-300 flex items-center  ml-4"
                        type="number"
                        placeholder="Цена"
                        name="Price"
                        onChange={handleChangeComplectData}
                        value={complectData.Price}
                        id=""
                      />
                    </div>

                    <button className="w-14 h-14 mt-5 ml-5 flex items-center justify-center bg-cyan-500 rounded-full">
                      <AiOutlinePlus
                        onClick={(e) => {
                          e.preventDefault();
                          //@ts-ignore
                          setComplects([...complects, complectData]);
                          setComplectData({
                            Name: "",
                            Price: "",
                            ID: complectsAmount,
                          });
                          setComplectsAmount(complectsAmount + 1);
                        }}
                        className="w-12 h-12 text-white"
                      />
                    </button>
                  </div>
                </div>
                <div className="w-full">
                  <div className="mt-24 flex justify-between mx-36">
                    <button
                      onClick={(e) => handleCreateService(e)}
                      className="rounded-3xl py-2 px-8 text-white bg-cyan-500"
                    >
                      Продолжить
                    </button>
                    <button className="rounded-3xl py-2 px-8 text-white bg-red-400">
                      Удалить
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateServiceModal;

/* eslint-disable jsx-a11y/alt-text */
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../constans/Api";
import { useAppDispatch } from "../../../store";
import { closeEditCategoryModal } from "../../../store/ui/actions";
import { useEditCategoryModal } from "../../../store/ui/hooks";
import imgIcon from "../assets/imgIcon.svg";

interface ImageObj {
  blobUrl: string;
  file: File;
}

const EditCategoryModal = () => {
  const dispatch = useAppDispatch();
  const editCategoryModal = useEditCategoryModal();
  const [name, setName] = useState("");
  const [images, setImages] = React.useState<ImageObj[]>([]);
  const params = useParams();
  const [isCreate, setIsCreate] = useState(true);

  useEffect(() => {
    if (!editCategoryModal.data) {
      setName("");
      setIsCreate(true);
      return;
    }
    setName(editCategoryModal.data.Name);
    setIsCreate(false);
  }, [editCategoryModal]);

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

  const handleEditCategory = async () => {
    try {
      const form = new FormData();
      form.append("Name", name);
      if (!isCreate) {
        form.append("ID", editCategoryModal.data.ID);
      }
      if (images.length) {
        form.append("image", images[0].file);
      }
      if (params.categoryId) {
        form.append("CategoryID", params.categoryId);
      }
      const apiAddress = isCreate
        ? "services.php?action=add&category=services"
        : "services.php?category=services";
      const res = await API.post(apiAddress, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(closeEditCategoryModal());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Transition.Root show={editCategoryModal.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-20 inset-0 overflow-y-auto"
        onClose={() => dispatch(closeEditCategoryModal())}
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
                onClick={() => dispatch(closeEditCategoryModal())}
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
              <div className="flex flex-col items-center p-8">
                <span className="font-medium text-2xl">
                  {isCreate ? "Создание" : "Редактирование"}{" "}
                </span>
                <input
                  className="my-5 border rounded-3xl h-10 p-2 bg-slate-50"
                  type="text"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
                {images.length ? (
                  images.map((image, i) => (
                    <img
                      className="w-36 h-36"
                      key={i}
                      src={image.blobUrl}
                      alt=""
                    />
                  ))
                ) : (
                  <div>
                    <input
                      onChange={(e) => onSelectImage(e)}
                      accept="image/*"
                      type="file"
                      className="hidden"
                      id="input_file"
                    />
                    <img
                      onClick={() =>
                        //@ts-ignore
                        document.getElementById("input_file").click()
                      }
                      src={imgIcon}
                    />
                  </div>
                )}

                <button
                  onClick={handleEditCategory}
                  className="rounded-3xl py-2 px-8 text-white bg-cyan-500 mt-4"
                >
                  Продолжить
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default EditCategoryModal;

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import NewOrdersModal from "../../pages/orders/newOrdersModal";
import QAModal from "../../pages/users/Modal";
import { UsersModal } from "../../pages/users/Modal/UsersModal";
import { useAppDispatch } from "../../store";
import { closeModal } from "../../store/ui/actions";
import { useModal } from "../../store/ui/hooks";

const Modal = () => {
  const modal = useModal();
  const dispatch = useAppDispatch();

  const getModalContent = () => {
    switch (modal.modalName) {
      case "editQA":
        return <QAModal />;
      case "userModal":
        return <UsersModal />;
      case "newOrders":
        return <NewOrdersModal />;
      default:
        break;
    }
  };

  return (
    <Transition.Root show={modal.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-20 inset-0 overflow-y-auto"
        onClose={() => dispatch(closeModal())}
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
                onClick={() => dispatch(closeModal())}
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

              <section>{getModalContent()}</section>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;

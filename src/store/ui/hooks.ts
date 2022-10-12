import { useSelector } from "react-redux";
import { IModal } from "./interfaces/data.interface";
import { Store } from "../types";

export const useModal = (): IModal => {
  return useSelector((state: Store) => state.ui.modal);
};

export const useCreateServiceModal = (): IModal => {
  return useSelector((state: Store) => state.ui.createService);
};

export const useEditServiceModal = (): IModal => {
  return useSelector((state: Store) => state.ui.editService);
};

export const useEditCategoryModal = (): IModal => {
  return useSelector((state: Store) => state.ui.editCategory);
};

export const useOrderModal = (): IModal => {
  return useSelector((state: Store) => state.ui.order);
};

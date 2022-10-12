import { useSelector } from "react-redux";
import { Store } from "../types";

export const useALlServices = (): [] => {
  return useSelector((state: Store) => state.services.allServices);
};

export const useCategoryOfServices = (): [] => {
  return useSelector((state: Store) => state.services.categoryOfServices);
};

export const useServices = (): [] => {
  return useSelector((state: Store) => state.services.services);
};

export const useServiceToEdit = (): any => {
  return useSelector((state: Store) => state.services.serviceToEdid);
};

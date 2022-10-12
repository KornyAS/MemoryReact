import { createReducer } from "@reduxjs/toolkit";
import {
  fetchAllServicesSuccess,
  fetchCategoryOfServicesSuccess,
  fetchServiceToEditSuccess,
  fetchServicesSuccess,
} from "./actions";
import { IServicesState } from "./interfaces/data.interface";

export const initialState: IServicesState = {
  allServices: [],
  categoryOfServices: [],
  services: [],
  serviceToEdid: {},
};

export default createReducer<IServicesState>(initialState, (builder) =>
  builder
    .addCase(
      fetchAllServicesSuccess,
      (state, { payload }): IServicesState => ({
        ...state,
        allServices: payload,
      })
    )
    .addCase(
      fetchCategoryOfServicesSuccess,
      (state, { payload }): IServicesState => ({
        ...state,
        categoryOfServices: payload,
      })
    )
    .addCase(
      fetchServicesSuccess,
      (state, { payload }): IServicesState => ({ ...state, services: payload })
    )
    .addCase(
      fetchServiceToEditSuccess,
      (state, { payload }): IServicesState => ({
        ...state,
        serviceToEdid: payload,
      })
    )
);

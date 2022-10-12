import { Dispatch } from "@reduxjs/toolkit";
import $api from "../../constans/Api";
import {
  fetchAllServicesSuccess,
  fetchCategoryOfServicesSuccess,
  fetchServicesSuccess,
} from "./actions";

export const fetchAllservices = () => async (dispatch: Dispatch) => {
  try {
    console.log(1);

    const res: any = await $api.get("/services.php?category=services");
    dispatch(fetchAllServicesSuccess(res.data));
  } catch (e) {
    console.log(e);
  }
};

export const fetchCategoryOfServices =
  (id: string) => async (dispatch: Dispatch) => {
    try {
      const res: any = await $api.get(
        `/services.php?category=services&id=${id}`
      );
      dispatch(fetchCategoryOfServicesSuccess(res.data));
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

export const fetchServices = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res: any = await $api.get(`/services.php?id_category=${id}`);
    dispatch(fetchServicesSuccess(res.data));
  } catch (e) {
    console.log(e);
  }
};

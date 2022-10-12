import { createReducer } from "@reduxjs/toolkit";
import {
  closeCreateServiceModal,
  closeEditCategoryModal,
  closeEditServiceModal,
  closeModal,
  closeOrderModal,
  openCreateServiceModal,
  openEditCategoryModal,
  openEditServiceModal,
  openModal,
  openOrderModal,
} from "./actions";

import { IUIState } from "./interfaces/data.interface";

export const initialState: IUIState = {
  modal: {
    data: null,
    open: false,
  },
  createService: {
    data: null,
    open: false,
  },
  editService: {
    data: null,
    open: false,
  },
  editCategory: {
    data: null,
    open: false,
  },
  order: {
    data: null,
    open: false,
  },
};

export default createReducer<IUIState>(initialState, (buiilder) =>
  buiilder
    .addCase(
      openModal,
      (state, { payload }): IUIState => ({
        ...state,
        modal: payload,
      })
    )
    .addCase(
      closeModal,
      (state): IUIState => ({
        ...state,
        modal: {
          ...state.editService,
          open: false,
        },
      })
    )
    .addCase(
      openCreateServiceModal,
      (state, { payload }): IUIState => ({
        ...state,
        createService: payload,
      })
    )
    .addCase(
      closeCreateServiceModal,
      (state): IUIState => ({
        ...state,
        createService: {
          ...state.editService,
          open: false,
        },
      })
    )
    .addCase(
      openEditServiceModal,
      (state, { payload }): IUIState => ({
        ...state,
        editService: payload,
      })
    )
    .addCase(
      closeEditServiceModal,
      (state): IUIState => ({
        ...state,
        editService: {
          ...state.editService,
          open: false,
        },
      })
    )
    .addCase(
      openEditCategoryModal,
      (state, { payload }): IUIState => ({
        ...state,
        editCategory: payload,
      })
    )
    .addCase(
      closeEditCategoryModal,
      (state): IUIState => ({
        ...state,
        editCategory: {
          data: null,
          open: false,
        },
      })
    )
    .addCase(
      openOrderModal,
      (state, { payload }): IUIState => ({
        ...state,
        order: payload,
      })
    )
    .addCase(
      closeOrderModal,
      (state): IUIState => ({
        ...state,
        order: {
          ...state.order,
          open: false,
        },
      })
    )
);

import { createAction } from "@reduxjs/toolkit";
import { IModal } from "./interfaces/data.interface";

export const openModal = createAction<IModal>("ui/openModal");
export const closeModal = createAction<void>("ui/closeModal");

export const openCreateServiceModal = createAction<IModal>(
  "ui/openCreateServiceModal"
);
export const closeCreateServiceModal = createAction<void>(
  "ui/closeCreateServiceModal"
);
export const openEditServiceModal = createAction<IModal>(
  "ui/openEditServiceModal"
);
export const closeEditServiceModal = createAction<void>(
  "ui/closeEditServiceModal"
);

export const openEditCategoryModal = createAction<IModal>(
  "ui/openEditCategoryModal"
);
export const closeEditCategoryModal = createAction<void>(
  "ui/closeEditCategoryModal"
);

export const openOrderModal = createAction<IModal>("ui/openOrderModal");
export const closeOrderModal = createAction<void>("ui/closeOrderModal");

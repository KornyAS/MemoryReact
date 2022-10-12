import { createAction } from "@reduxjs/toolkit";

export const fetchAllServicesSuccess = createAction<[]>(
  "services/fetchAllServicesSuccess"
);

export const fetchCategoryOfServicesSuccess = createAction<[]>(
  "services/fetchCategoryOfServices"
);

export const fetchServicesSuccess = createAction<[]>(
  "services/fetchServicesSuccess"
);

export const fetchServiceToEditSuccess = createAction<{}>(
  "services/fetchServiceToEditSuccess"
);

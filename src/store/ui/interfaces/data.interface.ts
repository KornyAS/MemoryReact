export interface IModal<T = any> {
  data: T | null;
  coordinates?: { x: number; y: number };
  open: boolean;
  modalName?: string;
}

export interface IUIData {
  modal: IModal;
  createService: IModal;
  editService: IModal;
  editCategory: IModal;
  order: IModal;
}

export type IUIState = IUIData;

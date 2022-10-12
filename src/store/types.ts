import { IServicesState } from "./services/interfaces/data.interface";
import { IUIState } from "./ui/interfaces/data.interface";

export interface Store {
  ui: IUIState;
  services: IServicesState;
}

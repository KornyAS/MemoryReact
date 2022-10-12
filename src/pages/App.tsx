import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import AllServicesPage from "./services";
import CategoryOfServicesPage from "./services/categoryOfServices";
import Services from "./services/Services";
import Header from "../components/Header";
import { Provider } from "react-redux";
import store from "../store";
import CreateServiceModal from "./services/CreateServiceModal";
import EditServiceModal from "./services/EditServiceModal";
import AllOrders from "./orders";
import OrdersModal from "./orders/orderModal";
import Statistics from "./statistics";
import Users from "./users";
import QA from "./QA";
import Chat from "./chat";
import EditCategoryModal from "./services/EditCategoryModal";
import Modal from "../components/Common/Modal";
import NewOrders from "./orders/newOrders";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/services"
            element={
              <>
                <AllServicesPage />
                <EditCategoryModal />
              </>
            }
          />
          <Route
            path="/services/:categoryId"
            element={
              <>
                <CategoryOfServicesPage />
                <EditCategoryModal />
              </>
            }
          />
          <Route
            path="/services/:categoryId/:subcategoryId"
            element={
              <>
                <Services />
                <CreateServiceModal />
                <EditServiceModal />
              </>
            }
          />
          <Route path="/all-orders" element={<AllOrders />} />
          <Route path="/new-orders" element={<NewOrders />} />
          <Route path="/*" element={<Statistics />} />
          <Route path="/users" element={<Users />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
        <Modal />
        <OrdersModal />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

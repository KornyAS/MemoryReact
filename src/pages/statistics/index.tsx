import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../constans/Api";
import AreaChart from "./AreaChart";

export type PercentageOder = {
  title: string;
  service_cost: number;
  percent: number;
};

export type CategoryType = {
  orders: number;
  revenue: number;
  title: string;
  views: number;
  element: string;
  id: string;
};

export type StatType = {
  categoryes_stat: CategoryType[];
  graph_data: {
    curve: [{ data: any; name: string }];
    times: [];
  };
  percent_orders: {
    total_cost: number;
    orders: PercentageOder[];
  };
};

const Statistics = () => {
  const [statistics, setStatistics] = useState<StatType>();
  const [date, setDate] = useState("");
  const [category, setCategory] = useState({
    type: "",
    id: "0",
  });

  const getData = async (params) => {
    const { data } = await API.get("/statistics.php", {
      params,
    });
    setStatistics(data);
  };

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    console.log(search.get("type"));
    if (!search.get("type")) {
      setCategory({
        type: "",
        id: "0",
      });
      return;
    }

    setCategory({
      type: search.get("type") || "",
      id: search.get("id") || "",
    });
  }, [window.location.search]);

  useEffect(() => {
    console.log(category);

    const params: any = {};
    if (date) {
      params.period = date;
    }
    if (!category.type) {
      params.category = 0;
    }
    if (category.type === "category") {
      params.category = category.id;
      params.sub = 1;
    }
    if (category.type === "subcategory") {
      params.category = category.id;
    }
    console.log(params);

    getData(params);
  }, [date, category]);

  const categories = statistics?.categoryes_stat;

  return (
    <div className="flex justify-center">
      <div className="container bg-white mt-3">
        <AreaChart />
        <div className="w-full mt-12">
          <div className="w-full flex justify-center">
            <input
              onChange={(e) => setDate(e.target.value)}
              className="rounded-3xl py-2 px-8 text-white bg-cyan-500 mx-12 my-5"
              type="date"
            />
          </div>
          <div className="w-full text-center">
            <span>Статистика категорий услуг</span>
          </div>
          <div className="w-full flex flex-wrap items-start justify-center">
            {categories &&
              categories.map((category, index) => (
                <Link
                  to={`${window.location.pathname}?type=${category.element}&id=${category.id}`}
                  key={index}
                  className="w-64 h-60 shadow-xl rounded-2xl flex flex-col justify-around p-4 m-4 cursor-pointer"
                >
                  <div className="w-full break-words ">
                    <span>{category.title}</span>
                  </div>
                  <div className="w-full flex justify-between">
                    <span className="text-slate-500">Просмотрено</span>
                    <span className="break-words font-semibold text-cyan-500">
                      {category.views}
                    </span>
                  </div>
                  <div className="w-full flex justify-between">
                    <span className="text-slate-500">Сделано заказов</span>
                    <span className="break-words font-semibold text-cyan-500">
                      {category.orders}
                    </span>
                  </div>
                  <div className="w-full flex justify-between">
                    <span className="text-slate-500">Оборот</span>
                    <span className="break-words font-semibold text-cyan-500">
                      {category.revenue}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

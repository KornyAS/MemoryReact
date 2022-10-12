import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import API from "../../constans/Api";
import { StatType } from "./index";
import { Cell, Pie, PieChart } from "recharts";

const options: any = {
  chart: {
    height: 350,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  tooltip: {
    x: {
      format: "dd/MM/yy",
    },
  },
};

const AreaChart = () => {
  const [date, setDate] = useState("week");
  const [data, setData] = useState<StatType>();
  const pieData = data?.percent_orders?.orders.map((order) => ({
    name: order.title,
    value: order.percent,
  }));
  const COLORS = ["green", "blue", "red", "orange", "purple"];

  useEffect(() => {
    const getData = async () => {
      const { data } = await API.get(`/statistics.php?period=${date}`);
      setData(data);
      if (data?.graph_data) {
        options.xaxis = {
          type: "datetime",
          categories: data.graph_data.times.map((time) => `2022-${time}`),
        };
      }
    };
    getData();
  }, [date]);
  console.log(data);

  const series = data?.graph_data?.curve || [];

  return (
    <div>
      <div className="flex justify-center my-4">
        <select
          onChange={(e) => setDate(e.target.value)}
          defaultValue="week"
          name=""
          id=""
          className="w-72 border rounded-3xl h-10 p-2 px-4 bg-slate-100"
        >
          <option value="year">За год</option>
          <option value="month">За месяц</option>
          <option value="week">За неделю</option>
          <option value="day">За день</option>
        </select>
      </div>
      <div className="w-full flex justify-center">
        <div className="rounded-3xl border p-2 mr-6">
          <ReactApexChart
            // @ts-ignore
            options={options}
            series={series}
            type="area"
            height={500}
            width={750}
          />
        </div>

        <div className="w-80 rounded-3xl border p-3">
          <div className="w-full text-center">
            <span className="font-medium text-sm">
              Общая статистика заказов на услуги
            </span>
          </div>
          <div className="flex justify-center">
            <PieChart width={170} height={220}>
              {data && pieData && (
                <Pie
                  data={pieData}
                  cx={85}
                  cy={100}
                  innerRadius={64}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              )}
            </PieChart>
          </div>
          <div className="flex">
            <div className="flex flex-col">
              {COLORS.map((color, index) => (
                <div
                  key={index}
                  style={{ background: `${color}` }}
                  className="w-2 h-2 m-3"
                ></div>
              ))}
            </div>
            <div className="flex flex-col">
              {pieData &&
                pieData.map((item, index) => (
                  <span key={index} className="m-1.5 text-sm font-light">
                    {item.name}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaChart;

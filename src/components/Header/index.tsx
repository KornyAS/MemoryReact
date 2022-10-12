import React from "react";
import {
  AiOutlineSearch,
  AiOutlineBarChart,
  AiOutlineShop,
  AiOutlineTeam,
  AiOutlineMessage,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-center">
      <div className="container bg-white">
        <div className="pt-6 mx-8 flex justify-between items-center">
          <span className="font-semibold text-sm">MemoriesManager</span>
          <Link to="/login">
            <button className="rounded-3xl py-2 px-8 text-white bg-sky-700">
              Войти
            </button>
          </Link>
        </div>
        <div className="flex justify-end items-center flex-wrap ">
          <Link to="/all-orders">
            <div className="flex items-center justify-around m-3 cursor-pointer ">
              <AiOutlineSearch className="hover:text-black" />
              <span className="ml-1 font-normal text-slate-500 text-sm hover:text-black">
                Заказы
              </span>
            </div>
          </Link>

          <Link to="/">
            <div className="flex items-center justify-around m-3 cursor-pointer ">
              <AiOutlineBarChart className="hover:text-black" />
              <span className="ml-1 font-normal text-slate-500 text-sm hover:text-black">
                Статистика
              </span>
            </div>
          </Link>
          <Link to="/services">
            <div className="flex items-center justify-around m-3 cursor-pointer ">
              <AiOutlineShop className="hover:text-black" />
              <span className="ml-1 font-normal text-slate-500 text-sm hover:text-black">
                Товары и услуги
              </span>
            </div>
          </Link>
          <Link to="/users">
            <div className="flex items-center justify-around m-3 cursor-pointer ">
              <AiOutlineTeam className="hover:text-black" />
              <span className="ml-1 font-normal text-slate-500 text-sm hover:text-black">
                Пользователи
              </span>
            </div>
          </Link>
          <Link to="/chat">
            <div className="flex items-center justify-around m-3 cursor-pointer ">
              <AiOutlineMessage className="hover:text-black" />
              <span className="ml-1 font-normal text-slate-500 text-sm hover:text-black">
                Чат
              </span>
            </div>
          </Link>
          <Link to="/qa">
            <div className="flex items-center justify-around m-3 cursor-pointer ">
              <AiOutlineQuestionCircle className="hover:text-black" />
              <span className="ml-1 font-normal text-slate-500 text-sm hover:text-black">
                Вопрос-ответ
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

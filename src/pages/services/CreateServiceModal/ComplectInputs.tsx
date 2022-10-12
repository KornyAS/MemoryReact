import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import deleteIcon from "../../../assets/deleteIcon.svg";

interface IProps {
  name: string;
  price: string;
  id: number;
  handleUpdateComplectData: (complectData) => void;
  handleDeleteComplection: (id: number) => void;
}

const ComplectInputs = ({
  name,
  price,
  id,
  handleUpdateComplectData,
  handleDeleteComplection,
}: IProps) => {
  const [complectData, setComplectData] = useState({
    updatedName: name,
    updatedPrice: price,
    id: id,
  });
  console.log(complectData);

  const handleComplectData = (e: any) => {
    setComplectData({ ...complectData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    handleUpdateComplectData(complectData);
  }, [complectData]);

  return (
    <div className="flex">
      <div className="relative">
        <input
          className="mt-6 w-80 h-12 p-2 border rounded-3xl  bg-slate-300 flex items-center "
          type="text"
          placeholder="Название комплектации"
          name="updatedName"
          onChange={(e) => handleComplectData(e)}
          value={complectData.updatedName}
          id=""
        />
        <div className="bg-slate-300 absolute top-7 right-4">
          <img
            onClick={() => handleDeleteComplection(id)}
            className=" "
            src={deleteIcon}
            alt=""
          />
        </div>
      </div>
      <input
        className="mt-6 w-32 border rounded-3xl  p-2 px-6 bg-slate-300 flex items-center  ml-4"
        type="number"
        placeholder="Цена"
        name="updatedPrice"
        onChange={(e) => handleComplectData(e)}
        value={complectData.updatedPrice}
        id=""
      />
    </div>
  );
};

export default ComplectInputs;

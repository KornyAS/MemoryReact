import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import deleteIcon from "../../../assets/deleteIcon.svg";

interface IProps {
  Name: string;
  Price: string;
  ID: number;
  handleUpdateComplectData: (complectData) => void;
  handleDeleteComplection: (ID: number) => void;
}

const ComplectInputs = ({
  Name,
  Price,
  ID,
  handleUpdateComplectData,
  handleDeleteComplection,
}: IProps) => {
  const [complectData, setComplectData] = useState({
    Name: Name,
    Price: Price,
    ID: ID,
  });

  const handleComplectData = (e: any) => {
    setComplectData({ ...complectData, [e.target.name]: e.target.value });
  };
  console.log(complectData);

  useEffect(() => {
    console.log(complectData);

    handleUpdateComplectData(complectData);
  }, [complectData]);

  return (
    <div className="flex">
      <div className="relative">
        <input
          className="mt-6 w-80 h-12 p-2 border rounded-3xl  bg-slate-300 flex items-center "
          type="text"
          placeholder="Название комплектации"
          name="Name"
          onChange={(e) => handleComplectData(e)}
          value={complectData.Name}
        />
        <div className="bg-slate-300 absolute top-7 right-4">
          <img
            onClick={() => handleDeleteComplection(ID)}
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
        name="Price"
        onChange={(e) => handleComplectData(e)}
        value={complectData.Price}
      />
    </div>
  );
};

export default ComplectInputs;

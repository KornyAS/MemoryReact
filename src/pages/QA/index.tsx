import { useEffect, useState } from "react";
import "./QA.css";
import Modal from "../users/Modal";
import API from "../../constans/Api";
import { AddModal } from "../users/Modal/AddModal";
import { useAppDispatch } from "../../store";
import { openModal } from "../../store/ui/actions";

type QaType = {
  active: string;
  category: string;
  createdon: string;
  editedon: string;
  id: string;
  question: string;
  title: string;
};

const QA = () => {
  const [modalAvtiveAdd, setModalActiveAdd] = useState(false);
  const [QAData, setQAData] = useState<QaType[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      const { data } = await API.get("/questionanswer.php");
      setQAData(data);
    };
    getData();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-2xl text-center mt-4 font-bold">Вопрос-ответ</h1>
      <div className="grid grid-cols-8 gap-8 mt-12">
        <div className="col-span-2"></div>
        <div className="w-full col-span-4 grid grid-cols-4 gap-9">
          {QAData &&
            QAData.map((data) => (
              <div
                key={data.id}
                className="px-4 py-6 bg-white align-center grid justify-center card"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  dispatch(
                    openModal({
                      modalName: "editQA",
                      data: data,
                      open: true,
                    })
                  )
                }
              >
                {data.title}
              </div>
            ))}
          <div
            className="px-4 py-6 bg-white align-center grid justify-center card cardAdd"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setModalActiveAdd(true);
            }}
          >
            ✚
          </div>
        </div>
        <div className="col-span-2"></div>
      </div>
      {/* {modalAvtive && (
        <Modal
          data={modalData}
          active={modalAvtive}
          setActive={setModalActive}
        />
      )} */}
      {modalAvtiveAdd && (
        <AddModal active={modalAvtiveAdd} setActive={setModalActiveAdd} />
      )}
    </div>
  );
};

export default QA;

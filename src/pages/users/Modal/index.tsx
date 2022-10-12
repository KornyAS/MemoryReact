import React, { useState } from "react";
import API from "../../../constans/Api";
import { useAppDispatch } from "../../../store";
import { closeModal } from "../../../store/ui/actions";
import { useModal } from "../../../store/ui/hooks";
// import "./modal.css";

const QAModal = () => {
  const modal = useModal();
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState({
    question: modal.data.title,
    answer: modal.data.answer,
  });

  const handleChage = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await API.post(`/questionanswer.php?id=${modal.data.id}`, {
      title: inputs.question,
      answer: inputs.answer,
    });
    dispatch(closeModal());
  };

  const handleDelete = async () => {
    await API.delete(`/questionanswer.php?id=${modal.data.id}`);
    dispatch(closeModal());
  };

  return (
    <div className="w-full flex justify-center p-4">
      <div className="text-center w-full mx-16 my-4 ">
        <h2 className="text-2xl font-bold">Редактирование вопроса-ответа</h2>

        <div className="mt-16">
          <input
            value={inputs.question}
            onChange={handleChage}
            name="question"
            type="text"
            className="block w-full py-3 px-4"
            style={{ borderRadius: "2rem", backgroundColor: "#F4F4F4" }}
            placeholder="Вопрос"
          />
          <textarea
            value={inputs.answer}
            onChange={handleChage}
            name="answer"
            className="block w-full py-3 px-4 rounded-lg mt-4 h-52 mb-20"
            style={{ backgroundColor: "#F4F4F4" }}
            placeholder="Ответ"
          ></textarea>
          <div className="grid grid-rows-2 gap-5 align-center justify-center">
            <button
              onClick={handleSave}
              className="bg-sky-400 block text-white font-bold px-24 py-2"
              style={{ borderRadius: "2rem", width: "100%" }}
            >
              Сохранить
            </button>
            <button
              onClick={handleDelete}
              type="submit"
              className="text-white block font-bold px-12 py-2"
              style={{
                borderRadius: "2rem",
                backgroundColor: "#F46D6D",
                width: "100%",
              }}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAModal;

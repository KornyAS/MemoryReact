import { useState } from "react";
import API from "../../../constans/Api";
import { useAppDispatch } from "../../../store";
import { closeModal } from "../../../store/ui/actions";
import { useModal } from "../../../store/ui/hooks";

export const UsersModal = () => {
  const modal = useModal();
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState({
    title: "",
    message: "",
  });

  const handleChageInputs = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  console.log(modal.data);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (modal.data !== "all" && !modal.data[0]) {
      setError("Выберите пользователей!");
      return;
    }
    const res = await API.post("/push.php", {
      fb_token: modal.data === "all" ? null : modal.data,
      push_title: inputs.title,
      push_content: inputs.message,
    });
    dispatch(closeModal());
  };

  return (
    <div className="w-full flex justify-center p-4">
      <div className="text-center w-full mx-16 my-4">
        <h2 className="text-3xl font-bold">Push-уведомления</h2>
        {/* <b className='cursor-pointer closeModal' onClick={() => setActive(false)}>
        ✖
      </b> */}
        <form onSubmit={(e) => handleSubmit(e)} className="mt-16 flex flex-col">
          <input
            value={inputs.title}
            onChange={handleChageInputs}
            name="title"
            type="text"
            className="block w-full py-3 px-4"
            style={{ borderRadius: "2rem", backgroundColor: "#F4F4F4" }}
            placeholder="Заголовок"
          />
          <textarea
            value={inputs.message}
            onChange={handleChageInputs}
            name="message"
            className="block w-full py-3 px-4 rounded-lg mt-4 h-52"
            style={{ backgroundColor: "#F4F4F4" }}
            placeholder="Текст сообщения..."
          ></textarea>
          {error && <span className="text-red-500">{error}</span>}
          <button
            type="submit"
            className="bg-sky-400 text-white font-bold px-12 py-2 my-4"
            style={{ borderRadius: "2rem" }}
          >
            Отпрвить Push-уведомление
          </button>
        </form>
      </div>
    </div>
  );
};

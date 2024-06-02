import React, {
  KeyboardEvent,
  MouseEventHandler,
  useState,
  ReactNode,
} from "react";
import close from "../assets/close.svg";
import "../css/Popup.css";
interface PopupProps {
  onClose: () => void;
  children: ReactNode;
  onInputChange: (text: string) => void;
}
const Popup: React.FC<PopupProps> = ({ onClose, children, onInputChange }) => {
  const [inputText, setInputText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setInputText(text);
    onInputChange(text);
  };

  return (
    <div className="Popup">
      <button
        style={{
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "flex-end",
          padding: "0",
        }}
      >
        <img src={close} alt="" style={{ width: "5%" }} />
      </button>
      <div className="Popup__handle">
        {children}
        <input
          type="text"
          id="userName"
          className="Popup__input"
          onKeyDown={(event) => {
            if (event.key === "Enter" && inputText !== "") {
              onClose();
            }
          }}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Popup;

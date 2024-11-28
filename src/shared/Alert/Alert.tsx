import { createPortal } from "react-dom";
import Button from "../Button/Button";
import s from "./Alert.module.scss";

type Props = {
  message: string;
  onClose: () => void;
};

export const Alert = ({ message, onClose }: Props) => {
  return createPortal(
    <div className={s.container}>
      <p>{message}</p>
      <Button onClick={onClose}>X</Button>
    </div>,
    document.body
  );
};

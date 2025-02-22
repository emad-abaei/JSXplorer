import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { IoMdArrowRoundBack } from "react-icons/io";

function ButtonBack() {
  const navigate = useNavigate();

  function handleBack(e: MouseEvent): void {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <Button type='back' onClick={handleBack}>
      <IoMdArrowRoundBack />
      Back
    </Button>
  );
}

export default ButtonBack;

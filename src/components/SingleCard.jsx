import React from "react";
import "../index.css";
export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  const wrapperClassname =
    " border-[0.5px] border-white w-[96px] h-[96px]  bg-lavender relative cursor-pointer  " +
    (flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0)]");

  const coverClassname =
    " absolute w-full h-full flex items-center justify-center " +
    (flipped ? "opacity-0" : "opacity-100");
  const contentClassname =
    " absolute object-cover " + (flipped ? "opacity-100" : "opacity-0");

  return (
    <div className={wrapperClassname + " duration-300 "} onClick={handleClick}>
      <div className={coverClassname}></div>
      <img className={contentClassname} src={card.img} alt="card front" />
    </div>
  );
}

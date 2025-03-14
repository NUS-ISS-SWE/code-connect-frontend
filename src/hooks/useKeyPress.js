import { useEffect, useState } from "react";

const useKeyPress = (focusKey) => {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  const downHandler = ({ key }) => {
    if (key === focusKey) setIsKeyPressed(true);
  };

  const upHandler = ({ key }) => {
    if (key === focusKey) setIsKeyPressed(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isKeyPressed;
};

export default useKeyPress;

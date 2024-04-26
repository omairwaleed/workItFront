import { useState } from "react";
import scarab from "../assets/scarab.png";

const ErrorImageHandler = ({
  src,
  width = "78",
  height = "80",
  alt = "",
  classN,
}) => {
  const [error, setError] = useState(false);

  const onError = () => {
    setError(true);
  };

  if (!error)
    return (
      <img
        src={src ?? scarab}
        width={width}
        height={height}
        alt={alt}
        onError={onError}
        className={classN}
      />
    );

  if (error)
    return (
      <img
        src={scarab}
        width={width}
        height={height}
        alt={alt}
        onError={onError}
        className={classN}
      />
    );
};
export default ErrorImageHandler;

import { useState, useRef } from "react";
import { Button, Overlay } from "react-bootstrap";

const OverlayComp = ({ cv }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <Button
        style={{
          backgroundColor: "#d0dbe8",
          borderColor: "#d0dbe8",
          color: "black",
          fontWeight: "bold",
        }}
        ref={target}
        onClick={() => setShow(!show)}
      >
        Click to see CV
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <img
            {...props}
            style={{
              position: "absolute",
              padding: "1.6rem 5px",
              maxWidth: "75dvw",
              ...props.style,
            }}
            src={cv}
          />
        )}
      </Overlay>
    </>
  );
};
export default OverlayComp;

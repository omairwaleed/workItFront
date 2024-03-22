import React from "react";
const DropDown = ({ data, state, setState, placeholder, needIndex }) => {
  return (
    <div>
      <select
        className="text_input"
        style={{
          padding: "8px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          outline: "none",
        }}
        value={state}
        onChange={(e) =>
          needIndex
            ? setState(
                e.target.options[e.target.selectedIndex].getAttribute(
                  "data-key"
                )
              )
            : setState(e.target.value)
        }
      >
        {data.map((element) => (
          <option
            value={element.value}
            key={element.value + element.index}
            data-key={element.index}
          >
            {element.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;

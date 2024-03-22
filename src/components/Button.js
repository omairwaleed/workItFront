const Button = (props) => {
  return (
    <div>
      <button
        className={`my_button ${props.className} `}
        onClick={props.onClick}
      >
        {props.buttonContent}
      </button>
    </div>
  );
};

export default Button;

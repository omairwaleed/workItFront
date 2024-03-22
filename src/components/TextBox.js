const TextBox = (props) => {
  return (
    <div>
      <input
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default TextBox;

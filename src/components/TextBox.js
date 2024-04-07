const TextBox = (props) => {
  return (
    <div>
      <input
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required
      />
    </div>
  );
};

export default TextBox;

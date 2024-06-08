import styles from "./FilterBtns.module.css";

const FilterBtns = ({ name, type, setType }) => {
  const handleTypeChange = async (e) => {
    setType(name);
  };
  return (
    <button
      className={`${styles.filterBtn} ${type === name ? styles.selected : ""}`}
      onClick={handleTypeChange}
    >
      {name}
    </button>
  );
};
export default FilterBtns;

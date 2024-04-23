import styles from "./FilterBtns.module.css";

const FilterBtns = ({ setType, type, name, setSearchParams }) => {
  const handleTypeChange = () => {
    setType(name);
    setSearchParams({ type: name });
  };
  return (
    <button
      className={`${styles.filterBtn} ${type === name && styles.selected}`}
      onClick={handleTypeChange}
    >
      {name}
    </button>
  );
};
export default FilterBtns;

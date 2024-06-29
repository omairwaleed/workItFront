import styles from "./loader.module.css";

const Loader = ({ fullPage }) => {
  return (
    <div
      className={`${styles.double_ringed} ${fullPage && styles.fullPage}`}
    ></div>
  );
};
export default Loader;

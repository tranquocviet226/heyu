import styles from "../../../../styles/Order.module.css";

const ButtonComponent = ({
  onClick,
  children,
  background,
  primary = true,
  type = "button",
}) => {
  const mode = primary ? "button-primary" : "button-outline";
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles[mode]}
      style={{ background }}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;

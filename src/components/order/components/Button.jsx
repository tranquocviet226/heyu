import styles from "../../../../styles/Order.module.css";

const ButtonComponent = ({
  onClick,
  children,
  background,
  primary = true,
  disabled = false,
  type = "button",
}) => {
  const mode = primary ? "button-primary" : "button-outline";
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={styles[mode]}
      style={{ background, cursor: disabled ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' }}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;

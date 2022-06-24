import Image from "next/image";
import styles from "../../../../styles/Order.module.css";

const InputComponent = ({
  value,
  required,
  icon,
  placeholder,
  onChange,
  forwardedRef,
  ...props
}) => {
  return (
    <div className={styles.inputContainer}>
      <Image src={icon} width={20} height={20} alt="" />
      <input
        ref={forwardedRef}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
        {...props}
      />
    </div>
  );
};

export default InputComponent;

import Image from "next/image";
import styles from "../../../../styles/Order.module.css";

const InputComponent = ({
  value,
  required,
  icon,
  placeholder,
  onChange,
  forwardedRef,
  defaultValue,
  disabled,
  type = 'text',
  ...props
}) => {
  return (
    <div>
      <div className={styles.inputContainer}>
        <Image src={icon} width={20} height={20} alt="" />
        <input
          disabled={disabled}
          ref={forwardedRef}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.input}
          type={type}
          defaultValue={defaultValue}
          {...props}
        />
      </div>
    </div>
  );
};

export default InputComponent;

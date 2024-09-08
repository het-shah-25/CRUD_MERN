import { COLORS } from "../../../constants/constants";

const Button = ({
  onClick,
  backgroundColor = COLORS.primary,
  fontColor = COLORS.text,
  className = "",
  style = {},
  children,
  ...otherProps
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ease-in-out ${className}`}
      style={{
        backgroundColor: backgroundColor,
        color: fontColor,
        ...style,
      }}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;

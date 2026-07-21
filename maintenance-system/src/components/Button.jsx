function Button({
  children,
  onClick,
  type = "button",
  disabled = false
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        w-full
        bg-blue-600
        hover:bg-blue-700
        text-white
        py-2
        rounded-lg
        transition
      "
    >
      {children}
    </button>
  );
}

export default Button;
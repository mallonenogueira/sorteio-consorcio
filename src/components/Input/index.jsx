import React from "react";

import "./style.scss";

export function Input({
  placeholder,
  type,
  value,
  onChange,
  label,
  inputRef,
  onKeyUp,
}) {
  return (
    <label className="input">
      {label}

      {/* <i className="fas fa-search input__icon"></i> */}

      <input
        className="input__element"
        ref={inputRef}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
        onKeyUp={onKeyUp}
      />
    </label>
  );
}

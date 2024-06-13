import React from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  type?: string;
  placeholder?: string;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const TextInput = <T extends FieldValues>({
  label,
  name,
  register,
  type = "text",
  placeholder = "",
  required = false,
  containerClassName = "form-control w-full max-w-xs",
  labelClassName = "label-text uppercase text-primary",
  inputClassName = "input input-bordered text-primary w-full max-w-xs",
}: TextInputProps<T>) => {
  return (
    <label className={containerClassName}>
      <div className="label">
        <span className={labelClassName}>{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className={inputClassName}
        {...register(name, { required })}
      />
    </label>
  );
};

export default TextInput;

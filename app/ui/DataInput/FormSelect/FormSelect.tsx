import React from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface SimpleOption {
  label: string;
}

interface OptionGroup {
  label: string;
  options: string[];
}

type OptionsType = (SimpleOption | OptionGroup)[];

interface FormSelectProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  options: OptionsType;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const FormSelect = <T extends FieldValues>({
  label,
  name,
  register,
  options,
  placeholder = "Please select",
  required = false,
  className = "",
}: FormSelectProps<T>) => {
  const isOptionGroup = (option: SimpleOption | OptionGroup): option is OptionGroup => {
    return (option as OptionGroup).options !== undefined;
  };

  return (
    <label className={`form-control w-full max-w-xs ${className}`}>
      <div className="label">
        <span className="label-text uppercase text-primary">{label}</span>
      </div>
      <select
        className="select select-bordered text-primary w-full max-w-xs"
        {...register(name, { required })}
      >
        <option disabled selected value="">
          {placeholder}
        </option>
        {options.map((option, index) =>
          isOptionGroup(option) ? (
            <optgroup label={option.label} key={index}>
              {option.options.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </optgroup>
          ) : (
            <option key={index} value={option.label}>
              {option.label}
            </option>
          )
        )}
      </select>
    </label>
  );
};

export default FormSelect;

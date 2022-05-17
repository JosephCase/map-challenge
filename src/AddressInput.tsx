import { debounce } from "lodash";
import React, { ChangeEvent, useCallback } from "react";

type Props = {
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: ChangeEvent<HTMLInputElement>) => void;
};

const AddressInput = ({ value, onChange, placeholder, onSubmit }: Props) => {
  const submitCallback = useCallback(debounce(onSubmit, 1000), []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    submitCallback(e);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="addressInput"
    />
  );
};

export default AddressInput;

import React from "react";
import Select, { ActionMeta, MultiValue } from "react-select";
import makeAnimated from "react-select/animated";

interface MultiSelect {
  options: {
    label: string;
    value: string;
  }[];
  onChange?:
    | ((newValue: MultiValue<unknown>, actionMeta: ActionMeta<unknown>) => void)
    | undefined;
  defaultValue: any;
}

const customStyles = {
  control: (base: any) => ({
    ...base,
    borderColor: "#D1D5DB", // border-gray-300
    boxShadow: "none",
    "&:hover": {
      borderColor: "#9CA3AF", // border-gray-400
    },
    padding: "0.2.5rem", // padding ajustado
    borderRadius: "1.5rem",
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "#E5E7EB", // bg-gray-200
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "#111827", // text-gray-900
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: "#6B7280", // text-gray-500
    "&:hover": {
      backgroundColor: "#D1D5DB", // bg-gray-300
      color: "#111827", // text-gray-900
    },
  }),
};

export function MultiSelect({ options, onChange, defaultValue }: MultiSelect) {
  const [selectedOptions, setSelectedOptions] = React.useState<MultiValue<any>>(
    []
  );

  const animatedComponents = makeAnimated();

  return (
    <div className="space-y-2">
      <Select
        id="multi-select"
        value={selectedOptions}
        onChange={(e: MultiValue<any>, actionMeta: ActionMeta<any>) => {
          setSelectedOptions(e);
          onChange && onChange(e, actionMeta);
        }}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={options}
        placeholder="Selecione um responsável"
        isOptionDisabled={() => selectedOptions.length >= 3}
        noOptionsMessage={() => "Sem mais opções."}
        styles={customStyles}
        defaultValue={defaultValue}
      />
    </div>
  );
}

import dynamic from 'next/dynamic';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { Options } from 'react-select';
import { Text } from '../Text';

const ReactSelect = dynamic(
  () => import('react-select').then((mod) => mod.default),
  { ssr: false, loading: () => null }
);

export interface Option {
  value: string | number | string[];
  label: string;
}

type MultiSelectProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  registerName: FieldPath<TFieldValues>;
  options?: Options<Option>;
  placeholder?: string;
  label?: string;
};

const MultiSelect = <TFieldValues extends Record<string, any>>({
  control,
  registerName,
  options,
  placeholder,
  label,
}: MultiSelectProps<TFieldValues>) => {
  const {
    field: { onChange },
  } = useController({ control, name: registerName, rules: { required: true } });

  return (
    <>
      <Text>{label}</Text>
      <ReactSelect
        classNamePrefix="select"
        placeholder={placeholder}
        onChange={(val: any) => onChange(val.value)}
        options={options}
      />
    </>
  );
};

export default MultiSelect;

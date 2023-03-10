import React from 'react';
import type {
  DeepPartial,
  FieldValues,
  Resolver,
  SubmitHandler,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { Button } from '../Button';
import { FormData } from '@/types';
import { Input } from '../Input';
import { Select } from '../Select';

export type Option = {
  value: string | number | string[];
  label: string;
};

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  formData: FormData<TFormValues>[];
  validationSchema: Resolver<TFormValues>;
  className: string;
  initialValue?: DeepPartial<TFormValues>;
  saveButtonTitle?: string;
  loading?: boolean;
};

const Form = <TFormValues extends Record<string, any>>({
  onSubmit,
  validationSchema,
  formData,
  className,
  initialValue,
  saveButtonTitle,
  loading = false,
}: FormProps<TFormValues>) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
    control,
  } = useForm<TFormValues>({
    resolver: validationSchema,
    defaultValues: initialValue,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {formData.map((item) => {
        switch (item.component) {
          // Base forms
          case 'input':
            return (
              <Input
                key={item.name}
                {...register(item.name)}
                label={item.label}
                type={item.type}
                errormessage={errors[item.name]?.message?.toString() || ''}
                {...item}
              />
            );
          case 'select':
            return (
              <Select<TFormValues>
                key={item.name}
                options={item.options}
                control={control}
                registerName={item.name}
                {...item}
              />
            );
          default:
            return null;
        }
      })}
      <div className="flex h-10 justify-between gap-5">
        <Button variant="ghost" type="button" className="w-full">
          Cancel
        </Button>
        <Button
          variant="flat"
          type="submit"
          disabled={!isValid}
          loading={loading}
          className="w-full"
        >
          {saveButtonTitle || 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default Form;

import React, { forwardRef } from 'react';

import { Text } from '../Text';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    errormessage?: string;
    className?: string;
  },
  HTMLInputElement
>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <div className="w-full">
    <Text>{props.label}</Text>
    <input
      ref={ref}
      {...props}
      className="my-2 h-10 w-full rounded-md border border-accent-4 p-2 outline-transparent focus:outline-0 focus:outline-accent-5 disabled:bg-accent-8 disabled:text-accent-0"
    />
    <Text variant="error">{props.errormessage}</Text>
  </div>
));

Input.displayName = 'Input';

export default Input;

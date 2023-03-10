import * as Yup from 'yup';
import { CreateCategory, CreateTransaction, LoginValues } from '.';

export const loginShema = Yup.object()
  .shape<Record<keyof LoginValues, Yup.AnySchema>>({
    email: Yup.string().required('Заавал оруулна уу'),
    password: Yup.string().required('Заавал оруулна уу'),
  })
  .required();

export const createCategoryShema = Yup.object()
  .shape<Record<keyof CreateCategory, Yup.AnySchema>>({
    name: Yup.string().required('Заавал оруулна уу'),
  })
  .required();

export const createTransactionShema = Yup.object()
  .shape<Record<keyof CreateTransaction, Yup.AnySchema>>({
    title: Yup.string().required('Заавал оруулна уу'),
    amount: Yup.number().required(''),
    type: Yup.string().required(''),
    date: Yup.string().required(''),
  })
  .required();

import { ValidationError } from 'yup';

type Errors = {
  [key: string]: string;
};

export function getValidationErrors(err: ValidationError): Errors {
  const validationsErrors: Errors = {};

  err.inner.forEach(error => {
    if (!error.path) {
      return;
    }

    validationsErrors[error.path] = error.message;
  });
  return validationsErrors;
}

import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationsErrors: Errors = {};

  err.inner.forEach(error => {
    if (!error.path) {
      return;
    }

    validationsErrors[error.path] = error.message;
  });
  return validationsErrors;
}

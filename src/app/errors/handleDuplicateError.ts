import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation error',
    errorSources,
  };
};

export default handleDuplicateError;

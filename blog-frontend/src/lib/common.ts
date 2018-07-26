export const isHttpStatus = (status: number, firstDigit: string = '4') => {
  return status.toString()[0] === firstDigit;
};

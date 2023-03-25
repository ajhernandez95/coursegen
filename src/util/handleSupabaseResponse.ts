export const handleSupabaseResponse = (response: any): any => {
  let result = {};
  console.log(response);
  if (response?.error) {
    const err = response.error;
    result = {
      ...err,
      status: err.status,
      error: err.name,
      isAuthError: !!err.__isAuthError,
      errorMessage: err.message,
      isSuccess: false,
    };

    return result;
  }

  result = {
    ...response.data,
    isSuccess: true,
  };

  return result;
};

export default handleSupabaseResponse;

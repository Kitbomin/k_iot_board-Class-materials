// error.ts

export const getErrorMessage = (err: any, fallback = "오류가 발생했어용ㅇ 초비사아아앙") => {
  const backendMessage = err?.response?.data?.message;

  if (backendMessage) return backendMessage;

  const axiosMsg = err?.message;
  if(axiosMsg) return axiosMsg;

  return fallback;
}
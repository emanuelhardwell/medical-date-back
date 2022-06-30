export const handleInternalServerError = (res: any, error: any) => {
  console.log("Error: ", error);
  return res.status(500).json({
    ok: false,
    message: "Contacte al administrador",
  });
};

export const handleErrorResponse = (
  res: any,
  message = "Error",
  code = 401
) => {
  console.log("Error: ", message);
  return res.status(code).json({
    ok: false,
    message,
  });
};

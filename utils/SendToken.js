export const sendToken = (res, admin, message, statusCode = 200) => {
    const token = admin.getJWTToken();
    const options = {
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      message,
      admin,
    });
  };
  
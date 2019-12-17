import jwt from "jsonwebtoken";
import config from "../../../config";

export const jwtSignature = payload => {
  return jwt.sign(
    {
      data: payload
    },
    config.secret_key
  );
};

export const jwtVerify = token => {
  try {
    return jwt.verify(token, config.secret_key, (err, decoded) => {
      if (err) {
        return {
          error: err.name,
          message: `${err.message} kindly resend reactivation key`,
          status: "failed"
        };
      } else {
        return decoded;
      }
    });
  } catch (err) {
    /* istanbul ignore next */
    return {
      error: err.name,
      message: err.message,
      status: "failed"
    };
  }
};

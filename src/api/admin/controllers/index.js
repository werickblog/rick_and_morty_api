import AdminController from "./adminController";

const admin = new AdminController();

export const createAdminAccount = (req, res) => {
  const { email, password, username } = req.body;
  admin
    .saveAdmin(username, email, password)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      /* istanbul ignore next */
      res.status(err.status || 400).json({
        message: err.message
      });
    });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  admin
    .loginUser(email, password)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      /* istanbul ignore next */
      res.status(err.status || 400).json({
        message: err.message
      });
    });
};

export const verifyAccount = (req, res) => {
  const { token, verification_code } = req.body;
  admin
    .verifyAccount(token, verification_code)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      /* istanbul ignore next */
      res.status(err.status || 400).json({
        message: err.message
      });
    });
};

export const resendMail = (req, res) => {
  const { email } = req.body;

  admin
    .resendMail(email)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      /* istanbul ignore next */
      res.status(err.status || 400).json({
        message: err.message
      });
    });
};

export const fetchUserByMail = (req, res) => {
  const { email } = req.params;

  admin
    .fetchUserByMail(email)
    .then(Res => {
      res.status(200).json(Res);
    })
    .catch(err => {
      /* istanbul ignore next */
      res.status(err.status || 400).json({
        message: err.message
      });
    });
};

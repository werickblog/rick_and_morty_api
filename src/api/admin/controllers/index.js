import AdminController from "./adminController";
import DatasetController from "./datasetControllers";

const admin = new AdminController();
const datasets = new DatasetController();

// Auth middlewares
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

// Datasets controller
export const addCharacter = (req, res) => {
  datasets
    .addCharacter(req.body)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      res.status(err.status || 400).json({
        message: err.message
      });
    });
};

export const addLocation = (req, res) => {
  datasets
    .addLocation(req.body)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      console.log(err)
      res.status(err.status || 400).json({
        message: err.message
      });
    });
};

export const addObject = (req, res) => {
  datasets
    .addObject(req.body)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      res.status(err.status || 400).json({
        message: err.message
      });
    });
};

export const addQuote = (req, res) => {
  datasets
    .addQuote(req.body)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      res.status(err.status || 400).json({
        message: err.message
      });
    });
};

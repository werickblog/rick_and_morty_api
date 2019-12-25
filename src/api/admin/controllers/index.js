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
      console.log(err);
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

export const updateCharacter = (req, res) => {
  datasets
    .updateCharacter(req.params.character_id, req.body)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      res.status(err.status).json({
        message: err.message
      });
    });
};

export const deleteCharacter = (req, res) => {
  datasets
    .deleteCharacter(req.params.character_id)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      res.status(err.status).json({
        message: err.message
      });
    });
};

export const updateLocation = (req, res) => {
  datasets
    .updateCharacter(req.params.location_id, req.body)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      res.status(err.status).json({
        message: err.message
      });
    });
};

export const deleteLocation = (req, res) => {
  datasets
    .deleteLocation(req.params.location_id)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      res.status(err.status).json({
        message: err.message
      });
    });
};

export const updateQuote = (req, res) => {
  datasets
    .updateQuote(req.params.quote_id, req.body)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      res.status(err.status).json({
        message: err.message
      });
    });
};

export const deleteQuote = (req, res) => {
  datasets
    .deleteQuote(req.params.quote_id)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      res.status(err.status).json({
        message: err.message
      });
    });
};

export const updateObject = (req, res) => {
  datasets
    .updateObject(req.params.object_id, req.body)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      res.status(err.status).json({
        message: err.message
      });
    });
};

export const deleteObject = (req, res) => {
  datasets
    .deleteObject(req.params.object_id)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      res.status(err.status).json({
        message: err.message
      });
    });
};

export const fetchCharacters = (req, res) => {
  datasets.fetchCharacters().then(Res => {
    res.status(200).json(Res);
  });
};

export const fetchSingleCharacter = (req, res) => {
  const character_id = parseInt(req.params.character_id, 10)
  datasets
    .fetchSingleCharacter(character_id)
    .then(Res => {
      res.status(200).json(Res);
    })
    .catch(err => {
      res.status(err.status).json({
        message: err.message
      });
    });
};

export const fetchLocations = (req, res) => {
  datasets.fetchLocations().then(Res => {
    res.status(200).json(Res);
  });
};

export const fetchSingleLocation = (req, res) => {
  const location_id = parseInt(req.params.location_id, 10)
  datasets
    .fetchSingleLocation(location_id)
    .then(Res => {
      res.status(200).json(Res);
    })
    .catch(err => {
      res.status(err.status).json({
        message: err.message
      });
    });
};

export const fetchObjects = (req, res) => {
  datasets.fetchObjects().then(Res => {
    res.status(200).json(Res);
  }).catch(err => {
    res.status(400).json({
      message: err.message
    })
  })
};

export const fetchSingleObject = (req, res) => {
  const object_id = parseInt(req.params.object_id, 10)
  datasets
    .fetchSingleObject(object_id)
    .then(Res => {
      res.status(200).json(Res);
    })
    .catch(err => {
      res.status(err.status || 400).json({
        message: err.message
      });
    });
};

export const fetchQuotes = (req, res) => {
  datasets.fetchQuotes().then(Res => {
    res.status(200).json(Res);
  });
};

export const fetchSingleQuote = (req, res) => {
  const quote_id = parseInt(req.params.quote_id, 10)
  datasets
    .fetchSingleQuote(quote_id)
    .then(Res => {
      res.status(200).json(Res);
    })
    .catch(err => {
      res.status(err.status).json({
        message: err.message
      });
    });
};

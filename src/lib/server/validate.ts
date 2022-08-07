import { validationResult } from 'express-validator';

const validate = (validations) => {
  return async (req, res, next) => {
    if (validations) {
      await Promise.all(validations.map((validation) => validation.run(req)));
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }

      const errorObject = {};
      errors.array().forEach((error) => (errorObject[error.param] = error));
      res.status(422).json({ errors: errorObject });
    } else {
      res.status(422).json({ errors: 'Error validating' });
    }
  };
};

export default validate;

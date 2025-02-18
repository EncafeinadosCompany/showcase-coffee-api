const { validationResult } = require("express-validator");

// const validationMiddleware = (req, res, next) => {

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const translatedErrors = errors.array().map((error) => ({
//       field: error.path,
//       msg: errorMessages[lang]?.[error.msg] || error.msg,
//     }));

//     return res.status(400).json({ errors: translatedErrors });
//   }

//   next();
// };

const validationMiddleware = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) { 
      return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validationMiddleware;

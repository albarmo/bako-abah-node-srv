function errorHandler(err, req, res, next) {
  let msg = '';
  let code = '';

  switch (err.name) {
    case 'SequelizeValidationError':
      let errors = [];
      err.errors.forEach((el) => {
        errors.push(el.message);
      });
      code = 400;
      msg = `${errors}`;
      break;

    case 'SequelizeUniqueConstraintError':
      let errors2 = [];
      err.errors.forEach((el) => {
        errors2.push(el.message);
      });
      code = 400;
      msg = `${errors2}`;
      break;

    case 'Wrong Email or Password':
      code = 404;
      msg = 'Wrong Email or Password';
      break;

    case 'Unauthenticated':
      code = 401;
      msg = 'Unauthenticated. You need to login first';
      break;

    case 'Not Authorized':
      code = 403;
      msg = 'You are not Authorized';
      break;

    default:
      code = 500;
      msg = err.message;
      break;
  }

  return res.status(code).json({ msg });
}

module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    let msg = [];
    let code = "";

    switch (err.name) {
        case "SequelizeValidationError":
            const validationError = [];
            err.errors.forEach((el) => {
                validationError.push(el.message);
            });
            code = 400;
            msg.push(...validationError);
            break;

        case "SequelizeUniqueConstraintError":
            const uniqueConstraintError = [];
            err.errors.forEach((el) => {
                uniqueConstraintError.push(el.message);
            });
            code = 400;
            msg.push(...uniqueConstraintError);
            break;

        case "Wrong Email or Password":
            code = 404;
            msg = "Wrong Email or Password";
            break;

        case "Unauthenticated":
            code = 401;
            msg = "Unauthenticated. You need to login first";
            break;

        case "Not Authorized":
            code = 403;
            msg.push("Unauthenticated. You need to login first");
            msg = "You are not Authorized";
            break;

        default:
            code = 500;
            msg = err.message;
            break;
    }

    return res.status(code).json({ msg });
}

module.exports = errorHandler;

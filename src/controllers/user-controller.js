const { User, Sequelize } = require("../../models");

const { validate } = require("uuid");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAccessToken } = require("../helpers/jwt");

class UserController {
    static async getCurrentUser(req, res, next) {
        const { id } = req.userData;
        let data = await User.findOne({ where: { id: id } });
        try {
            if (data) {
                return res.status(200).json({ users: data });
            } else {
                return res.status(500).json({ message: "not an user!" });
            }
        } catch (error) {
            next(error);
        }
    }

    static async getUserList(req, res, next) {
        let { role, sort, page } = req.query;
        const paramQuerySQL = {};
        let limit;
        let offset;

        // filtering
        if (role !== "" && typeof role !== "undefined") {
            paramQuerySQL.where = {
                role: role,
            };
        }

        // sorting
        if (sort !== "" && typeof sort !== "undefined") {
            let query;
            if (sort.charAt(0) !== "-") {
                query = [[sort, "ASC"]];
            } else {
                query = [[sort.replace("-", ""), "DESC"]];
            }

            paramQuerySQL.order = query;
        }

        // pagination
        if (page !== "" && typeof page !== "undefined") {
            if (page.size !== "" && typeof page.size !== "undefined") {
                limit = page.size;
                paramQuerySQL.limit = limit;
            }

            if (page.number !== "" && typeof page.number !== "undefined") {
                offset = page.number * limit - limit;
                paramQuerySQL.offset = offset;
            }
        } else {
            limit = 5;
            offset = 0;
            paramQuerySQL.limit = limit;
            paramQuerySQL.offset = offset;
        }

        try {
            let data = await User.findAll(paramQuerySQL);
            if (data) {
                return res.status(200).json({ users: data });
            } else {
                return res.status(500).json({ message: "user table empty" });
            }
        } catch (error) {
            next(error);
        }
    }

    static async register(req, res, next) {
        const {
            first_name,
            last_name,
            email,
            phone_number,
            password,
        } = req.body;

        try {
            const response = await User.create({
                first_name,
                last_name,
                email,
                phone_number,
                password,
            });
            return res.status(201).json(response);
        } catch (error) {
            return next(error);
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email: email },
        });

        try {
            if (!user) {
                return res
                    .status(400)
                    .json({ message: "Failed, user not registered" });
            } else if (!comparePassword(password, user.dataValues.password)) {
                return res
                    .status(401)
                    .json({ msg: "email or password wrong!" });
            } else {
                const token = generateAccessToken({
                    id: user.id,
                    email: user.email,
                    password: user.password,
                    phone_number: user.phone_number,
                    role: user.role,
                });
                return res.status(200).json({ access_token: token });
            }
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        const { id } = req.params;
        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        const { first_name, last_name, email, phone_number } = req.body;

        try {
            const userDataById = await User.findOne({
                where: {
                    id: id,
                },
                returning: true,
                plain: true,
            });

            if (userDataById) {
                const updateUser = await User.update(
                    {
                        first_name,
                        last_name,
                        email,
                        phone_number,
                    },
                    {
                        where: {
                            id: id,
                        },
                        returning: true,
                    }
                );
                if (updateUser) {
                    return res.status(200).json({ updateUser });
                }
            } else if (!userDataById) {
                res.status(404).json({ msg: "user not found!" });
            }
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res, next) {
        const { id } = req.params;
        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        try {
            const deleteUser = await User.destroy({
                where: { id: id },
                returning: true,
            });
            if (deleteUser) {
                return res
                    .status(200)
                    .json({ message: `success delete user with id ${id}` });
            } else {
                return res.status(404).json({
                    message: `failed, delete user with id ${id} not found`,
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;

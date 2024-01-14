const { User } = require("../../models");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { generateAccessToken } = require("../helpers/jwt");

class UserController {
    static async getCurrentUser(req, res, next) {
        const { id, email } = req.userData;

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

    static async list(req, res, next) {
        let data = await User.findAll();
        try {
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
        let inputDataRegister = {
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            type: req.body.type,
            address: req.body.address,
            region: req.body.region,
            gender: req.body.gender,
            password: req.body.password,
        };

        User.create(inputDataRegister, {})
            .then((data) => {
                return res.status(201).json({ data });
            })
            .catch((error) => {
                next(error);
            });
    }

    static async login(req, res, next) {
        const inputLogin = {
            email: req.body.email,
            password: req.body.password,
        };

        const user = await User.findOne({
            where: { email: inputLogin.email },
        });

        const UserId = user.dataValues.id;

        try {
            if (!user) {
                return res
                    .status(400)
                    .json({ message: "failed, user not registered" });
            } else if (
                !comparePassword(inputLogin.password, user.dataValues.password)
            ) {
                return res
                    .status(401)
                    .json({ msg: "email or password wrong!" });
            } else {
                const token = generateAccessToken({
                    id: user.id,
                    email: user.email,
                    password: user.password,
                });
                return res.status(200).json({ access_token: token });
            }
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        const { id } = req.params;
        const inputDataUpdate = {
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            type: req.body.type,
            address: req.body.address,
            region: req.body.region,
            gender: req.body.gender,
        };

        try {
            const userDataById = await User.findOne({
                where: {
                    id: id,
                },
                returning: true,
                plain: true,
            });

            if (userDataById) {
                const updateUser = await User.update(inputDataUpdate, {
                    where: {
                        id: id,
                    },
                    returning: true,
                });
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

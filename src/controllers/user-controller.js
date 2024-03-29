const {User, Sequelize} = require( "../../models" );
const { Op } = Sequelize;
const { validate } = require("uuid");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAccessToken } = require("../helpers/jwt");

class UserController {
    static async getCurrentUser(req, res, next) {
        const { id } = req.userData;
        let data = await User.findOne({ where: { id: id } });
        try {
            if (data) {
                return res.status(200).json({ status: 200, user: data });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: "Failed get current user data",
                });
            }
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(req, res, next) {
        const { id } = req.params;
        let data = await User.findByPk(id);
        try {
            if (data) {
                return res.status(200).json({ status: 200, users: data });
            } else {
                return res
                    .status(404)
                    .json({ status: 404, message: "not an user!" });
            }
        } catch (error) {
            next(error);
        }
    }

    static async getUserList(req, res, next) {
        let { filter, sort, page } = req.query;
        const paramQuerySQL = {};
        let limit;
        let offset;
      
        if (
            filter?.role !== "" &&
            typeof filter?.role !== "undefined"
        ) {
            paramQuerySQL.where = {
                ...paramQuerySQL.where,
                role: { [Op.eq]: filter.role },
            };
        }
        if (filter?.email !== "" && typeof filter?.email !== "undefined") {
            paramQuerySQL.where = {
                ...paramQuerySQL.where,
                email: { [Op.iLike]: `%${filter.email}%` },
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
         if (page?.size !== "" && typeof page?.size !== "undefined") {
            limit = page?.size;
            paramQuerySQL.limit = limit;
        } else{
            limit = 10;
            paramQuerySQL.limit = limit;
         }
        
        if (page?.number !== "" && typeof page?.number !== "undefined") {
            offset = page?.number * limit - limit;
            paramQuerySQL.offset = offset;
        } else {
            offset = 0;
            paramQuerySQL.offset = offset;
        }


        try {
            let data = await User.findAndCountAll(paramQuerySQL);
            if (data) {
                return res
                    .status(200)
                    .json({ status: 200, message: "OK", data });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: "User Not Found",
                });
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

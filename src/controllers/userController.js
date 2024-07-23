const User = require('../models/userModel');

exports.register = async function (req, res) {
    const reqBody = req.body;

    try {
        const userRecord = new User(reqBody);
        if (reqBody['password']) {
            userRecord.password = userRecord.generateHash(reqBody['password']);
        }
        const saveRecord = await userRecord.save();
        const token = userRecord.toAuthJSON();
        res.status(200).send({
            status: 1,
            message: "User Created Successfully",
            data: saveRecord,
            token: token
        })
    } catch (err) {
        res.status(400).send({
            status: 1,
            data: err,
            message: "User Creation Error"
        })
    }
}

exports.login = async function (req, res) {
    const reqBody = req.body;
    const userRecord = await User.findOne({ email: reqBody['email'], deleted: false, active: true });
    if (userRecord) {
        if (!userRecord.validPassword(reqBody.password)) {
            let resp = {
                status: 1,
                message: "Invalid User ID and Password",
                error: "Invalid User ID and Password"
            }
            res.status(400).send(resp);
        } else {
            const userInfo = userRecord.toJSON();
            userInfo['token'] = userRecord.toAuthJSON();
            let resp = {
                status: 1,
                message: "Login Successfully",
                data: userInfo
            }
            res.status(200).send(resp);
        }
    } else {
        let resp = {
            status: 1,
            message: "User Login Error",
            error: {},
        }
        res.status(400).send(resp);
    }
}



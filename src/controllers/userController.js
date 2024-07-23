const User = require('../models/userModel');

//Custom Logger
const Logger = require('../utils/logger');
const requestIP = require('request-ip');
const UAParser = require('ua-parser-js');
const parser = new UAParser();

exports.register = async function (req, res) {
    const reqBody = req.body;

    try {
        const userRecord = new User(reqBody);
        if (reqBody['password']) {
            userRecord.password = userRecord.generateHash(reqBody['password']);
        }
        const saveRecord = await userRecord.save();
        const token = userRecord.toAuthJSON();

        //Custom Logger
        Logger.addAuditLog(requestIP.getClientIp(req), req.protocol + '://' + req.get('host') + req.originalUrl, "Success", req.originalUrl.split("?").shift(), 'Create', req.method, req.socket.remoteAddress, parser.setUA(req.headers['user-agent']).getOS().name, parser.setUA(req.headers['user-agent']).getOS().version, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version)
        res.status(200).send({
            status: 1,
            message: "User Created Successfully",
            data: saveRecord,
            token: token
        })
    } catch (err) {
        Logger.addAuditLog(requestIP.getClientIp(req), req.protocol + '://' + req.get('host') + req.originalUrl, "Failure", req.originalUrl.split("?").shift(), 'Create', req.method, req.socket.remoteAddress, parser.setUA(req.headers['user-agent']).getOS().name, parser.setUA(req.headers['user-agent']).getOS().version, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version)
        res.status(500).send({
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
                message: req.__('invalid_credentials'),
                error: "Invalid User ID and Password"
            }
            res.status(400).send(resp);
        } else {
            const userInfo = userRecord.toJSON();
            userInfo['token'] = userRecord.toAuthJSON();
            Logger.addAuditLog(requestIP.getClientIp(req), req.protocol + '://' + req.get('host') + req.originalUrl, "Success", req.originalUrl.split("?").shift(), 'Update', req.method, req.socket.remoteAddress, parser.setUA(req.headers['user-agent']).getOS().name, parser.setUA(req.headers['user-agent']).getOS().version, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version)
            let resp = {
                status: 2,
                message: req.__('login_successful'),
                data: userInfo
            }
            res.status(200).send(resp);
        }
    } else {
        Logger.addAuditLog(requestIP.getClientIp(req), req.protocol + '://' + req.get('host') + req.originalUrl, "Failure", req.originalUrl.split("?").shift(), 'Create', req.method, req.socket.remoteAddress, parser.setUA(req.headers['user-agent']).getOS().name, parser.setUA(req.headers['user-agent']).getOS().version, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version)
        let resp = {
            status: 1,
            message: "User Login Error",
            error: {},
        }
        res.status(500).send(resp);
    }
}



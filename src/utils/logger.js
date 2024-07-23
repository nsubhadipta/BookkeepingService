const LogModel = require('../models/logModel');


exports.addAuditLog = async (reqUrl , status , route , action , method , ip , os , osVersion , bName, bVersion , deviceType) => {
    try {
        const data = {
            IPAddress: ip,
            URL: reqUrl, 
            DeviceType: deviceType,
            OS: os,
            Os_Version: osVersion,
            Browser_name: bName,
            Browser_version: bVersion,
            DateTime: new Date(),
            Action: action,
            Method: method,
            Status: status, 
            route: route,
        }
        const LogRecord = new LogModel(data);
        await LogRecord.save();      
    } catch (e) { 
        console.error(e);
    }
}
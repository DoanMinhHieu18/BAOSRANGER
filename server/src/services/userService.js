import db from "../models/index";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let getFolderId = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { mail: data }
            })
            resolve(user.folderid);
        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
}

let updateFolderId = (email, folderid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { mail: email }
            })
            if (user) {
                user.folderid = folderid;
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update success",
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Not exit user in database"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getFolderId, updateFolderId
}
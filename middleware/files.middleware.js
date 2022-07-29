const multer  = require('multer')
const path = require('path')
const upload = multer({ dest: 'uploads/' })

// const storage  = multer.diskStorage({
//     destination :function (req, res, cb) {
//         cb(null , "uploads")
//     },  
//     filename :function (req, res, cb) {
//         const MYfilename = file.fieldname+"-"+path.extname(file.originslname)
//         cb(null , MYfilename)
//     }
// })
// const upload2 = multer({
//     storage , 
//     limits : {fileSize : 1024*1024}
// })
module.exports =upload;

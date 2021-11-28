const FileService = require("../services/file.service");

exports.getFile = async (req, res, next) => {
  try {
    const data = await FileService.getFileStream(req.params.name, res);
    res.setHeader("content-type", data.contentType);
    data.rs.pipe(res);
  } catch (err) {
    console.log(err);
  }
};

exports.getAll = (req, res, next) => {};

const FileRepository = require("../repositories/file.repository.js");

exports.getFile = async (req, res, next) => {
  try {
    const data = await FileServer.getFileStream(req.params.name, res);
    res.setHeader("content-type", data.contentType);
    data.rs.pipe(res);
  } catch (err) {
    console.log(err);
  }
};

exports.getAll = (req, res, next) => {};

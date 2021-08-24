const FileRepository = require("../repositories/file.repository.js");

exports.getFile = (req, res, next) => {
  FileRepository.getFile(req.params.name, res);
};

exports.getAll = (req, res, next) => {};

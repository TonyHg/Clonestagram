const FileRepository = require("../repositories/file.repository.js");

exports.getFileStream = async (filename) => {
  return await FileRepository.getFileStream(filename);
};

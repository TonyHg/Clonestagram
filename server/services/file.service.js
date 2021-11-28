const FileRepository = require("../repositories/file.repository");

exports.getFileStream = async (filename) => {
  return await FileRepository.getFileStream(filename);
};

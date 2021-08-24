import { requests } from './api';

export const FileRequest = {
  getFile: (id: string): Promise<string> => requests.get("file/file/" + id)
}
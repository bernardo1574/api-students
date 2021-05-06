import { unlink } from 'fs';

export default async (path) => {
  unlink(path, (error) => {
    if (error) {
      return console.log(error);
    }
    return true;
  });
};

import fs from 'node:fs/promises';

const isFileExists = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (e) {
    return false;
  }
};

export default async (options) => {
  const {
    lat, lon, output, force,
  } = options;

  if (await isFileExists(output)) {
    if (force) {
      await fs.writeFile(output, `output=${output} lat=${lat}, lon=${lon}`);
    } else {
      throw new Error(`File ${output} already exists`);
    }
  }

  if (output) {
    await fs.writeFile(output, `output=${output} lat=${lat}, lon=${lon}`);
  } else {
    console.log(options);
  }
};

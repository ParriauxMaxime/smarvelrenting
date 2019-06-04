const fs = require('fs');
const path = require('path');

const credentialsNotFound = 'PRIVATE_API_KEY or PUBLIC_API_KEY not found';

function createError(reason, error) {
  console.error(reason);
  console.trace(error);
  process.exit(1);
}

function init() {
  const { PRIVATE_API_KEY, PUBLIC_API_KEY } = process.env;
  if (!PRIVATE_API_KEY || !PUBLIC_API_KEY) {
    console.warn(`${credentialsNotFound} in ENV, trying to read server/.credentials`);
    try {
      const file = fs.readFileSync(path.resolve(__dirname, '../.credentials'), 'utf-8');
      try {
        const [
          key,
          pubKey,
        ] = [
          /PRIVATE_API_KEY=(.*)/.exec(file.slice())[1],
          /PUBLIC_API_KEY=(.*)/.exec(file.slice())[1],
        ];
        console.log('Found credentials');
        return { key, pubKey };
      } catch (error) {
        createError(`${credentialsNotFound} in file .credentials`, error);
      }
    } catch (error) {
      createError('file .credentials not found in server directory', error);
    }
  }
  console.log('Found credentials');
  return {
    key: PRIVATE_API_KEY,
    pubKey: PUBLIC_API_KEY,
  };
}

const credentials = init();

module.exports = credentials;

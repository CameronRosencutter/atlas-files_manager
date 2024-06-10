/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
/* eslint-disable linebreak-style */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import dbClient from './utils/db';

const waitConnection = () => {
  return new Promise((resolve, reject) => {
    let i = 0;
    const repeatFct = async () => {
      await setTimeout(() => {
        i += 1;
        if (i >= 10) {
          reject('Connection to MongoDB failed');
        } else if (!dbClient.isAlive()) {
          repeatFct();
        } else {
          resolve();
        }
      }, 1000);
    };
    repeatFct();
  });
};

(async () => {
  console.log(`MongoDB is alive: ${dbClient.isAlive()}`);
  await waitConnection();
  console.log(`MongoDB is alive: ${dbClient.isAlive()}`);
  
  const usersCount = await dbClient.nbUsers();
  console.log(`Number of users: ${usersCount}`);
  
  const filesCount = await dbClient.nbFiles();
  console.log(`Number of files: ${filesCount}`);
})();

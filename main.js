/* eslint-disable linebreak-style */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import redisClient from './utils/redis';

(async () => {
    // Adding a small delay to allow the Redis client to connect
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Redis client is alive:', redisClient.isAlive());

    console.log('Initial value of myKey:', await redisClient.get('myKey'));
    await redisClient.set('myKey', 12, 5);
    console.log('Value of myKey after setting:', await redisClient.get('myKey'));

    setTimeout(async () => {
        console.log('Value of myKey after 10 seconds:', await redisClient.get('myKey'));
    }, 10000);
})();

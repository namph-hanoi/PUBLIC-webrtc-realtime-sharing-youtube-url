import { get } from 'https';

export function executeWget(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';

    get(url, function (response) {
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(data);
      });

      response.on('error', (error) => {
        reject(error);
      });
    });
  });
}

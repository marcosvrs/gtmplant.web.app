import * as functions from 'firebase-functions';
import { convertToPlant } from 'gtmplant';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const api = functions.https.onRequest((request: functions.https.Request, response: functions.Response) => {
    response.send(convertToPlant(request.body.file));
});

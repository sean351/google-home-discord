// index.ts - Main entry point for the application
import * as functions from 'firebase-functions';
import { dialogflow } from 'actions-on-google';
import * as intentHandlers from './intentHandlers';

// Initialize the Actions on Google client
const app = dialogflow({ debug: true });

// Register all intent handlers
app.intent('Default Welcome Intent', intentHandlers.welcome);
app.intent('Create Role Intent', intentHandlers.createRole);
app.intent('Help Intent', intentHandlers.help);
app.intent('End Conversation', intentHandlers.endConversation);

// Export the Cloud Function
export const dialogflowFirebaseFulfillment = functions.https.onRequest(app);
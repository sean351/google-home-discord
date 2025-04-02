// index.ts - Direct implementation using Actions SDK instead of Dialogflow
import * as functions from 'firebase-functions';
import { conversation } from '@assistant/conversation';
import * as discordService from './discordService';

// Initialize the Actions SDK app
const app = conversation({ debug: true });

// Handle the main welcome intent
app.handle('welcome', (conv) => {
  conv.add('Welcome to Discord Role Manager. I can help you create roles in your Discord server. For example, you can say "create a role called moderator".');
  
  // Add suggestion chips
  conv.add({
    type: 'chips',
    options: [
      {
        text: 'Create a role'
      },
      {
        text: 'Help'
      }
    ]
  });
});

// Handle the help intent
app.handle('help', (conv) => {
  conv.add('You can ask me to create a role in your Discord server. For example, say "create a role called moderator".');
  
  // Add suggestion chips
  conv.add({
    type: 'chips',
    options: [
      {
        text: 'Create a role called moderator'
      }
    ]
  });
});

// Handle the create role intent
app.handle('create_role', async (conv) => {
  // Get the role name from the slot
  const roleName = conv.intent.params?.role_name?.resolved;
  
  if (!roleName) {
    conv.add("I didn't catch the role name. What role would you like to create?");
    return;
  }
  
  try {
    await discordService.createDiscordRole(roleName);
    
    conv.add(`I've created the role ${roleName} in your Discord server. Would you like to create another role?`);
    
    // Add suggestion chips
    conv.add({
      type: 'chips',
      options: [
        {
          text: 'Create another role'
        },
        {
          text: 'No thanks'
        }
      ]
    });
  } catch (error) {
    console.error('Error in createRole:', error);
    
    conv.add("I'm sorry, I couldn't create that role. Please check your Discord bot permissions and try again.");
    
    // Add suggestion chips
    conv.add({
      type: 'chips',
      options: [
        {
          text: 'Try again'
        },
        {
          text: 'Help'
        }
      ]
    });
  }
});

// Handle end conversation
app.handle('end_conversation', (conv) => {
  conv.add("Thanks for using Discord Role Manager. Goodbye!");
  conv.scene.next.name = 'actions.scene.END_CONVERSATION';
});

// Export the Cloud Function
export const actionsFirebaseFulfillment = functions.https.onRequest(app);
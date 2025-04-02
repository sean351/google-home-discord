// intentHandlers.ts - Contains all intent handler functions
import { SimpleResponse, Suggestions, DialogflowConversation } from 'actions-on-google';
import * as discordService from './discordService';

// Type for role creation parameters
interface RoleParams {
  roleName?: string;
}

/**
 * Welcome intent handler - When the user starts the conversation
 */
export const welcome = (conv: DialogflowConversation): void => {
  conv.ask(new SimpleResponse({
    speech: 'Welcome to Discord Role Manager. I can help you create roles in your Discord server. For example, you can say "create a role called moderator".',
    text: 'Welcome to Discord Role Manager! I can create roles in your Discord server.'
  }));
  
  conv.ask(new Suggestions(['Create a role', 'Help']));
};

/**
 * Create role intent handler - Main functionality
 */
export const createRole = async (conv: DialogflowConversation, params: RoleParams): Promise<void> => {
  const { roleName } = params;
  
  if (!roleName) {
    conv.ask("I didn't catch the role name. What role would you like to create?");
    return;
  }
  
  try {
    await discordService.createDiscordRole(roleName);
    
    conv.ask(new SimpleResponse({
      speech: `I've created the role ${roleName} in your Discord server. Would you like to create another role?`,
      text: `✅ Role "${roleName}" has been created successfully!`
    }));
    
    conv.ask(new Suggestions(['Create another role', 'No thanks']));
  } catch (error) {
    console.error('Error in createRole:', error);
    
    conv.ask(new SimpleResponse({
      speech: "I'm sorry, I couldn't create that role. Please check your Discord bot permissions and try again.",
      text: "❌ Role creation failed. Please check your Discord bot permissions."
    }));
    
    conv.ask(new Suggestions(['Try again', 'Help']));
  }
};

/**
 * Help intent handler
 */
export const help = (conv: DialogflowConversation): void => {
  conv.ask(new SimpleResponse({
    speech: 'You can ask me to create a role in your Discord server. For example, say "create a role called moderator".',
    text: 'Say "create a role called [name]" to add a new role to your Discord server.'
  }));
  
  conv.ask(new Suggestions(['Create a role called moderator']));
};

/**
 * End conversation handler
 */
export const endConversation = (conv: DialogflowConversation): void => {
  conv.close(new SimpleResponse({
    speech: "Thanks for using Discord Role Manager. Goodbye!",
    text: "Thanks for using Discord Role Manager. Goodbye!"
  }));
};
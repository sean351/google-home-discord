// config.ts - Configuration variables for the application
import * as functions from 'firebase-functions';

// Configuration interface
interface Config {
  DISCORD_BOT_TOKEN: string;
  DISCORD_GUILD_ID: string;
}

// Get configuration from Firebase environment
// For local development, you can use the .env file or set process.env variables
const getConfig = (): Config => {
  try {
    // Try to get config from Firebase functions
    return {
      DISCORD_BOT_TOKEN: functions.config().discord.token,
      DISCORD_GUILD_ID: functions.config().discord.guild_id
    };
  } catch (error) {
    // Fallback to environment variables
    return {
      DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN || '',
      DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID || ''
    };
  }
};

export const config: Config = getConfig();
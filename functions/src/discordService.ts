// discordService.ts - Contains functions for interacting with Discord API
import axios from 'axios';
import { config } from './config';

// Discord role interface
interface DiscordRole {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
}

/**
 * Create a new role in the Discord server
 * @param roleName - The name for the new role
 * @param roleColor - Optional color for the role (decimal color code)
 * @returns Promise with the created role data
 */
export const createDiscordRole = async (roleName: string, roleColor?: number): Promise<DiscordRole> => {
  try {
    // Default color if none provided (random color)
    const color = roleColor || Math.floor(Math.random() * 16777215);
    
    // Make API request to Discord
    const response = await axios({
      method: 'post',
      url: `https://discord.com/api/v10/guilds/${config.DISCORD_GUILD_ID}/roles`,
      headers: {
        'Authorization': `Bot ${config.DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: {
        name: roleName,
        color: color,
        mentionable: true
      }
    });
    
    return response.data as DiscordRole;
  } catch (error) {
    console.error('Error creating Discord role:', error);
    throw error;
  }
};

/**
 * Get all roles from the Discord server
 * @returns Promise with all roles from the server
 */
export const getDiscordRoles = async (): Promise<DiscordRole[]> => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://discord.com/api/v10/guilds/${config.DISCORD_GUILD_ID}/roles`,
      headers: {
        'Authorization': `Bot ${config.DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data as DiscordRole[];
  } catch (error) {
    console.error('Error getting Discord roles:', error);
    throw error;
  }
};
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDiscordRole = void 0;
// discordService.ts - Contains functions for interacting with Discord API
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
/**
 * Create a new role in the Discord server
 * @param roleName - The name for the new role
 * @param roleColor - Optional color for the role (decimal color code)
 * @returns Promise with the created role data
 */
const createDiscordRole = async (roleName, roleColor) => {
    try {
        // Default color if none provided (random color)
        const color = roleColor || Math.floor(Math.random() * 16777215);
        // Make API request to Discord
        const response = await (0, axios_1.default)({
            method: 'post',
            url: `https://discord.com/api/v10/guilds/${config_1.config.DISCORD_GUILD_ID}/roles`,
            headers: {
                'Authorization': `Bot ${config_1.config.DISCORD_BOT_TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: {
                name: roleName,
                color: color,
                mentionable: true
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error creating Discord role:', error);
        throw error;
    }
};
exports.createDiscordRole = createDiscordRole;
//# sourceMappingURL=discordService.js.map
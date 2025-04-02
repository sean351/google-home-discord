"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
// config.ts - Configuration variables for the application
const functions = __importStar(require("firebase-functions"));
// Get configuration from Firebase environment
// For local development, you can use the .env file or set process.env variables
const getConfig = () => {
    try {
        // Try to get config from Firebase functions
        return {
            DISCORD_BOT_TOKEN: functions.config().discord.token,
            DISCORD_GUILD_ID: functions.config().discord.guild_id
        };
    }
    catch (error) {
        // Fallback to environment variables
        return {
            DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN || '',
            DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID || ''
        };
    }
};
exports.config = getConfig();
//# sourceMappingURL=config.js.map
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
exports.actionsFirebaseFulfillment = void 0;
// index.ts - Direct implementation using Actions SDK instead of Dialogflow
const functions = __importStar(require("firebase-functions"));
const conversation_1 = require("@assistant/conversation");
const discordService = __importStar(require("./discordService"));
// Initialize the Actions SDK app
const app = (0, conversation_1.conversation)({ debug: true });
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
    }
    catch (error) {
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
exports.actionsFirebaseFulfillment = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map
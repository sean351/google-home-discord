{
  "actions": [
    {
      "description": "Default Welcome Intent",
      "name": "MAIN",
      "fulfillment": {
        "conversationName": "discord_role_manager"
      },
      "intent": {
        "name": "actions.intent.MAIN",
        "trigger": {
          "queryPatterns": [
            "talk to Discord Role Manager",
            "speak with Discord Role Manager",
            "open Discord Role Manager"
          ]
        }
      }
    }
  ],
  "conversations": {
    "discord_role_manager": {
      "name": "discord_role_manager",
      "url": "YOUR_WEBHOOK_URL",
      "fulfillmentApiVersion": 2,
      "scenes": {
        "main": {
          "name": "main",
          "slots": [{
            "name": "role_name",
            "type": "actions.type.Text"
          }],
          "intentEvents": [
            {
              "handler": {
                "webhookHandler": "welcome"
              },
              "intent": "actions.intent.MAIN"
            },
            {
              "handler": {
                "webhookHandler": "create_role"
              },
              "pattern": {
                "entities": [
                  {
                    "name": "role_name",
                    "type": "actions.type.Text"
                  }
                ],
                "speech": [
                  "create a role called $role_name",
                  "add a role named $role_name",
                  "make a new role $role_name"
                ]
              }
            },
            {
              "handler": {
                "webhookHandler": "help"
              },
              "pattern": {
                "speech": [
                  "help",
                  "how does this work",
                  "what can you do"
                ]
              }
            },
            {
              "handler": {
                "webhookHandler": "end_conversation"
              },
              "pattern": {
                "speech": [
                  "goodbye",
                  "exit",
                  "quit",
                  "no thanks"
                ]
              }
            }
          ]
        }
      }
    }
  },
  "locale": "en"
}
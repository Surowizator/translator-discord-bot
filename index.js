const fs = require('fs');
const Discord = require('discord.js')
const trig = require('trigedasleng-api');
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

    if (/!trigeng .*/.test(msg.content)) {
        const search = msg.content.split(' ').slice(1, msg.content.split(' ').length).join('_');
        trig.search(search, 'trig')
        .then(json => {
            const {exactMatch, words} = json;
            let translation = '';

            if (!exactMatch.length) {
                if (!words.length) {
                    msg.channel.send(`\`\`\`
No entries found
\`\`\``);
                } else {
                    words[0].translations.forEach(obj => translation += `- ${obj.fullText}\n`);
                    msg.channel.send(`\`\`\`
${words[0].text} means:\n${translation}\`\`\``);
                }
            } else {
                exactMatch.forEach(word => word.translations.forEach(obj => translation += `- ${obj.fullText}\n`));
                msg.channel.send(`\`\`\`
${exactMatch[0].text} means: \n${translation}\`\`\``);
            }
        })
        .catch(console.error);
    }
});

fs.readFile('token.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        client.login(data)
    }
});
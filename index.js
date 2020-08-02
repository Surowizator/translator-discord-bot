const Discord = require('discord.js')
const trig = require('trigedasleng-api');
const token = require('./token.js');

const client = new Discord.Client()
client.login(token)

client.once('ready', () => console.log(`logged in as ${client.user.tag}!`));

client.on('message', msg => {

    if (/!trigeng .*/.test(msg.content)) {
        const search = msg.content.split(' ').slice(1, msg.content.split(' ').length).join('_');
        trig.search(search, 'trig')
        .then(json => {
            const {exactMatch, words} = json;
            let translation = '';

            if (exactMatch.length) {
                exactMatch.forEach(word => word.translations.forEach(obj => translation += `- ${obj.fullText}\n`));
                msg.channel.send(`\`\`\`"${exactMatch[0].text}" means: \n${translation}\`\`\``);        
            } else {
                if (words.length) {
                    words[0].translations.forEach(obj => translation += `- ${obj.fullText}\n`);
                    msg.channel.send(`\`\`\`"${words[0].text}" means:\n${translation}\`\`\``);
                } else {
                    msg.channel.send(`\`\`\`No entries found\n\`\`\``);
                }
            }
        })
        .catch(() => msg.channel.send(`\`\`\`Server error\`\`\``));
    }

    if (/!engtrig .*/.test(msg.content)) {
        const search = msg.content.split(' ').slice(1, msg.content.split(' ').length).join('_');
        trig.search(search, 'eng')
        .then(json => {
            const {exactMatch, words} = json;
            let translation = '';

            if (exactMatch.length) {
                exactMatch.forEach(word => translation += `- ${word.text}\n`);
                msg.channel.send(`\`\`\`"${search.split('_').join(' ')}" is: \n${translation}\`\`\``);        
            } else {
                if (words.length) {
                    translation = `- ${words[0].text}\n`;
                    msg.channel.send(`\`\`\`"${search.split('_').join(' ')}" is:\n${translation}\`\`\``);
                } else {
                    msg.channel.send(`\`\`\`No entries found\n\`\`\``);
                }
            }
        })
        .catch(() => msg.channel.send(`\`\`\`Server error\`\`\``));
    }
    
});
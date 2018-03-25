const Discord = require("discord.js");


const client = new Discord.Client({
    owner: '285887620813160450'
});


const config = require("./config.json");

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {

  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});


client.on("message", async message => {

  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;


  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if(command === "ping") {

    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === "e") {
    if (message.author.id !== '285887620813160450') 
    return;
    const sayMessage = args.join(" ");

    message.delete().catch(O_o=>{});

    message.channel.send({embed:{
      color: 0x000000,
      description: sayMessage
    }})
  }

  if(message.content.startsWith(config.prefix+"8ball")) {
    if(!args[2]) return message.reply("Please ask a full quesition");
    let replies = ["Yes", "No", "I don't know", "Ask later again"];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#0FF469")
    .addField("Question", question)
    .addField("Answer", replies[result]);

      message.channel.send(ballembed);
 }

   if(command === "a") {
    if (message.author.id !== '285887620813160450') 
    return;
    const sayMessage = args.join(" ");

    message.delete().catch(O_o=>{});

    message.channel.send(sayMessage)
  }

  if(command === "kick") {
    if(!message.member.roles.some(r=>["Admin"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");

    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.channel.send({embed:{
        color: 0x00f469,
        description: `**${member.user.tag}** has been kicked by **${message.author.tag}** because: ${reason}`
    }});

  }
    
  if(command === "kicka") {
   if (message.author.id !== '285887620813160450') 
    return;
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");

    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.channel.send({embed:{
        color: 0x00f469,
        description: `**${member.user.tag}** has been kicked by **${message.author.tag}** because: ${reason}`
    }});

  }

  if(message.content.startsWith(config.prefix + "prune")){
    if(!message.member.roles.some(r=>["Admin"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    let args = message.content.split(" ").slice(1);
    let author = message.member;
    let role = message.guild.roles.find('name', "MFA");
    if(author.roles.has(role.id)){
        if(!args[0]){
            message.delete();
            message.author.send("No args gives.");
            return;
        }
        if(args[0] > 100){
            message.delete();
            message.author.send("Not more then 100.");
            return;
        }

        message.delete();
        message.channel.bulkDelete(args[0]);
        message.channel.send("Succesfully deleted " + args[0] + " messages.")
        return;
      }
    }

  if(command === "ban") {

    if(!message.guild.member.hasPermission("BAN_MEMBERS", true)) {
        return message.reply("You dont have permissions");
    }
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable)
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.channel.send({embed:{
        color: 0x00f469,
        description: `**${member.user.tag}** has been banned by **${message.author.tag}** because: ${reason}`
    }});
  }

});

client.login(process.env.BOT_TOKEN);


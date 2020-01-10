const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];


module.exports.aliasReplacer = function (message, client, guild, user) { //message to parse, discord Client, guild (optional), user (optional)
	let msg = message;
	//global replacers
	msg = msg.replace(/\{globalusers\}/gi, this.addCommas(this.globalUsers(client)));
	msg = msg.replace(/\{globalguilds\}/gi, this.addCommas(client.guilds.size));
	msg = msg.replace(/\{date\}/gi, this.datestamp());
	msg = msg.replace(/\{time\}/gi, this.simpleTimestamp());
	//guild replacers
	if (guild !== null) {
		msg = msg.replace(/\{guildname\}/gi, guild.name);
		msg = msg.replace(/\{guildusers\}/gi, this.addCommas(guild.memberCount));
		msg = msg.replace(/\{guildchannels\}/gi, this.addCommas(guild.channels.size));
		msg = msg.replace(/\{guildroles\}/gi, this.addCommas(guild.roles.size));
	}
	//user replacers
	if (user !== null) {
		msg = msg.replace(/\{userid\}/gi, user.id);
		msg = msg.replace(/\{usertag\}/gi, user.tag);
		msg = msg.replace(/\{username\}/gi, user.username);
		msg = msg.replace(/\{usermention\}/gi, `<@${user.id}>`);
		msg = msg.replace(/\{usercreated\}/gi, this.datestamp(new Date(user.createdTimestamp)));
		msg = msg.replace(/\{useravatar\}/gi, user.avatarURL({ format: 'png', size: 2048 }));
	}
	return msg;
}


module.exports.globalUsers = function (client) { // A fix because client.users.size only counts cached users
	let count = 0;
	client.guilds.forEach((guild) => {
        count += guild.memberCount;
	});
	return count;
}


module.exports.datetimestamp = function (date = new Date()) {
	return `${this.datestamp(date)} | ${this.timestamp(date)}`;
}


module.exports.datestamp = function (date = new Date()) {
	return `${months[date.getMonth()]} ${this.th(date.getDate())} ${date.getFullYear()}`;
}


module.exports.timestamp = function (date = new Date()) {
	const m = date.getHours() >= 12 ? "pm" : "am";
	let hours = date.getHours() >= 12 ? date.getHours() - 12 : date.getHours();
	const minutes = `0${date.getMinutes()}`;
	const seconds = `0${date.getSeconds()}`;
	if (hours === 0) {
		hours = 12;
	}
	return `${hours}:${minutes.slice(-2)}:${seconds.slice(-2)}${m}`;
}


module.exports.simpleTimestamp = function (date = new Date()) {
	const m = date.getHours() >= 12 ? "pm" : "am";
	let hours = date.getHours() >= 12 ? date.getHours() - 12 : date.getHours();
	const minutes = `0${date.getMinutes()}`;
	if (hours === 0) {
		hours = 12;
	}
	return `${hours}:${minutes.slice(-2)}${m}`;
}


module.exports.th = function (num) {
    const n = String(num);
    switch (n.slice(-1)) {
        case '1':
            return `${n}st`;
        case '2':
            return `${n}nd`;
        case '3':
            return `${n}rd`;
        default:
            return `${n}th`;
    }
}


module.exports.capitalize = (s) => {
	if (typeof s !== 'string') return ''
	return s.charAt(0).toUpperCase() + s.slice(1)
}


module.exports.addCommas = (value) => {
	const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
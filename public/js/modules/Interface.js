'use strict';

class UI {
	constructor() {}

	topic(topic) {
		if (!topic || typeof topic === undefined || topic === 'undefined') {
			topic = '';
		}

		select('#channel-console header input').value = topic;
	}

	users(connectionId, channel) {

		// Clear users bar
		select('#users ul').innerHTML = '';
		select('#users header p').innerHTML = '';

		// Set up user list.
		let network = client.networks[connectionId];
		let users = network.sources[channel].users;
		let userList = [];

		userList = Object.keys(users);

		// Sort the user list based on rank and alphabetization
		userList.sort(function(a, b) {
			const rankString = '\r+%@&~';
			const rankA = rankString.indexOf(users[a]);
			const rankB = rankString.indexOf(users[b]);

			let rankSort = rankA == rankB ? 0 : (rankA > rankB ? 1 : -1);
			if (rankSort === 0) {
				return a.toLowerCase() < b.toLowerCase() ? 1 : -1;
			}

			return rankSort;
		});

		userList.forEach((element, index, array) => {
			let identifyer = {
				rank: users[element],
				icon: '',
			};

			if (users[element] !== '') {
				switch (users[element]) {
					case '~': // Owners
						identifyer.icon = '&#xf004;';
						break;
					case '&': // Admins
						identifyer.icon = '&#xf0ac;';
						break;
					case '@': // Ops
						identifyer.icon = '&#xf0e3;';
						break;
					case '%': // Half-ops
						identifyer.icon = '&#xf132;';
						break;
					case '+': // Voiced
						identifyer.icon = '&#xf075;';
						break;
				}
			}

			// Display the user in the list
			select('#users ul').insertAdjacentHTML('afterbegin', client.Templates['public/views/users.hbs']({
				rank: identifyer.rank,
				icon: identifyer.icon,
				nick: element,
			}));
		});

		// Get user count
		select('#users header p').innerHTML = `${userList.length} users`;
	}
}

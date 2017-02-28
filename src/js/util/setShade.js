'use strict';

const showShade = () => {
	$('body').append('<div class="shade"></div>');
}

const hideShade = () => {
	$('body').find('.shade').remove();
}

module.exports = {
	showShade,
	hideShade
}
// const welcome = require('cli-welcome');
import welcome from "cli-welcome";
// const pkg = require('./../package.json');
// import pkg from "./../package"
// const unhandled = require('cli-handle-unhandled');
import unhandled from "cli-handle-unhandled";

const init = ({ clear = true }) => {
	unhandled();
	welcome({
		title: `tabz`,
		tagLine: `by Sfundo Mhlungu`,
		description: "",
		version: 1.0,
		bgColor: '#36BB09',
		color: '#000000',
		bold: true,
		clear
	});
};

export default init

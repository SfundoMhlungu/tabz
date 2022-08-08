// const meow = require('meow');
import meow from "meow";
// const meowHelp = require('cli-meow-help');
import meowHelp from "cli-meow-help"

const flags = {
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	}, 
	build: {
	   type: "string", 
	   default: "",
	   alias: 'b',
	   desc: "compiles a file to Vdom",
	}, 
	from: {
	 type: "string", 
	 default: ".", 
	 alias: 'f',
	 desc: "path to a file or folder containing .pt files",
	 
	},
	bin: {
	 type: "string", 
	 default: ".", 
	 alias: "n", 
	 desc: "path to the build folder"
	}
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `tabz`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

export default meow(helpText, options);

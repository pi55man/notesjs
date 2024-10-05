import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import fs from 'node:fs/promises'

yargs(hideBin(process.argv))
	.command("new <note>", "create new note with content <note>", yargs => {
		return yargs.positional('note', {
			type: "string",
			description: "Content of note to create",
		})
	}, async (argv) => {
		await fs.writeFile("/home/arin/code/notes/note1.txt", argv.note);
	}).option('tags', {
		alias: 't',
		type: 'string',
		description: 'tags add to note, separated by comma (,)',
	})
	.command("all", "return all notes", () => { },
		async (argv) => {

		})
	.command("find <filter>", "get matching notes", yargs => {
		return yargs.positional('filter', {
			type: "string",
			description: "search term to filter notes by",
		})
	}, async (argv) => {

	})
	.command("clean", "deletes all notes", () => { }, async (argv) => {

	})
	.command("web [port]", "launch website to see notes", (yargs) => {
		return yargs.positional("port", {
			type: 'number',
			default: 5000,
			description: 'port to bind on'
		})
	}, async (argv) => {

	})
	.demandCommand(1)
	.parse();


//hidebin hides first two automatic arguments from process.argv

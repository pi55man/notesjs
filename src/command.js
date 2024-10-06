import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import {newNote, getAllNotes, removeNotes, removeAllNotes, findNotes} from './notes.js'

//hidebin hides first two automatic arguments from process.argv
yargs(hideBin(process.argv))
	.command("new <note>", "create new note with content <note>", yargs => {
		return yargs.positional('note', {
			type: "string",
			description: "Content of note to create",
		})
	}, async (argv) => {
			const tags = argv.tags ? argv.tags.split(",") : [];
			const note = await newNote(argv.note,tags);
			console.log('new note! ',note.id);
	}).option('tags', {
		alias: 't',
		type: 'string',
		description: 'tags add to note, separated by comma (,)',
	})
	.command("all", "return all notes", () => { },
		async (argv) => {
				const notes = await getAllNotes();
				console.log(notes);

		})
	.command("find <filter>", "get matching notes", yargs => {
		return yargs.positional('filter', {
				type: "string",
			description: "search term to filter notes by",
		})
	}, async (argv) => {
			const notes = await findNotes(argv.filter);
			console.log(notes);

	})
	.command("clean", "deletes all notes", () => { }, async (argv) => {
		removeAllNotes();
		console.log("removed all notes")
	})
	.command("web [port]", "launch website to see notes", (yargs) => {
		return yargs.positional("port", {
			type: 'number',
			default: 5000,
			description: 'port to bind on'
		})
	}, async (argv) => {
		//TODO 
	})
    .command("remove <id>","delete note having id",(yargs)=>{
		return yargs.positional("id",{
				type:'number',
				description:"id of the note to be deleted",
		})
	},async(argv)=>{
		const id = await removeNotes(argv.id);
		if(id){
			console.log("removed! ", id)
		}else{
		    console.log("");
		}
	})
	.demandCommand(1)
	.parse();



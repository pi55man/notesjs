import { getDB,saveDB,insertDB } from "./db.js";

export const newNote = async(note,tag)=> {
		const data = {
				tag,
				content: note,
				id: Date.now(),
		}
		await insertDB(data);
		return data;
}

export const getAllNotes = async()=>{
		const db = await getDB();
		return db.notes;
}

export const findNotes = async(filter) =>{
		const notes  = await getAllNotes();
		return notes.filter(note=>note.content.toLowerCase().includes(filter.toLowerCase()))
}

export const removeNotes = async(id) => {
		const  notes  = await getAllNotes();
		const match= notes.find(note => note.id === id);

		if(match){
				const newNotes = notes.filter(note=> note.id!==id);
				await saveDB({notes: newNotes});
				return id;
		}else{
				return "id not found";
		}

}

export const removeAllNotes =()=>{
		saveDB({notes: []})
}

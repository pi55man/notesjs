import {beforeEach, jest} from "@jest/globals";

jest.unstable_mockModule('/home/arin/code/notes/src/db.js',()=>({
		insertDB: jest.fn(),
		getDB: jest.fn(),
		saveDB: jest.fn(),

}));

const {insertDB, getDB, saveDB} = await import ("/home/arin/code/notes/src/db.js");
const {newNote, getAllNotes, removeNote} = await import ("/home/arin/code/notes/src/notes.js");

beforeEach(()=>{
		insertDB.mockClear();
		getDB.mockClear();
		saveDB.mockClear();
})

test('newNote inserts data',async()=>{
		const note = "test note";
		const tag = ['tag1','tag2'];

		const data = {
				tag,
				content:note,
				id:Date.now(),
		}
		insertDB.mockResolvedValue(data);

		const result = await newNote(note, tag);
		expect(result).toEqual(data)
})

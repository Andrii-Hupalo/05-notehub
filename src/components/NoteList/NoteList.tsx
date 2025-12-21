import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}
export default function NoteList({ notes, onDelete }: NoteListProps) {
  const handleDelete = (id: string) => {
    onDelete(id);
  };
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <div>
            <h3 className={css.title}>{note.title}</h3>
            <p className={css.content}>{note.content}</p>
          </div>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
              type="button"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

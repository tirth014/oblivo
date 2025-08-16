import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function NoteCard({ note, setNotes }) {
  async function handleDelete(e, id) {
    e.preventDefault();
    // console.log(id);
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await axios.delete(`https://oblivo.onrender.com/api/notes/${id}`);
      toast.success("Note deleted successfully!");
      setNotes((prev) => prev.filter((note) => note._id !== id)); // filter out deleted note
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note!");
    }
  }
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      {" "}
      <div className="card-body">
        <h2 className="card-title text-base-content">{note.title}</h2>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4"></PenSquareIcon>
            <button
              className="btn btn-ghost btn-xs text-error" aria-label="Delete note"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4"></Trash2Icon>
            </button>
          </div>
        </div>
      </div>{" "}
    </Link>
  );
}

export default NoteCard;

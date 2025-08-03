import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { ArrowLeftIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchNote() {
      try {
        const res = await axios.get(`https://oblivo.onrender.com/api/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id]);

  async function handleUpdate() {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title content!");
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:5001/api/notes/${id}`,
        note
      );
      toast.success("Note Updated Successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch note");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto ">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5"></ArrowLeftIcon>
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Edit Note </h2>

              <div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text"> Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text"> Content</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="Write your note..."
                    className="textarea textarea-bordered h-32"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    onClick={handleUpdate}
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;

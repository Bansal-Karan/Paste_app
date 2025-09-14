import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import { deletePaste } from "../redux/pasteSlice";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import SharePopup from "../components/SharePopup";

const Pastes = () => {

  const pastes = useSelector(state => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const [openPasteId, setOpenPasteId] = useState(null);
  const dispatch = useDispatch();
  const filteredPastes = pastes.filter(paste => paste.title.toLowerCase().includes(searchTerm.toLowerCase()) || paste.content.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleDelete(pasteId) {
    dispatch(deletePaste(pasteId));
  }
  return (
    <div>
      <input className="border-2 rounded-2xl border-black pl-4 mt-4 min-w-[400px] bg-black"
        type="text"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-3 mt-4">
        {
          filteredPastes.length > 0 &&
          filteredPastes.map(paste => {
            return (
              <div key={paste._id} className="border border-black p-4 rounded-2xl shadow-md bg-black">
                <div className="m-2">
                  <h3>{paste.title}</h3>
                </div>
                <div>
                  <p>{paste.content}</p>
                </div>
                <div>
                  <span>{new Date(paste.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex flex-row place-content-evenly">


                  <Link to={`/?pasteId=${paste?._id}`}>edit</Link>


                  <button onClick={() => {
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("Copied to clipboard")
                  }}>
                    copy
                  </button>

                  <button onClick={() => handleDelete(paste?._id)}>delete</button>

                  <Link to={`/pastes/${paste?._id}`}>view</Link>

                  <button onClick={() => setOpenPasteId(paste._id)}>share</button>

                  {openPasteId === paste._id && (
                    <SharePopup
                      url={`${window.location.origin}/pastes/${paste._id}`}
                      title={paste.title}
                      onClose={() => setOpenPasteId(null)}
                    />
                  )}
                </div>
              </div>
            )
          })

        }
      </div>
    </div>
  )
}

export default Pastes

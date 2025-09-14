import React from 'react'
import { useState,useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { addPaste, updatePaste } from '../redux/pasteSlice';

const Home = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector(state => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find(p => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setContent(paste.content);
      }
    }
  }, [pasteId]);

  function CreatePaste() {
    const paste = {
      title: title,
      content: content,
      _id: pasteId || Date.now().toString(24),
      createdAt: new Date().toISOString(),
    }

    if (pasteId) {
      dispatch(updatePaste(paste));
    }
    else {
      // create new paste
      dispatch(addPaste(paste));
    }

    setTitle("");
    setContent("");
    setSearchParams({});
  }


  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          CreatePaste();
        }}
      >
        <div className='flex mt-3 gap-3'>
        <input className='border-2 p-1 rounded-2xl pl-4 border-black bg-black'
          type="text"
          placeholder='enter title'
          value={title}
          onChange={(e) => setTitle(e.target.value)  
          }
          required
          minLength={3}
        />
        <button type='submit' className='border-2 rounded-2xl hover:bg-blue-700'>
          {
            pasteId ? "Update Paste" : "Create Paste"
          }
        </button>
      </div>

      <div className='flex mt-4'>
        <textarea
          className='border-2 rounded p-2 pl-4 border-black w-full h-90 bg-black'
          type="text"
          placeholder='write content here!'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          minLength={5}
        />
      </div>
      </form>
    </div>
  )
}

export default Home

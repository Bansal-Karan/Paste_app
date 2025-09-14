import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const viewPaste = () => {

  const { id } = useParams();
  const allPastes = useSelector(state => state.paste.pastes);
  const paste = allPastes.filter(p => p._id === id)[0];

  return (
    <div className="max-w-2xl w-full mx-auto mt-8">
      <form>
        <div className='flex mt-3 gap-3'>
          <input className='border-2 p-1 rounded-2xl pl-4 min-w-[400px] border-black bg-black'
            type="text"
            placeholder='enter title'
            value={paste.title}
            onChange={(e) => setTitle(e.target.value)
            }
            required
            disabled
            minLength={3}
          />
        </div>

        <div className='flex mt-4'>
          <textarea
            className='border-2 rounded border-black p-2 pl-4 w-full h-90 bg-black'
            type="text"
            placeholder='write content here!'
            value={paste.content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled
            minLength={5}
          />
        </div>
      </form>
    </div>
  )
}

export default viewPaste

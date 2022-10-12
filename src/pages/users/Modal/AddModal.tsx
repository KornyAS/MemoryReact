import { useState } from 'react'
import API from '../../../constans/Api'

export const AddModal = ({ active, setActive }) => {
  const [title, setTitle] = useState('')
  const [answer, setAnswer] = useState('')

  const handleAdd = async () => {
    await API.post('/questionanswer.php', {
      title: title,
      answer: answer,
    })
  }

  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div
        className={active ? 'modalContent active' : 'modalContent'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='text-center w-full mx-16 my-4'>
          <h2 className='text-2xl font-bold'>Добавить вопрос-ответ</h2>
          <b className='cursor-pointer closeModal' onClick={() => setActive(false)}>
            ✖
          </b>
          <form className='mt-16'>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              className='block w-full py-3 px-4'
              style={{ borderRadius: '2rem', backgroundColor: '#F4F4F4' }}
              placeholder='Вопрос'
            />
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              name=''
              id=''
              className='block w-full py-3 px-4 rounded-lg mt-4 h-52 mb-20'
              style={{ backgroundColor: '#F4F4F4' }}
              placeholder='Ответ'
            ></textarea>
            <div className='grid grid-rows-2 gap-5 align-center justify-center'>
              <button
                onClick={() => handleAdd()}
                type='submit'
                className='bg-sky-400 block text-white font-bold px-24 py-2'
                style={{ borderRadius: '2rem', width: '100%' }}
              >
                Создать
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

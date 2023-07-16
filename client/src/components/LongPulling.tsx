import {useEffect, useState} from 'react';
import axios from 'axios';

type Message = { id: string, message: string };

export const LongPulling = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState('');

  const subscribe = async () => {
    try {
      const {data} = await axios.get<Message>('http://localhost:5000/get-messages')
      setMessages(prev => [data, ...prev])
      await subscribe()
    } catch (e) {
      setTimeout(() => {
        void subscribe()
      }, 500)
    }
  }

  useEffect(() => {
    void subscribe();
  }, [])

  const sendMessage = async () => {
    await axios.post('http://localhost:5000/new-messages', {
      message: value,
      id: Date.now()
    })
  }

  const handleClick = () => {
    void sendMessage()
  }

  return (
    <div className="center">
      <div>
        <div className="form">
          <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
          <button onClick={handleClick}>Отправить
          </button>
        </div>
        <div className="messages">
          {messages.map(mess =>
            <div className="message" key={mess.id}>
              {mess.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

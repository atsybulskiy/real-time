import {FormEventHandler, useEffect, useState} from 'react';
import axios from 'axios';

type Message = { id: string, message: string };

export const EventSourcing = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    void subscribe()
  }, [])

  const subscribe = () => {
    const eventSource = new EventSource('http://localhost:5000/connect');
    eventSource.onmessage = (event: MessageEvent<string>) => {
      const message = JSON.parse(event.data) as Message;
      setMessages((prev) => [message, ...prev]);
    }
  }

  const sendMessage = async () => {
    await axios.post('http://localhost:5000/new-messages', {
      message: value,
      id: Date.now()
    });
    setValue('');
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    void sendMessage();
  }

  return (
    <div className="center">
      <form onSubmit={submitHandler}>
        <div className="form">
          <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
          <button type={'submit'}>Отправить</button>
        </div>
        <div className="messages">
          {messages.map(mess =>
            <div className="message" key={mess.id}>
              {mess.message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

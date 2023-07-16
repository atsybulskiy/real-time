import {FormEventHandler, useRef, useState} from 'react';

type Message = {
  id: string;
  message: string;
  event: string;
  username: string;
}

export const WebSocketComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState('');
  const socket = useRef<WebSocket>();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('')

  const connect = () => {
    socket.current = new WebSocket('ws://localhost:5000');

    socket.current.onopen = () => {
      console.log('%c⇒ ', 'color: #C3E88D', 'Socket opened');
      setConnected(true);
      const message = {
        event: 'connection', username, id: Date.now()
      };
      socket.current?.send(JSON.stringify(message));
    };
    socket.current.onmessage = (event: MessageEvent<string>) => {
      const message = JSON.parse(event.data) as Message;
      setMessages((prev) => [...prev, message]);
      console.log('%c⇒ ', 'color: #C3E88D', 'Message received');
    };
    socket.current.onclose = () => {
      console.log('%c⇒ ', 'color: #C3E88D', 'Socket closed');
    };
    socket.current.onerror = () => {
      console.log('%c⇒ ', 'color: #FF5370', 'Socket error');
    }
  }

  const sendMessage = () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: 'message'
    }
    socket.current?.send(JSON.stringify(message));
    setValue('')
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    void sendMessage();
  }

  if (!connected) {
    return (<div className="center">
      <div className="form">
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="text"
          placeholder="Введите ваше имя"/>
        <button onClick={connect}>Войти</button>
      </div>
    </div>)
  }

  return (<div className="center">
    <form onSubmit={submitHandler}>
      <div className="form">
        <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
        <button type={'submit'}>Отправить</button>
      </div>
      <div className="messages">
        {messages.map(mess => (
          <div key={mess.id}>
            {mess.event === 'connection'
              ? <div className="connection_message">
                Пользователь <span className="username">{mess.username}</span> подключился
              </div>
              : <div className="message">
                <span className="username">{mess.username}:</span> {mess.message}
              </div>}
          </div>))}
      </div>
    </form>
  </div>);
};

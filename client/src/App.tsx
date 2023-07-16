import reactLogo from './assets/react.svg'
import './App.css'
import {WebSocketComponent} from './components/WebSocket.tsx';

function App() {
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo"/>
        </a>
      </div>
      {/*<LongPulling/>*/}
      {/*<EventSourcing/>*/}
      <WebSocketComponent/>
    </>
  )
}

export default App

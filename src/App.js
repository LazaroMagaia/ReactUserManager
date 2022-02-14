import Routes from './routes';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css';
function App() {
  return (
    <div className="App">
      <ReactNotifications />
      <Routes/>
    </div>
  );
}

export default App;

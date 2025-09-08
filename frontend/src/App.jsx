import './App.css'
import ListaDesenvolvedores from './components/ListaDesenvolvedores'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div>
      <h1
        style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px', color: '#1976d2' }}
      >Cadastro de desenvolvedores</h1>
      <ListaDesenvolvedores />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App

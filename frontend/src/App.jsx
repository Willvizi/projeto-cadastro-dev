import './App.css'
import ListaDesenvolvedores from './components/ListaDesenvolvedores'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div>
      <h1>Listagem de desenvolvedores</h1>
      <ListaDesenvolvedores />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App

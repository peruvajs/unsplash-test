import './App.scss'
import { Button } from './components/Button/Button'
import { Input } from './components/Input/Input'

function App() {

  return (
    <div className='app'>
      <Input />
      <Button>Искать</Button>
    </div>
  )
}

export default App
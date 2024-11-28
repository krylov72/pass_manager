import { Container } from './components/Container/Container'
import { Menu } from './components/Menu/Menu'
import './App.scss'
import { AddPasswordModal } from './components/AddPasswordModal/AddPasswordModal'
import { useState } from 'react'
import { PasswordContainer } from './components/PasswordContainer/PasswordContainer'

function App() {
  const [isAddPasswordOpen, setIsAddPasswordOpen] = useState(false)
  const [isContainerOpen, setIsContainerOpen] = useState(false)

  return (
    <div className='page'>
      <Container>
        {isAddPasswordOpen && <AddPasswordModal />}
        {isContainerOpen && <PasswordContainer />}
        <Menu
          isAddPaswordOpen={() => setIsAddPasswordOpen(!isAddPasswordOpen)}
          isContainerOpen={() => setIsContainerOpen(!isContainerOpen)}
        />
      </Container>
    </div>
  )
}

export default App

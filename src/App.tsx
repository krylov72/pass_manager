import { useState } from 'react'
import './App.scss'
import { LocalStorageProvider } from '@shared/LocalStorageContext'
import { Container } from '@components/Container'
import { AddPasswordModal } from '@components/AddPasswordModal'
import { PasswordContainer } from '@components/PasswordContainer'
import { Menu } from '@components/Menu'

function App() {
  const [isAddPasswordOpen, setIsAddPasswordOpen] = useState(false)
  const [isContainerOpen, setIsContainerOpen] = useState(false)

  return (
    <LocalStorageProvider>
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
    </LocalStorageProvider>
  )
}

export default App

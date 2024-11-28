import s from './Menu.module.scss'

type Props = {
  isAddPaswordOpen: () => void
  isContainerOpen: () => void
}

export const Menu = ({ isAddPaswordOpen, isContainerOpen }: Props) => {
  return (
    <header className={s.menu_container}>
      <ul className={s.menu}>
        <li className={s.menu__item} onClick={isAddPaswordOpen}>
          Add new password
        </li>
        <li className={s.menu__item} onClick={isContainerOpen}>
          Password container
        </li>
      </ul>
    </header>
  )
}

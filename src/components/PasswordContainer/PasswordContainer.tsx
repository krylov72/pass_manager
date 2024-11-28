import { Button } from '@shared/Button'
import { usePasswordContainer } from './hooks'
import s from './PasswordContainer.module.scss'
import { Alert } from '@shared/Alert'

export const PasswordContainer = () => {
  const {
    filterText,
    copyToClipboard,
    currentItems,
    isAlert,
    setFilterText,
    removeHandler,
    setIsAlert,
    currentPage,
    handleNextPage,
    handlePrevPage,
    totalPages,
  } = usePasswordContainer()

  return (
    <div className={s.container}>
      <div className={s.filter_container}>
        <label htmlFor='filter'>Фильтрация</label>
        <input
          type='text'
          name='filter'
          id='filter'
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          autoComplete='off'
        />
        <Button className={s.filter__button} onClick={() => setFilterText('')}>
          Clear
        </Button>
      </div>

      <table className={s.table_container}>
        <caption>Сохраненные контейнеры</caption>
        <thead>
          <tr>
            <th>Сервис</th>
            <th>Пароль</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((el: [string, string]) => (
            <tr key={el[0]}>
              <td>{el[0]}</td>
              <td
                style={{ cursor: 'pointer' }}
                onClick={() => copyToClipboard(el[1])}
              >
                {el[1]}
              </td>
              <td>
                <Button
                  className={s.removeButton}
                  onClick={() => removeHandler(el[0])}
                  aria-label={`Удалить ${el[0]}`}
                >
                  x
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAlert.isShow && (
        <Alert
          message={isAlert.message}
          onClose={() =>
            setIsAlert({ isShow: false, message: '', success: false })
          }
          timeOnClose={1500}
          success={isAlert.success}
        />
      )}
      <div className={s.pagination}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Назад
        </Button>
        <span>{`Страница ${currentPage} из ${totalPages}`}</span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Вперед
        </Button>
      </div>
    </div>
  )
}

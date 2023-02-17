import { useState } from 'react';

import styles from './styles.module.css';

import logo from '../../assets/logo.svg';
import plusLogo from '../../assets/plus.svg';

export default function Header({ handleAddTask }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    setInputValue('');
    e.preventDefault();
  };

  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt='logo' />

        <form className={styles['form-container']} onSubmit={handleSubmit} >
          <input placeholder='Digite uma nova task...' type="text" value={inputValue} onChange={handleInputChange}/>
          <button type='submit' onClick={() => handleAddTask(inputValue.trim().replace(/[\s]+[\s]/g, ' '))}>
            Criar
            <img src={plusLogo} alt="plusLogo" />
          </button>
        </form>
      </header>
    </>
  );
}

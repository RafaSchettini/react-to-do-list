import { useState, useEffect,useRef } from 'react';

import { TbPencil } from 'react-icons/tb';

import styles from './styles.module.css';

import trash from '../../assets/trash.svg';
import check from '../../assets/check.svg';


export default function Task({ task, handleRemoveTask, handleCompleteTask, handleEditTask}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(task?.title);

  const inputRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if(document.activeElement !== inputRef.current) {
        if(e.target !== inputRef.current) {
          setIsEditing(false);
          setInputValue(inputValue.trim().replace(/[\s]+[\s]/g, ' '));

          if(inputValue === '') {
            alert('Por favor, digite um título válido.');
            setIsEditing(true);
            inputRef.current.focus();
            return;
          }
        }
      }
    };

    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
    };

  }, [inputValue]);

  const handleEditing = () => {
    setIsEditing(true);
    inputRef.current.focus();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    handleEditTask(task.id, e.target.value);
  };

  return (
    <div className={styles.task}>
      <button onClick={() => handleCompleteTask(task.id)}>
        <div className={task.completed ? styles['check-completed'] : ''}>
          {task.completed && <img src={check} />}
        </div>
      </button>

      <input ref={inputRef} readOnly={!isEditing} className={task.completed ? styles.completed : ''} value={inputValue} onChange={(e) => handleInputChange(e)}></input>

      {!task.completed && <TbPencil onClick={() => handleEditing()}/>}
      <img src={trash} alt="trash-logo" onClick={() => handleRemoveTask(task.id)}/>
    </div>
  );
}

import styles from './styles.module.css';

import Task from '../Task';

import clipboard from '../..//assets/clipboard.svg';

export default function Tasks({ tasks, handleRemoveTask, handleCompleteTask, handleEditTask }) {

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <>
      <section className={styles.container}>
        <header>
          <div className={styles.created}>
            <p>Tarefas Criadas</p>
            <span>{totalTasks}</span>
          </div>

          <div className={styles.done}>
            <p>Concluídas</p>
            <span>{completedTasks} de {totalTasks}</span>
          </div>
        </header>

        {tasks.length === 0 && (
          <div className={styles['empty-tasks']} >
            <img src={clipboard} alt="Clipboard" />
            <span>Você ainda não tem tarefas cadastradas</span>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        )}

        {tasks.map(task => (
          <Task key={task.id} task={task} handleRemoveTask={handleRemoveTask} handleCompleteTask={handleCompleteTask} handleEditTask={handleEditTask} />
        ))}

      </section>
    </>
  );
}

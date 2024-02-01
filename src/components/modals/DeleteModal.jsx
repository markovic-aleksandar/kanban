import { useSelector, useDispatch } from 'react-redux';
import { switchModal } from '../../services/modal';
import { deleteBoard } from '../../services/board';
import { deleteTask } from '../../services/column';
import { Button } from '../Button';

const DeleteModal = ({type, name, item}) => {
  const {boards, currentBoard} = useSelector(store => store.board);
  const dispatch = useDispatch();

  // handle delete
  const handleDelete = () => {
    // delete board
    if (type === 'board') deleteBoard(dispatch, {$id: currentBoard.$id, columns: currentBoard.columns}, boards);
    // else 
    else deleteTask(dispatch, item, currentBoard.columns);
  }

  return (
    <>
      <div className="Modal__content-header">
        <h2 className="Modal__content-title Modal__content-title--delete">Delete this {type}?</h2>
      </div>

      <p className="Modal__content-description">
        {type === 'board' ? (
          `Are you sure you want to delete the "${name}" board? This action will remove all columns and tasks and cannot be reversed.`
        ) : (
          `Are you sure you want to delete the "${name}" task and its subtasks? This action cannot be reversed.`
        )}
      </p>

      <div className="Modal__content-box Modal__content-box--buttons">
        <Button 
          variant="Button__small Button__full Button__danger" 
          value="Delete"
          handleAction={handleDelete}
        />

        <Button 
          variant="Button__small Button__full Button__light-purple" 
          value="Cancel"
          handleAction={() => switchModal(dispatch)}
        />
      </div>
    </>
  )
}

export default DeleteModal;
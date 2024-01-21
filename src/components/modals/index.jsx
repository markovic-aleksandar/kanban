import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import useEventListener from '../../hooks/useEventListener';
import { switchModal } from '../../services/modal';
import ModalContent from './ModalContent';
import AddBoard from './AddBoard';
import EditBoard from './EditBoard';
import AddNewColumn from './AddNewColumn';
import AddTask from './AddTask';

const Modal = ({modal}) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  // handle close modal
  const handleCloseModal = e => {
    if (e.key === 'Escape' || e.target === modalRef.current) {
      switchModal(dispatch);
    }
  }

  // show current modal
  const showCurrentModal = () => {
    const {leave, enter} = modal;

    return (
      <>
        {/* add board */}
        {(leave === 'add-board' || enter === 'add-board') && (
          <ModalContent 
            leave={leave} 
            enter={enter} 
            title="Add New Board"
            currentEl="add-board"
          >
            <AddBoard />
          </ModalContent>
        )}

        {/* edit board */}
        {(leave === 'edit-board' || enter === 'edit-board') && (
          <ModalContent 
            leave={leave}
            enter={enter}
            title="Edit Board"
            currentEl="edit-board"
          >
            <EditBoard />
          </ModalContent>
        )}

        {/* add new column */}
        {(leave === 'add-new-column' || enter === 'add-new-column') && (
          <ModalContent 
            leave={leave}
            enter={enter}
            title="Add New Column"
            currentEl="add-new-column"
          >
            <AddNewColumn />
          </ModalContent>
        )}

        {/* add task */}
        {(leave === 'add-task' || enter === 'add-task') && (
          <ModalContent 
            leave={leave}
            enter={enter}
            title="Add New Task"
            currentEl="add-task"
          >
            <AddTask />
          </ModalContent>
        )}
      </>
    )
  }

  // close modal on esc key
  useEventListener('keydown', handleCloseModal);

  return (
    <div ref={modalRef} className="Modal" onClick={handleCloseModal}>
      {showCurrentModal()}
    </div>
  )
}

export default Modal;
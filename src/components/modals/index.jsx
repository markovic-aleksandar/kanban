import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import useEventListener from '../../hooks/useEventListener';
import { switchModal } from '../../services/modal';
import ModalContent from './ModalContent';
import AddBoard from './AddBoard';
import EditBoard from './EditBoard';
import AddNewColumn from './AddNewColumn';
import AddTask from './AddTask';
import CurrentTask from './CurrentTask';
import EditTask from './EditTask';
import DeleteModal from './DeleteModal';

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
    const {leave, enter, data} = modal;
    
    return (
      <>
        {/* add board */}
        {(leave === 'add-board' || enter === 'add-board') && (
          <ModalContent 
            leave={leave} 
            enter={enter} 
            currentEl="add-board"
            title="Add New Board"
          >
            <AddBoard />
          </ModalContent>
        )}

        {/* edit board */}
        {(leave === 'edit-board' || enter === 'edit-board') && (
          <ModalContent 
            leave={leave}
            enter={enter}
            currentEl="edit-board"
            title="Edit Board"
          >
            <EditBoard />
          </ModalContent>
        )}

        {/* add new column */}
        {(leave === 'add-new-column' || enter === 'add-new-column') && (
          <ModalContent 
            leave={leave}
            enter={enter}
            currentEl="add-new-column"
            title="Add New Column"
          >
            <AddNewColumn />
          </ModalContent>
        )}

        {/* add task */}
        {(leave === 'add-task' || enter === 'add-task') && (
          <ModalContent 
            leave={leave}
            enter={enter}
            currentEl="add-task"
            title="Add New Task"
          >
            <AddTask />
          </ModalContent>
        )}

        {/* current task */}
        {(data?.['current-task'] && (leave === 'current-task' || enter === 'current-task')) && (
          <ModalContent 
            leave={leave}
            enter={enter}
            currentEl="current-task"
          >
            <CurrentTask currentTaskId={data['current-task']} />
          </ModalContent>
        )}

        {/* edit task */}
        {(data?.['edit-task'] && (leave === 'edit-task' || enter === 'edit-task')) && (
          <ModalContent 
            leave={leave}
            enter={enter}
            currentEl="edit-task"
            title="Edit Task"
          >
            <EditTask currentTask={data['edit-task']} />
          </ModalContent>
        )}

        {/* delete modal */}
        {(data?.['delete-modal'] && (leave === 'delete-modal' || enter === 'delete-modal')) && (
          <ModalContent 
            leave={leave}
            enter={enter}
            currentEl="delete-modal"
          >
            <DeleteModal {...data['delete-modal']} />
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
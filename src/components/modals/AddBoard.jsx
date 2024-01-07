import FormInput from '../form/FormInput';
import FormClearableInput from '../form/FormClearableInput';
import FormCheckbox from '../form/FormCheckbox';
import { Button, ButtonIcon } from '../Button';
import { IconPlus } from '../../constants/icons';

const AddBoard = () => {
  return (
    <>
      <div className="Modal__content-box">
        <FormInput 
          type="text"
          name="name"
          label="Name"
          value="Platform Launch"
          error="Required"
        />
      </div>

      <div className="Modal__content-box">
        <FormClearableInput label="Columns" />
      </div>

      <div className="Modal__content-box">
        <FormCheckbox label="Subtasks" />
      </div>

      <div className="Modal__content-box">
        <ButtonIcon variant="Button__small Button__full Button__light" value="Add New Column">
          <IconPlus />
        </ButtonIcon>
      </div>

      <div className="Modal__content-box">
        <Button variant="Button__small Button__full Button__main" value="Create New Board" />
      </div>
    </>
  )
}

export default AddBoard;
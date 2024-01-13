import { useSelector } from 'react-redux';
import useFormControl from '../../hooks/useFormControl';
import FormInput from '../form/FormInput';
import FormClearableInput from '../form/FormClearableInput';
import { Button, ButtonIcon } from '../Button';
import { IconPlus } from '../../constants/icons';

const AddBoard = () => {
  const {boards} = useSelector(store => store.board);
  const {formData, handleChangeFormData, handleValidateFormData, handleAddClearableInput, handleRemoveClearableInput} = useFormControl({
    name: {label: 'name', value: '', error: false, isRequired: true, isUnique: boards},
    columns: {label: 'columns', value: [
      {value: '', error: false} // mozda ako ne dodas ni jedan pocetni da u okviru samog custom hook-a kreiras ovo, a ako ne dodas nista samo value da bude prazan array
    ], isRequired: true, isUnique: true, isFocusable: true}
  });

  return (
    <>
      <div className="Modal__content-box">
        <FormInput
          type="text"
          data={formData.name}
          handleChange={handleChangeFormData}
        />
      </div>

      <div className="Modal__content-box">
        <FormClearableInput
          data={formData.columns}
          handleChange={handleChangeFormData}
          handleRemove={handleRemoveClearableInput}
        />
      </div>

      <div className="Modal__content-box">
        {formData.columns.value.length < 6 && (
          <ButtonIcon 
            variant="Button__small Button__full Button__light" 
            value="Add New Column"
            handleAction={() => handleAddClearableInput(formData.columns.label)} 
          >
            <IconPlus />
          </ButtonIcon>
        )}
      </div>

      <div className="Modal__content-box">
        <Button 
          variant="Button__small Button__full Button__main" 
          value="Create New Board" 
          handleAction={handleValidateFormData}  
        />
      </div>
    </>
  )
}

export default AddBoard;
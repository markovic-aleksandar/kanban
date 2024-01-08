import { useState } from 'react';

const useFormControl = initialData => {
  const [formData, setFormData] = useState(initialData);

  // handle change form data
  const handleChangeFormData = prop => {
    const name = prop.target ? prop.target.name : prop.name;
    const value = prop.target ? prop.target.value : prop.value;
    const nameIndex = prop.index ?? null;

    // update form data with new values
    setFormData(prevData => {
      const currentData = prevData[name];
      // check if current name is array
      if (Array.isArray(currentData.value)) {
        const dataItems = currentData.value.map((dataItem, index) => {
          if (index === nameIndex) return {...dataItem, value, error: handleErrorSingleFormData({value, index, isRequired: currentData.isRequired, isUnique: currentData.value}, true)};

          return dataItem;
        });
        
        return {...prevData, [name]: {...currentData, value: dataItems}};
      } else {
        return {...prevData, [name]: {...currentData, value, error: handleErrorSingleFormData({...currentData, value})}}
      }
    });
  }

  // handle error single form data
  const handleErrorSingleFormData = (dataItem, isNested) => {
    const {label, value, index, isRequired, isUnique} = dataItem;

    // check if data is required
    if (isRequired && !value.trim()) return 'Required';

    // check if data is unique
    if (isUnique) {
      const isUsed = isNested ? isUnique.find((valueItem, valueIndex) => valueItem.value.toLowerCase() === value.toLowerCase() && valueIndex !== index) : isUnique.find(valueItem => valueItem[label].toLowerCase() === value.toLowerCase());
      
      if (isUsed) return 'Used';
    }

    return false;
  }

  // handle add clearable input
  const handleAddClearableInput = key => {
    setFormData(prevData => {
      // check if current key length is equal to 6
      if (prevData[key].value.length >= 6) {
        return prevData;
      }

      // add new input
      return {
        ...prevData,
        [key]: {...prevData[key], value: [...prevData[key].value, {value: '', error: false}]}
      }      
    });
  }

  // handle remove clearable input
  const handleRemoveClearableInput = (key, index) => {
    setFormData(prevData => {
      // check if current key length is equal to 1
      if (prevData[key].value.length <= 1) {
        return prevData;
      }

      // remove current input
      return {
        ...prevData,
        [key]: {...prevData[key], value: prevData[key].value.filter((_, dataItemIndex) => dataItemIndex !== index)}
      }
    });
  }

  return {
    formData,
    handleChangeFormData,
    handleAddClearableInput,
    handleRemoveClearableInput
  }
}

export default useFormControl;
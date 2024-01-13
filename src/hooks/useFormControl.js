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
        let tempCurrentData = {...currentData};

        // update value for specific data item
        tempCurrentData.value = tempCurrentData.value.map((dataItem, index) => {
          if (index === nameIndex) return {...dataItem, value};
          return dataItem;
        });

        // add current data as a unique param after the value updated
        tempCurrentData.isUnique = [...tempCurrentData.value];

        // check for errors        
        tempCurrentData = validateDataItem(tempCurrentData, true, nameIndex);

        return {...prevData, [name]: tempCurrentData};
      } else {
        let tempCurrentData = {...currentData, value};

        // check for errors
        tempCurrentData = validateDataItem(tempCurrentData);

        return {...prevData, [name]: tempCurrentData};
      }
    });
  }

  // validate specific data param
  const validateSpecificDataParam = (checkParams, dataItem) => {
    // required
    if (checkParams.name === 'required' && !dataItem.value.trim()) {
      return {...dataItem, error: 'Required'};
    }

    // unique
    if (checkParams.name === 'unique') {
      const dataItemIsNoUnique = checkParams.isNested ?
      checkParams.uniqueItems.find((uniqueItem, uniqueIndex) => uniqueItem.value.toLowerCase() === dataItem.value.toLowerCase() && uniqueIndex !== checkParams.isNested.index && uniqueItem.value.trim()) : checkParams.uniqueItems.find(uniqueItem => uniqueItem[dataItem.label].toLowerCase() === dataItem.value.toLowerCase());

      if (dataItemIsNoUnique) return {...dataItem, error: 'Used'};
    }

    return null;
  }

  // valdiate data item
  const validateDataItem = (dataItem, isNested, currentIndex) => {
    // check if current data item is nested
    if (isNested) {
      let tempDataItem = null;
      const dataItemGroup = {};
      tempDataItem = dataItem.value.map((dataItemValue, dataItemIndex) => {
        // check for required
        if (dataItem.isRequired) {
          const validatedDataItem = validateSpecificDataParam({name: 'required'}, dataItemValue);

          // check require for single data item value change
          if (currentIndex === dataItemIndex && validatedDataItem) return validatedDataItem;

          // check require for all data items
          if (!currentIndex && currentIndex !== 0 && validatedDataItem) return validatedDataItem;
        }

        // check for unique
        if (dataItem.isUnique) {
          const validatedDataItem = validateSpecificDataParam({
            name: 'unique',
            isNested: {index: dataItemIndex},
            uniqueItems: dataItem.isUnique
          }, dataItemValue);

          if (validatedDataItem) {
            if (dataItemGroup[validatedDataItem.value]) return validatedDataItem;
            dataItemGroup[validatedDataItem.value] = true;
          }
        }

        return {...dataItemValue, error: dataItemValue.error === 'Required' && dataItemIndex !== currentIndex ? 'Required' : false};
      });

      return {...dataItem, value: tempDataItem};
    } else {
      // check for required
      if (dataItem.isRequired) {
        const validatedDataItem = validateSpecificDataParam({name: 'required'}, dataItem);
        if (validatedDataItem) return validatedDataItem;
      }

      // check for unique
      if (dataItem.isUnique) {
        const validatedDataItem = validateSpecificDataParam({
          name: 'unique',
          uniqueItems: dataItem.isUnique
        }, dataItem);

        if (validatedDataItem) return validatedDataItem;
      }

      return {...dataItem, error: false};
    }
  }

  const handleValidateFormData = handleAction => {
    const tempDataItems = {...formData};
    let formDataErrors = 0;

    for (const tempDataItem in tempDataItems) {
      const currentTempDataItem = tempDataItems[tempDataItem];
      const isNested = Array.isArray(currentTempDataItem.value);
      const validatedDataItem = isNested ? validateDataItem({...currentTempDataItem, isUnique: currentTempDataItem.value}, true) : validateDataItem(currentTempDataItem);
      tempDataItems[tempDataItem] = validatedDataItem;

      // count errors
      if (isNested) {
        for (let i = 0; i < validatedDataItem.value.length; i++) {
          if (validatedDataItem.value[i].error) {
            formDataErrors++;
            break;
          }
        }
      } else {
        if (validatedDataItem.error) formDataErrors++;
      }
    }

    setFormData(tempDataItems);
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
        [key]: {
          ...prevData[key], 
          value: [...prevData[key].value, {value: '', error: false}],
          isFocusable: prevData[key].isFocusable ? 'inc' : false
        }
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
      
      const currentPrevData = prevData[key];
      // init temp data and set required to false
      let tempData = {...currentPrevData, isRequired: false};

      // remove specific
      tempData.value = tempData.value.filter((_, valueIndex) => valueIndex !== index);

      // set unique value to value after remove
      tempData.isUnique = tempData.value;

      // validate temp data after remove
      tempData = validateDataItem(tempData, true);

      // return required after unique validation
      tempData.isRequired = currentPrevData.isRequired;
      
      return {
        ...prevData,
        [key]: {
          ...tempData,
          isFocusable: tempData.isFocusable ? 'dec' : false
        }
      }
    });
  }

  return {
    formData,
    handleChangeFormData,
    handleValidateFormData,
    handleAddClearableInput,
    handleRemoveClearableInput
  }
}

export default useFormControl;
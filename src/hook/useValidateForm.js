import React, { useState, useCallback } from "react";

function useValidateForm() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    function handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        const validationMessage = target.validationMessage;
        setValues({ ...values, [name]: value }); 
        setErrors({ ...errors, [name]: validationMessage }) 
        setIsValid(target.closest('form').checkValidity());
    }

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return {
        values,
        setValues,
        handleChange,
        errors,
        isValid,
        resetForm,
    }
}

export default useValidateForm;
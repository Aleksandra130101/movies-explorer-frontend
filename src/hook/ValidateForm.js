import React, { useState, useCallback, useEffect } from "react";

function ValidateForm() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    function handleChange(e) {
        console.log(e);
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setValues({ ...values, [name]: value });  
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

export default ValidateForm;
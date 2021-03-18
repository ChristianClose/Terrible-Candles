export const handleChange = (e, setState, state) => { 
    setState({...state, [e.target.name]: e.target.value}) 
};

export const isInputEmpty = (state, notRequired = []) => {

    for (const item in state) {
        if (!state[item] && notRequired.reduce((acc, i) => i !== item, false)) {
            return true;
        }
    }

    return false;
};

export const handleBlur = (e) => {
    if (e.target.value === "") {
        e.target.classList.add("bg-danger", "formPlaceHolder");
        e.target.placeholder = e.target.placeholder.split(" ", 2)[0] === "*Required*"
            ? e.target.placeholder
            : "*Required* " + e.target.placeholder;
    } else {
        e.target.classList.remove("bg-danger", "formPlaceHolder");
    }
};
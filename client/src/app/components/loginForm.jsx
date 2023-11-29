import React, { useEffect, useState } from "react";
import { validator } from "../utils/ validator";
import TextField from "./form/textField";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuthErrors, login } from "../store/users";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [dirty, setDirty] = useState({
        emailDirty: false,
        passwordDirty: false
    });
    const loginError = useSelector(getAuthErrors());
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "email":
                setDirty((prevState) => ({ ...prevState, emailDirty: true }));
                break;
            case "password":
                setDirty((prevState) => ({
                    ...prevState,
                    passwordDirty: true
                }));
                break;
        }
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    function validate() {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const redirect = location.state?.from?.pathname || "/";
        dispatch(
            login(data, () =>
                navigate(redirect, { state: { from: { pathname: redirect } } })
            )
        );
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                blurHandler={blurHandler}
                dirty={dirty.emailDirty}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                blurHandler={blurHandler}
                dirty={dirty.passwordDirty}
                error={errors.password}
            />

            {loginError === "Email или пароль введены некорректно" && (
                <p className="text-danger">{loginError}</p>
            )}

            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Войти
            </button>
        </form>
    );
};

export default LoginForm;

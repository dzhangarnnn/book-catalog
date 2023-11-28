import React, { useEffect, useState } from "react";
import TextField from "./form/textField";
import { validator } from "../utils/ validator";
import { getAuthErrors, signUp } from "../store/users";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        name: ""
    });
    const [dirty, setDirty] = useState({
        emailDirty: false,
        passwordDirty: false,
        nameDirty: false
    });
    const registerError = useSelector(getAuthErrors());
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
            case "name":
                setDirty((prevState) => ({
                    ...prevState,
                    nameDirty: true
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
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должено состаять минимум из 3 символов",
                value: 3
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состаять миниму из 8 символов",
                value: 8
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

        dispatch(signUp(data, () => navigate("/")));
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
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                blurHandler={blurHandler}
                dirty={dirty.nameDirty}
                error={errors.name}
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

            {registerError === "Пользователь с таким Email уже существует" && (
                <p className="text-danger">{registerError}</p>
            )}

            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Зарегистрироваться
            </button>
        </form>
    );
};

export default RegisterForm;

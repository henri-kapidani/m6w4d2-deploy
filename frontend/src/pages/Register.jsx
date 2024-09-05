import { useContext, useEffect, useState } from 'react';
import { TokenContext, UserContext } from '../Context';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [token, setToken] = useContext(TokenContext);
    const [user, setUser] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [keepLogged, setKeepLogged] = useState(false);
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const objUrlParams = new URLSearchParams(window.location.search);
        const jwtToken = objUrlParams.get('token');
        if (jwtToken) {
            localStorage.setItem('token', jwtToken);

            // aggiungere al context
            setToken(jwtToken);

            // redirect da qualche parte
            navigate('/');
        }
    }, [setToken, navigate]);

    const changeInput = (event) => {
        setRegisterData({
            ...registerData,
            [event.target.name]: event.target.value,
        });
    };

    const register = (event) => {
        event.preventDefault();
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/v1/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        })
            .then((res) => {
                if (!res.ok) throw new Error(res.status);
                return res.json();
            })
            .then((data) => {
                setToken(data.token);
                setUser(data.user);
                navigate('/');
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    };

    return (
        <div>
            <h1>Register</h1>
            <Form onSubmit={register}>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={registerData.name}
                        onChange={changeInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={registerData.name}
                        onChange={changeInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={registerData.email}
                        onChange={changeInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={registerData.password}
                        onChange={changeInput}
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="formPasswordConfirmation"
                >
                    <Form.Label>Password confirmation</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm the password"
                        name="passwordConfirmation"
                        value={registerData.passwordConfirmation}
                        onChange={changeInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formKeepSigned">
                    <Form.Check
                        type="checkbox"
                        label="Keep me signed"
                        value={keepLogged}
                        onChange={() => setKeepLogged(false)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>{' '}
                or{' '}
                <a
                    href={`${process.env.REACT_APP_API_URL}/api/v1/login-google`}
                    className="btn btn-primary"
                >
                    Sign up with Google
                </a>
                {/* <Button as="a" variant="primary" type="button">
                    Sign up with Google
                </Button> */}
            </Form>
        </div>
    );
}

export default Register;

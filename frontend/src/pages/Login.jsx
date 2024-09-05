import { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../Context';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [token, setToken] = useContext(TokenContext);
    const [isLoading, setIsLoading] = useState(false);
    const [keepLogged, setKeepLogged] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
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
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value,
        });
    };

    const login = (event) => {
        event.preventDefault();
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/v1/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
            .then((res) => {
                if (!res.ok) throw new Error(res.status);
                return res.json();
            })
            .then((data) => {
                setToken(data.token);
                //navigate('/');
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    };

    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={loginData.email}
                        onChange={changeInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={loginData.password}
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
                    Login
                </Button>{' '}
                or{' '}
                <a
                    href={`${process.env.REACT_APP_API_URL}/api/v1/login-google`}
                    className="btn btn-primary"
                >
                    Login with Google
                </a>
                {/* <Button as="a" variant="primary" type="button">
                    Login with Google
                </Button> */}
            </Form>
        </div>
    );
}

export default Login;

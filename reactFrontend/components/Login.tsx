import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { RegistrationModal} from './RegistrationModal'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { resServerStatus } from '../module/module'


export const Login = () => {

    const [mail, setMail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const [textModal, setTextModal] = useState<number>();
    const navigate = useNavigate();
    const storedUser = localStorage.getItem('user');



    const handleMail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const mail: string = (e.target as HTMLInputElement).value;
        setMail(mail)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password: string = (e.target as HTMLInputElement).value;
        setPassword(password)
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch('http://176.57.213.59:3001/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"username": mail, "password": password})
        })
        .catch(err => {
            console.log(err)
        })

        const data = await res;
        const statusRes = (data as resServerStatus).status;

        if (statusRes == 200) {
            localStorage.setItem('user', mail);
            window.location.reload();
            return navigate("/content")
        }
        else {
          setTextModal(statusRes)
          setShowModal(true)
        }
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }


  return (
    <div className="formRegOutside">
        <Form className="formRegistration" onSubmit={handleSubmit}>
        {storedUser == '' || storedUser === null ?
            <Col>
                <Form.Group className="mb-3 forma" controlId="formBasicEmail">
                    <Form.Label>Введите адрес электронной почты</Form.Label>
                    <Form.Control type="email" placeholder="example@yandex.ru" onChange={handleMail} required/>
                </Form.Group>
            </Col>
            : '' }
        {storedUser == '' || storedUser === null ?
            <Col>
                <Form.Group className="mb-3 forma" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" onChange={handlePassword} required/>
                </Form.Group>
            </Col>
            : '' }
            <Row>
                <Col> {storedUser == '' || storedUser === null ? 
                    <Button variant="success" type="submit" className="btn-reg">
                            Войти 
                    </Button> :
                    <Button variant="success" type="submit" className="btn-reg" onClick={() => navigate("/logout")}>
                            Выйти 
                    </Button>
                }
                </Col>
            </Row>
            {storedUser == '' || storedUser === null ?
            <Row>
                <Col>
                    <Button variant="primary" type="submit" className="btn-reg" onClick={() => navigate("/")}>
                            На главную
                    </Button>
                </Col>
            </Row>
            : '' }
        </Form>
        <RegistrationModal show={showModal} handleClose={handleCloseModal} text={textModal} type={"login"}/>
    </div>
  )
}

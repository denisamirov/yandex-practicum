import { useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from "react-router-dom"
import { RegistrationModal} from './RegistrationModal'
import { resServerStatus } from '../module/module'


export const Registration = () => {
    const [mail, setMail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showModal, setShowModal] = useState(false)
    const [textModal, setTextModal] = useState<number>()
    const navigate = useNavigate();
    const storedUser = localStorage.getItem('user')

    const handleMail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const mail = (e.target as HTMLInputElement).value;
        setMail(mail)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = (e.target as HTMLInputElement).value;
        setPassword(password)
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch('http://176.57.213.59:3001/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"username": mail, "password": password})
        })
        .catch(err => {
            console.log(err)
        })

        const data = await res
        const statusRes = (data as resServerStatus).status;
        setTextModal(statusRes)
        setShowModal(true)

        return navigate("/")
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

  return (
    <div className="formRegOutside">
        <Form className="formRegistration" onSubmit={handleSubmit}>
            <Col>
                <Form.Group className="mb-3 forma" controlId="formBasicEmail">
                    <Form.Label>Введите адрес электронной почты</Form.Label>
                    <Form.Control type="email" placeholder="example@yandex.ru" onChange={handleMail} required/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3 forma" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" onChange={handlePassword} required/>
                </Form.Group>
            </Col>
            <Row>
                <Col>
                    <Button variant="primary" type="submit" className="btn-reg">
                        Зарегистрироваться
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>{storedUser === '' || storedUser === null ? 
                    <Button variant="success" type="submit" className="btn-reg" onClick={() => {navigate("/login")}}>
                            Войти 
                    </Button>:
                    <Button variant="success" type="submit" className="btn-reg" onClick={() => navigate("/logout")}>
                            Выйти 
                    </Button>
                }
                </Col>
            </Row>
        </Form>
        <RegistrationModal show={showModal} handleClose={handleCloseModal} text={textModal} type={"reg"}/>
    </div>
  )
}

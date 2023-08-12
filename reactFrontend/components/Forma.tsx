import { useState } from 'react';
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { RegistrationModal} from './RegistrationModal'
import React from 'react';
import { resServerStatus } from '../module/module';


export const Forma = () => {
    const [mess, setMess] = useState<string>('');
    const [showModal, setShowModal] = useState(false)
    const [textModal, setTextModal] = useState<number>()
    const navigate = useNavigate();


    const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const mess = (e.target as HTMLInputElement).value;
        setMess(mess)
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(mess)
        const res = await fetch('http://176.57.213.59:3001/send', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"message": mess})
        })
        .catch(err => {
            console.log(err)
        })

        const data = await res;
        const statusRes = (data as resServerStatus).status;
        setTextModal(statusRes);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

  return (
    <div className="formRegOutside">
        <Form className="formRegistration" onSubmit={handleSubmit}>
            <Col>
                <Form.Group className="mb-3 forma" controlId="formBasicPassword">
                    <Form.Label>Введите сообщение</Form.Label>
                    <Form.Control type="text" placeholder="сообщение" onChange={handleMessage} required/>
                </Form.Group>
            </Col>
            <Row>
                <Col>
                    <Button variant="success" type="submit" className="btn-reg">
                        Отправить
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" type="submit" className="btn-reg" onClick={() => navigate("/")}>
                        На главную
                    </Button>
                </Col>
            </Row>
        </Form>
        <RegistrationModal show={showModal} handleClose={handleCloseModal} text={textModal} type={"forma"}/>
    </div>
  )
}

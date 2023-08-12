import { Modal, Button } from 'react-bootstrap';

export const RegistrationModal = ({ show, handleClose, text, type }) => {
  const status = text;
  let title;
  let desc;
  console.log(type)


  if (type==="reg" && status == 200) {
    desc = "Теперь Вы можете пользоваться всеми возможностями SPA"
    title = "Успешная регистрация" 
  }
  else if (type==="reg" && status != 200) {
    desc ="Ошибка! Проверьте правильность введенных данных"
    title="Ошибка"
  }

  if (type==="forma" && status == 200) {
    title = "Успешная отправка"
    desc = "Ваше сообщение отправлено разработчику!" 
  }
  else if (type==="forma" && status != 200) {
    desc ="Ошибка! Сообщение не отправлено!"
    title="Ошибка"
  }

  if (type==="login" && status != 200) {
    desc ="Ошибка! Проверьте правильность введенных данных"
    title="Ошибка"
  }


 

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {desc}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
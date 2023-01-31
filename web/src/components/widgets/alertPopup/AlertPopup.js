
import {ToastContainer } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import useAlert from './useAlert';


const AlertPopup = () => {
  const { text, type } = useAlert();

  if (text) {
    return (
      <ToastContainer className="p-2" position="top-end">
      <Toast autohide bg={type ? type.toLowerCase() : 'info'} delay={4000}>
      <Toast.Body className={type ? 'text-white' : ''}>{text}</Toast.Body>
    </Toast>
    </ToastContainer>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;
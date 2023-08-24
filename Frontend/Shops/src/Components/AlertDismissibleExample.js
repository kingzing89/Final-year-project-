import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissibleExample(props) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" className='  mx-auto px-5 mt-5 py-5 '>
        <Alert.Heading>{props.heading}</Alert.Heading>
        <p className=''>
          {props.body}
        </p>
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

export default AlertDismissibleExample;
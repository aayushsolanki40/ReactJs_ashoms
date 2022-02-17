import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const Sharebtnsmodal = (props) => {
    const [shareUrl, setshareUrl] = useState("https://ww.");

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Share
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Button>Click to Share</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default Sharebtnsmodal;

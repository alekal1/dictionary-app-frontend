import React, {useState} from 'react';
import {Modal, Button, InputGroup, FormControl, Form, Alert} from "react-bootstrap";


function AddWordModal(props) {
    // Hooks
    const [word, setWord] = useState(""); // Set word
    const [translate, setTranslate] = useState(""); // Set word translations
    const [empty, setEmpty] = useState(false); // Check if word or translations are empty
    const [numeric, setNumeric] = useState(false); // Check if word or translations contain numeric value

    // Some warning depends on problem
    let empty_warning;
    let numeric_warning;

    // If empty set variable
    if (empty) {
        empty_warning = <Alert variant={"warning"}>
            Word and it's translations can not be empty!
        </Alert>
    }

    // If contains numeric value set variable
    if (numeric) {
        numeric_warning = <Alert variant={"warning"}>
            Word and it's translations can not contain numeric values!
        </Alert>
    }

    // Check if empty
    const handleEmpty = () => {
        if (word === "" && translate === "") {
            setEmpty(true);
            return true
        }
    };

    // Check if contains numeric value
    const handleNumeric = () => {
        for (let i = 0; i < word.length; i++) {
            if (!isNaN(word.charAt(i))) {
                setNumeric(true);
                // No need to check other charts if number is already founded.
                return true
            }
        }
        for (let j = 0; j < translate.length; j++) {
            if (!isNaN(translate.charAt(j))) {
                setNumeric(true);
                // No need to check other charts if number is already founded.
                return true
            }
        }
    };

    // Post method to back-end to add new word and it's translations
    const addNewWord = (word, translate) => {
        if (!handleEmpty() && !handleNumeric()) // First of all I need to check word and translation {
            fetch('http://localhost:8080/api/v1/user-dictionary/dictionary/uploadWord', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: 'You',
                    word: word,
                    wordTranslate: translate,
                    translationType: props.translationType
                })
            }).catch(err => { // To catch errors
                console.log(err);
            }).then(window.location.reload(true));
    };

    return (
        <Modal
            {...props}
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add word to dictionary
                </Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <h4 className={'mb-3'}>Please type a word and its translation</h4>
                    <p>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Word and translation</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type={'text'} required onChange={(e) => setWord(e.target.value)}/>
                            <FormControl type={'text'} required onChange={(e) => setTranslate(e.target.value)}/>
                        </InputGroup>
                        <Form.Text className="text-muted">
                            In case to add several translations, just separate them using ',' like so: Bye, Goodbye
                        </Form.Text>
                        <Form.Text className='text-muted'>
                            {numeric_warning}
                            {empty_warning}
                        </Form.Text>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        addNewWord(word, translate);
                        handleEmpty();
                        handleNumeric()
                    }}>Submit</Button>
                    <Button variant={"secondary"} onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddWordModal;

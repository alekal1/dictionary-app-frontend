import React, {Component} from 'react';

// Bootstrap components import
import {Button, Card, Col, Jumbotron, Row} from "react-bootstrap";
import {PlusCircle} from "react-bootstrap-icons";
import AddWordModal from "../components/word_add_components/AddWordModal";
import { LinkContainer } from 'react-router-bootstrap'


function AddWord() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <Button variant={"secondary"} onClick={() => setModalShow(true)}>
                <PlusCircle size={20} className={'mb-1'}/> Add your word
            </Button>

            <AddWordModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                translationType={"ENG_EST"}
            />
        </>
    )
}


class Eng extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverUrl: "http://localhost:8080/api/v1/user-dictionary",
            translations: [],
            searchWord: ''
        }
    }

    // Fetch dictionary from back-end
    async componentDidMount() {
        await Promise.all(
            [
                ((await fetch(this.state.serverUrl)).json())
                    .then(res => this.extractData(res))
            ]
        );
    }

    // Extract data from fetch.
    extractData(res) {
        // Get all words which translation type is ENG_EST and save them in state.
        let translations = this.state.translations;
        for (var i = 0; i < res.length; i++) {
            if (res[i].translateType === "ENG_EST") {
                translations.push({
                    'id': res[i].userDictionaryWordId,
                    'username': res[i].username,
                    'word': res[i].word,
                    'wordTranslate': res[i].wordTranslate
                })
            }
            this.setState({
                translations: translations
            });
        }
    }

    handleSearchWord = (e) => {
        this.setState({searchWord: e.target.value})
    };

    handleDynamicSearch = () => {
        return this.state.translations.filter(term => term.word.toLowerCase().includes(this.state.searchWord.toLowerCase()))
    };

    render() {
        return (
            <div>
                <Jumbotron className={'w-75 ml-auto mr-auto'}>
                    <Row className={'text-center'}>
                        <Col md={1}>
                            <LinkContainer to={'/'}>
                                <Button variant={"secondary"}>Back</Button>
                            </LinkContainer>
                        </Col>
                        <Col md={9}>
                            <h1 id={'eng-dictionary-title'}>English-Estonian dictionary</h1>
                        </Col>
                        <Col md={2}>
                            <h1 className={'mb-4 text-center'}>
                                <AddWord/>
                            </h1>
                        </Col>
                    </Row>
                    <div className="mb-5">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search for a word"
                            value={this.state.searchWord}
                            onChange={this.handleSearchWord}
                            aria-label="Search"/>
                    </div>
                    {this.handleDynamicSearch().map((translations, index) => (
                        <Card key={index} className={'mb-5'} id={'eng-translate-card'}>
                            <Card.Header>
                                Translate for '{translations.word}'
                            </Card.Header>
                            <Card.Body>
                                <blockquote className={'blockquote mb-0'}>
                                    <p>
                                        {translations.wordTranslate.map(function (word, i) {
                                            return <h6 className={'ml-2'} key={i}>{word}</h6>
                                        })}
                                    </p>
                                    <footer className={'blockquote-footer'}>
                                        Translate from {translations.username}
                                    </footer>
                                </blockquote>
                            </Card.Body>
                        </Card>
                    ))}
                </Jumbotron>
            </div>
        );
    }
}

export default Eng;
import React, {Component} from 'react';

// Bootstrap components import
import {Button, Card, Col, Jumbotron, Row} from "react-bootstrap";
import {PlusCircle} from "react-bootstrap-icons";

class Eng extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverUrl: "http://localhost:8080/api/v1/user-dictionary",
            translations: []
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

    render() {
        return (
            <div>
                <Jumbotron className={'w-75 ml-auto mr-auto'}>
                    <Row className={'text-center'}>
                        <Col md={10}>
                            <h1 id={'eng-dictionary-title'}>English-Estonian dictionary</h1>
                        </Col>
                        <Col md>
                            <h1 className={'mb-4 text-center'}>
                                <Button variant={"secondary"}>
                                    <PlusCircle size={20} className={'mb-1'}/> Add your word
                                </Button>
                            </h1>
                        </Col>
                    </Row>
                    <div className="mb-5">
                        <input className="form-control" type="text" placeholder="Search for a word" aria-label="Search"/>
                    </div>
                    {this.state.translations.map((translations, index) => (
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
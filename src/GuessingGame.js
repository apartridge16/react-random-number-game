import './GuessingGame.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react';

function GuessingGame() {
  const [luckyNumber, setLuckyNumber] = useState(LuckyNumber());
  const [currentGuess, setGuess] = useState('');
  const [message, setMessage] = useState('Start Guessing!');
  const [numGuesses, setNumGuesses] = useState(0);

  function LuckyNumber() {
    return Math.ceil(Math.random() * 100);
  }

  useEffect(() => {
    const luckyNum = localStorage.getItem('luckyNumber');
    const numGuesses = localStorage.getItem('numGuesses');
    if (luckyNum) {
      setLuckyNumber(JSON.parse(luckyNum));
    }
    if (numGuesses) {
      setNumGuesses(JSON.parse(numGuesses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('luckyNumber', JSON.stringify(luckyNumber));
    localStorage.setItem('numGuesses', JSON.stringify(numGuesses));
  }, [luckyNumber, numGuesses]);

  function handleChange(event) {
    setGuess(event.target.value);
  }

  function handleReset() {
    setLuckyNumber(LuckyNumber());
    setNumGuesses(0);
    setGuess('');
    setMessage('Start Guessing!');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let guess = parseInt(currentGuess);
    if (guess === luckyNumber) {
      setMessage('You guessed right!');
    } else if (guess < luckyNumber) {
      setMessage('Number is low');
    } else if (guess > luckyNumber) {
      setMessage('Number is high');
    }
  };

  function incrementGuess() {
    setNumGuesses(numGuesses + 1);
  }

  return (
    <body>
      <h1 className="heading">Random Number Guessing Game</h1>
      <p>
        I am thinking of a number between 1 and 100. Guess the Lucky Number!
      </p>
      <p>You have made {numGuesses} guesses</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Guess Here!"
            onChange={handleChange}
            id="control-form"
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={incrementGuess}>
          Guess
        </Button>
        <Button variant="danger" type="reset" onClick={handleReset}>
          Reset
        </Button>
      </Form>
      <Form.Label className="text">{message}</Form.Label>
    </body>
  );
}

export default GuessingGame;

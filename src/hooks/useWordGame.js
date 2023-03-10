import {useState, useEffect, useRef} from 'react';

function useWordGame(startingTime = 10) {
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(startingTime);
    const [isRunning, setIsRunning] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const textareaRef = useRef(null);
    
    function handleChange(e) {
        const {value} = e.target;
        setText(value);
    }
    
    function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ");
        return wordsArr.filter(word => word !== "").length;
    }
  
    function startGame() {
      setIsRunning(true);
      setTimeRemaining(startingTime);
      setText('');
      setWordCount(0);
      textareaRef.current.disabled = false;
      textareaRef.current.focus();
    }
  
    function endGame() {
      setIsRunning(false);
      setWordCount(calculateWordCount(text));
    }
    
    useEffect(() => {
        if(isRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000);
        } else if (timeRemaining === 0) {
          endGame();
        }
    }, [timeRemaining, isRunning]);

    return {handleChange, text, isRunning, textareaRef, timeRemaining, startGame, wordCount}
}

export default useWordGame;
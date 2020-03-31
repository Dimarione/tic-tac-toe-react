import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//текстовое сообщение
function Message(props) {
    let message = props.message;
    let currentPlayer = props.currentPlayer;
    return (
        <h1 className = "game-title" id = "message">{message}{currentPlayer}</h1>
    );

}


//кнопка
function Button(props) {
    return (
        <div>
            <button onClick = {props.resetGame}
                    id = "reset-game">Очистить
            </button>
        </div>
    )

}


//компонент приложения
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayer: 'X',
            squares: Array(9).fill(null),
            count: 0,
            message: 'Ходит игрок ',
            stopGame: false,
        };
        //выйгрышные комбинации
        this.winCombination = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        this.dataCellX = [];
        this.dataCellO = [];
        this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }

    isWinner = arr => {

        let winCombination = this.winCombination;
        for (let i = 0; i < winCombination.length; i++) {
            let winArr = winCombination[i];
            let count = 0;
            for (let j = 0; j < winArr.length; j++) {
                let result = winArr[j];
                if (arr.includes(result)) {
                    count++;
                    if (count === 3) {
                        return true;
                    }
                }
            }
            count = 0;
        }
        return false;
    }

    changePlayer = () => {
        this.setState({
            //смена игрока
            currentPlayer: (this.state.count % 2 === 0) ? 'O' : 'X'
        })
    }

    resetGame = () => {
        this.setState({
            currentPlayer: 'X',
            squares: Array(9).fill(null),
            count: 0,
            message: 'Ходит игрок ',
            stopGame: false,
        })
        this.dataCellX = [];
        this.dataCellO = [];
    }

    handleClick = event => {
        // console.log(1);
        //data это номер ячейки по которой кликнули
        let data = event.target.getAttribute('data-cell');
        let currentSquares = this.state.squares;
        console.log(currentSquares);

        if (currentSquares[data] === null && !this.state.stopGame) {
            currentSquares[data] = (this.state.count % 2 === 0) ? 'X' : 'O';
            (this.state.currentPlayer === 'X') ? this.dataCellX.push(+data) : this.dataCellO.push(+data);
            this.setState({
                count: this.state.count + 1,
                squares: currentSquares,
            });

            if ((this.dataCellX.length > 2 || this.dataCellO.length > 2) && (this.isWinner(this.dataCellX) || this.isWinner(this.dataCellO))) {
                this.setState({
                        message: 'Победил игрок ',
                        stopGame: true,
                    }
                )
            } else {
                this.changePlayer()
            }


            console.log(this.state.count)
            console.log(this.state.stopGame)
            if (this.state.count === 8) {
                this.setState({
                    message: 'Ничья',
                    currentPlayer: '',
                })
            }
        }


    }


    render() {
        const numbers = this.numbers;
        const message = this.state.message;
        const currentPlayer = this.state.currentPlayer;

        const listItems = numbers.map((number) =>
            <div className = {`game-item ${this.state.squares[number]}`}
                 key = {number.toString()}
                 data-cell = {number}
                 onClick = {this.handleClick}
            >{this.state.squares[number]}</div>
        );
        return (
            <div>
                <Message message = {message} currentPlayer = {currentPlayer}/>
                <div className = 'container'>{listItems}</div>
                <Button resetGame = {this.resetGame}/>
            </div>

        );
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
/////==========================

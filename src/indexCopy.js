import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//текстовое сообщение
class Message extends React.Component {
    render() {
        return (
            <h1 className = "game-title" id = "message">Ходит игрок X</h1>
        );
    }
}


//ячейки игрового поля
class ListItem extends React.Component {
    render() {
        return (
            <div
                className = "game-item" data-cell = {this.props.value}>
            </div>
        )
    }


}

//игровое поле
class GameField extends React.Component {
    render() {

        const numbers = this.props.numbers;
        const listItems = numbers.map((number) =>
            <ListItem key = {number.toString()} value = {number}/>
        );
        return (
            <div className = 'container'>{listItems}</div>
        );
    }
}

//кнопка
class Button extends React.Component {
    render() {
        return (
            <div>
                <button id = "reset-game">Очистить</button>
            </div>
        )
    }
}


//компонент приложения
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class App extends React.Component {


    render() {
        return (
            <div>
                <Message/>
                <GameField numbers = {numbers}/>
                <Button/>
            </div>
        );
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
/////==========================

let stepCount; // счетчик ходов
let player; //текущий игрок
// let winCombination = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//     [1, 4, 7],
//     [2, 5, 8],
//     [3, 6, 9],
//     [1, 5, 9],
//     [3, 5, 7],
// ];                  //выйгрышные комбинации

//массивы для значений ячеек по которым нажал игрок
let dataCellX;
let dataCellO;

//список из всех клеток игрового поля
let cells = document.querySelectorAll('.game-item');
// console.log(cells);
//находим кнопку сброса игры
let resetGame = document.querySelector('#reset-game');
// console.log(resetGame);
let message = document.querySelector('#message');
// console.log(message);

init();
/////////////////
function init() {
    reset();

    //кнопака очистки поля
    resetGame.addEventListener('click', reset)
}
/////////////////

//сброс поля
function reset() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
    }
    //сброс результатов игроков
    dataCellO = [];
    dataCellX = [];
    //сброс значения текущего игрока
    player = 'X';
    //сброс счечика ходов
    stepCount = 0;
    //меняем сообщение о ходе текущего игрока
    message.innerText = 'Ходит игрок ' + player;
    //снова добавляем обработчик
    for (let i = 0; i < cells.length; i++) {
        //добавляем обработчик
        cells[i].addEventListener('click', currentStep);
        //стираем классы подсвечивающие ячейки
        cells[i].classList.remove('x', 'o');
    }
}

//ход игрока
function currentStep(event) {
    //заисываем знчение атриба которое мы получаем при клике по клетке на поле.

    // let num = +event.target.getAttribute('data-cell'); // вместо this можно использовать event.target
    let num = +event.target.dataset.cell;
    // вместо this.getAttribute можно использовать dataset

    //запускаем проверку, есть ли уже значение в клетке по которой мы кликнули.
    if (!event.target.textContent) {
        event.target.innerText = player;
        (player === "X") ?
            //добавляем в массив значение аркумента data-cell и добавляем класс для подсветки поля
            dataCellX.push(num) && event.target.classList.add('x') :
            dataCellO.push(num) && event.target.classList.add('o');
        //проверка выйграли текущий игрок
        if (
            (dataCellX.length > 2 || dataCellO.length > 2) &&
            (isWinner(dataCellX, num) || isWinner(dataCellO, num))
        ) {
            //удаляем обработчик из клеток
            for (let i = 0; i < cells.length; i++) {
                cells[i].removeEventListener('click', currentStep);
            }
            //меняем сообщение на странице
            return (message.innerText = 'Победил игрок ' + player);

        }

        //смена текущего игрока
        changePlayer();
        stepCount++;
        //проыверяем остались ли еще ходы
        (stepCount === 9) ? (message.innerText = 'Ничья') :
            (message.innerText = 'Ходит игрок ' + player)
    }
}

//смена ходя игрока
function changePlayer() {
    player === 'X' ? (player = 'O') : (player = 'X');
}

//arr - массив результатов хода игрока; number - значение аргумента data-cell
//поиск победителя
function isWinner(arr, number) {
    const winCombination = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];                  //выйгрышные комбинации

    for (let i = 0, iLeng = winCombination.length; i < iLeng; i++) {
        let winArr = winCombination[i];
        let count = 0;
        for (let j = 0, jLeng = winArr.length; j < jLeng; j++) {
            if (arr.indexOf(winArr[j]) !== -1) {
                count++;
                if (count === 3) {
                    return true;
                }
            }
        }
        count = 0;
    }
}

import { useState } from 'react';
import excited from './Images/excited.gif';
import './App.css';

function App() {

	const [state, setState] = useState(Array(9).fill(null))
	const [currentPlayer, setcurrentplayer] = useState('X')

	function checkWinner() {
		const Winningprobablity = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		]
		for (let i = 0; i < Winningprobablity.length; i++) {
			const [a, b, c] = Winningprobablity[i]
			console.log(a, b, c);
			if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
				return state[a]
			}
		}
		return false
	}

	function isDraw() {
		return state.every((square) => square !== null)
	}

	const iswinner = checkWinner();

	function handleclick(id) {
		if (state[id] !== null) {
			return   //if the box has been clicked already exit immediately from function and dont do anything
		}
		setState((prevstate) => {
			return prevstate.map((item, index) => {
				if (index === id) {
					return currentPlayer
				}
				else {
					return item;
				}
			});
		});
		setcurrentplayer((prevplayer) => prevplayer === 'X' ? '0' : 'X');
	}

	function handleReset() {
		const ResettedState = Array(9).fill(null)
		setState(ResettedState)
	}

	return (
		<>
			{iswinner ?
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{iswinner} won the game</div>
				: isDraw() ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Match draw</div> : null
			}

			{iswinner ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '150px' }} alt='excitedgif' src={excited} /></div> : null}

			<div className='main'>
				<div className='BoardContainer'>
					{state?.map((value, index) => {
						return <div style={{ color: value === 'X' ? 'red' : 'blue' }} key={index} onClick={() => handleclick(index)} className='box'>{value}</div>
					})}
				</div>
				<button className='resetBtn' onClick={handleReset}>Reset</button>

			</div >
		</>
	);
}

export default App;

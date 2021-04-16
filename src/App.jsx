import React from 'react';
import generateLottoNumbers from './utils/generateTicket';
import PurchaseForm from './components/PurchaseFrom';
import TicketDetail from './components/TicketDetail';
import WinningNumberForm from './components/WinningNumberForm';
import Modal from './components/Modal';

import 'tailwindcss/tailwind.css';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tickets: [],
      winningNumbers: [],
      bonusNumber: 0,
    };

    this.setTickets = this.setTickets.bind(this);
    this.setWinningNumbers = this.setWinningNumbers.bind(this);
    this.setBonusNumber = this.setBonusNumber.bind(this);
  }

  setTickets(ticketCount) {
    this.setState({ tickets: Array.from({ length: ticketCount }, generateLottoNumbers) });
  }

  setWinningNumbers(winningNumbers) {
    this.setState({ winningNumbers });
  }

  setBonusNumber(bonusNumber) {
    this.setState({ bonusNumber });
  }

  render() {
    return (
      <main className="m-16 p-9 max-w-screen-sm mx-auto bg-gray-200 ">
        <h1 className="text-center text-3xl	font-bold ">
          <span role="img" aria-label="good-luck">
            🎱
          </span>
          행운의 로또
        </h1>
        <PurchaseForm setTickets={this.setTickets} />
        <TicketDetail tickets={this.state.tickets} />
        <WinningNumberForm setWinningNumbers={this.setWinningNumbers} setBonusNumber={this.setBonusNumber} />
        {
          // prettier-ignore
          [this.state.tickets.length > 0, this.state.winningNumbers.length > 0, this.state.bonusNumber > 0]
            .every(Boolean) && <Modal />
        }
      </main>
    );
  }
}

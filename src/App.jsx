import React, { useEffect, useState } from 'react';
import { generateLottoNumbers } from './utils';
import { PurchaseForm, TicketDetail, WinningNumberForm, Modal, WinningResult } from './components';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [bonusNumber, setBonusNumber] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const isOpen = [tickets.length > 0, winningNumbers.length > 0, bonusNumber > 0].every(Boolean);

    setIsModalOpen(isOpen);
  }, [tickets, winningNumbers, bonusNumber]);

  const setTicketCount = (ticketCount) => {
    setTickets(Array.from({ length: ticketCount }, generateLottoNumbers));
  };

  const handleResetClick = () => {
    setTickets([]);
    setWinningNumbers([]);
    setBonusNumber(0);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const isReset = [winningNumbers.length === 0, bonusNumber === 0].every(Boolean);

  return (
    <>
      <main className="m-16 mx-auto p-9 max-w-screen-sm bg-white rounded-xl focus:ring-red-500">
        <h1 className="text-4xl	font-bold mb-14 text-center space-x-2">
          <span role="img" aria-label="good-luck">
            🎱
          </span>
          <span>행운의 로또</span>
        </h1>
        <PurchaseForm setTicketCount={setTicketCount} tickets={tickets} isReset={isReset} />
        {tickets.length > 0 && (
          <>
            <TicketDetail tickets={tickets} />
            <WinningNumberForm
              setWinningNumbers={setWinningNumbers}
              setBonusNumber={setBonusNumber}
              isReset={isReset}
            />
          </>
        )}
      </main>
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <WinningResult
            onReset={handleResetClick}
            tickets={tickets}
            winningNumbers={winningNumbers}
            bonusNumber={bonusNumber}
          />
        </Modal>
      )}
    </>
  );
};

export default App;

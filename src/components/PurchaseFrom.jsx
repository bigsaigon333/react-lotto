import React from 'react';
import PropTypes from 'prop-types';
import { LOTTO } from '../utils/constants';

export default class PurchaseForm extends React.Component {
  static propTypes = {
    setTickets: PropTypes.func.isRequired,
  };

  static err(message) {
    throw new Error(message);
  }

  static calculateTicketCount(amount) {
    return Math.floor(Number(amount) / LOTTO.UNIT_PRICE);
  }

  static validationMessage = {
    table: {
      true: (value) => PurchaseForm.calculateTicketCount(value) + '장의 로또를 구매하실 수 있습니다.',
      false: () =>
        `${Number(LOTTO.MIN_PRICE).toLocaleString('en-US')}원 이상 ${Number(LOTTO.MAX_PRICE).toLocaleString(
          'en-US'
        )} 이하의 금액을 입력해주세요.`,
    },
    router: ({ valid, value }) =>
      PurchaseForm.validationMessage.table[valid]?.(value) ?? PurchaseForm.err(`invalid valid state: ${valid}`),
  };

  constructor(props) {
    super(props);

    this.state = {
      purchaseInput: {
        value: '',
        valid: false,
        isSubmitted: false,
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const ticketCount = PurchaseForm.calculateTicketCount(this.state.purchaseInput.value);

    this.props.setTickets(ticketCount);
    this.setState({ purchaseInput: { value: '', valid: true, isSubmitted: true } });

    alert(`총 ${ticketCount}장을 구매하였습니다.`);
  }

  handleInputChange(event) {
    this.setState({
      purchaseInput: {
        value: event.target.value,
        valid: event.target.validity.valid,
      },
    });
  }

  render() {
    return (
      <form className="mt-5 mb-4" onSubmit={this.handleSubmit}>
        <h2 className="text-xl font-semibold ">구입할 금액을 입력해주세요.</h2>
        <div className="container flex flex-col my-2 space-y-2">
          <div className="container flex flex-row">
            <label htmlFor="purchase-input" className="sr-only">
              구입 금액 입력란
            </label>
            <input
              id="purchase-input"
              type="number"
              className="
                w-full h-12
                mr-2 py-2 px-4
                appearance-textfield border rounded shadow
                text-lg text-darkgray-700 leading-tight
                focus:outline-none focus:ring-blue-700 focus:ring-2 focus:shadow-outline
                invalid:focus:ring-rose-400
                "
              placeholder="구입 금액"
              onChange={this.handleInputChange}
              value={this.state.purchaseInput.value}
              min={LOTTO.MIN_PRICE}
              max={LOTTO.MAX_PRICE}
              required
              disabled={this.state.purchaseInput.isSubmitted}
            />
            <button
              type="submit"
              className="
                font-bold text-white
                py-2 px-4 min-w-1/8
                rounded shadow
                bg-blue-600 hover:bg-blue-700
                focus:outline-none focus:ring-blue-800 focus:ring-1 focus:shadow-outline
                disabled:bg-gray-700 disabled:cursor-not-allowed
                "
              disabled={!this.state.purchaseInput.valid}
            >
              확인
            </button>
          </div>
          <span
            className={`
              h-4 select-none
              ${this.state.purchaseInput.valid ? 'text-blue-600' : 'text-rose-600'}
            `}
          >
            {!this.state.purchaseInput.isSubmitted && PurchaseForm.validationMessage.router(this.state.purchaseInput)}
          </span>
        </div>
      </form>
    );
  }
}

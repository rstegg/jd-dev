import React from 'react'

import PaymentsItem from '../../elements/PaymentsItem'

const PaymentsList =
({
  payments,
  setCurrentPayment
}) =>
  <ul className='payments--list'>
    {
      payments.length ? payments.map((payment, i) =>
        <PaymentsItem key={`payment-${i}`} payment={payment} onClick={() => setCurrentPayment(payment)} />
      )
      :
      <li>
        No Payments!
      </li>
    }
  </ul>

export default PaymentsList

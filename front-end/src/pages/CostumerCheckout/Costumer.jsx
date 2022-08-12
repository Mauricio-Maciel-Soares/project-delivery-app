import React, { useState, useEffect } from 'react';
import { fetchSellers } from '../../helpers/api';
import Navbar from '../../components/Navbar/Navbar';
import TableInfo from '../../components/TableInfo/TableInfo';

export default function CostumerCheckout() {
  const [products, setProducts] = useState(localStorage.getItem('products') === null
    ? [] : JSON.parse(localStorage.getItem('products')));
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(0);
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const handleCallback = async (_e, productName) => {
    setProducts((prevState) => {
      const result = prevState.filter((product) => product.name !== productName);
      localStorage.setItem('products', JSON.stringify(result));
      return result;
    });
  };
  const calculateTotal = () => {
    const res = products.map((product) => product.quantity
    * product.price);
    return res.reduce((acc, value) => acc + value).toFixed(2);
  };
  const fetchSeller = async () => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/sales`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        totalPrice: calculateTotal(),
        deliveryAddress: address,
        deliveryNumber: addressNumber,
        status: 'pendente',
        userId: 3,
        sellerId: selectedSeller.id,
      }),
    });
  };

  useEffect(() => {
    fetchSellers().then((response) => setSellers(response));
    setSelectedSeller(sellers[0]);
  }, [sellers]);
  return (
    <section>
      <Navbar />
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {products !== undefined && products !== null && products.length !== 0
            ? products.map((product, i) => (
              <TableInfo
                key={ i }
                orderId={ i + 1 }
                name={ product.name }
                quantity={ product.quantity }
                price={ product.price }
                removeCallBack={ handleCallback }
              />
            ))
            : null}
        </tbody>
      </table>
      {products !== undefined && products !== null && products.length !== 0
        ? (
          <h1
            data-testid="customer_checkout__element-order-total-price"
          >
            {`Total: R$ ${calculateTotal().replace('.', ',')}`}

          </h1>)
        : <h1>Nenhum produto inserido</h1>}
      <div>
        <label htmlFor="sellers">
          P.Vendedora Responsável:
          <select
            data-testid="customer_checkout__select-seller"
            onClick={ (e) => setSelectedSeller(e.target.value) }
            name="sellers"
            id="sellers"
            defaultValue={ sellers !== undefined
             && sellers.length !== 0 ? sellers[0].id : 0 }
          >
            {sellers !== undefined && sellers.length !== 0 ? sellers.map((seller) => (
              <option key={ seller.id } value={ seller.id }>{seller.name}</option>
            ))
              : <option>Nenhum vendedor disponivel</option>}
          </select>
        </label>
        <label htmlFor="endereco">
          Endereço:
          <input
            data-testid="customer_checkout__input-address"
            onChange={ (e) => setAddress(e.target.value) }
            value={ address }
            id="endereco"
            type="text"
            placeholder="Travessa Terceira da Castanheira, bairro murici"
          />
        </label>
        <label htmlFor="numero">
          <input
            data-testid="customer_checkout__input-addressNumber"
            onChange={ (e) => setAddressNumber(e.target.value) }
            value={ addressNumber }
            input="numero"
            type="text"
            placeholder="777"
          />
        </label>
      </div>
      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
        onClick={ fetchSeller }
      >
        Finalizar pedido

      </button>
    </section>
  );
}

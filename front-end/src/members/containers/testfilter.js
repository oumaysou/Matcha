import React, { Component } from 'react'
import './Product.css'
import products from '../offers.json'

class Product extends Component {

  constructor(props) {
    super(props)
    this.state = { products }
    this.sortByPriceAsc = this.sortByPriceAsc.bind(this);
  }

  sortByPriceAsc() {
    this.setState(prevState => {
      this.state.products.sort((a, b) => (a.price - b.price))
  });
  }

  render() {
    return (
      <div>
        <button onClick={this.sortByPriceAsc}>
          ASC
        </button>

        <div className="product">
        { this.state.products.map((product, index) =>
            <div key ={index} className="card">
            <h3>Prijs: { product.price } Euro</h3>
            </div>
        )}
        </div>
      </div>
    )
  }
}
export default Product
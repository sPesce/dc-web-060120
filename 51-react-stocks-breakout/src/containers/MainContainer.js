import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'
const baseUrl = `http://localhost:3000/`
const stocksUrl = baseUrl + `stocks/`

class MainContainer extends Component {

  state = {
    stocks: [],
    myPortfolio: [],
    sortBy: 'None',
    filterBy: 'None',
  }

  componentDidMount () {
    fetch( stocksUrl )
    .then( res => res.json() )
    .then( stocksData => this.setState({ stocks: stocksData }) )
  }

  addStockToPortfolio = ( id ) => {
    let portfolio = [...this.state.myPortfolio]

    if ( !portfolio.includes( id ) ) {
      portfolio.push( id )
      this.setState({
        myPortfolio: portfolio
      })
    }
  }

  removeStockFromPortfolio = ( id ) => {
    let portfolio = [...this.state.myPortfolio]
    
    if ( portfolio.includes( id ) ) {
      portfolio = portfolio.filter( stockId => stockId !== id )
      this.setState({
        myPortfolio: portfolio
      })
    }
  }

  changeSortBy = ( sort ) => this.setState({ sortBy: sort })
  changeFilterBy = ( filter ) => this.setState({ filterBy: filter })

  filterStocks = ( ) => {
    let stocks = [...this.state.stocks]
    let filterBy = this.state.filterBy

    if ( filterBy !== 'None' )
      stocks = stocks.filter( stock => stock.type === filterBy )

    return this.sortStocks( stocks )
  }

  sortStocks = ( stocks ) => {
    let sortBy = this.state.sortBy

    if ( sortBy === 'Price' )
      stocks.sort( ( stock1, stock2 ) => stock1.price - stock2.price )
    else if ( sortBy === "Alphabetically" )
      stocks.sort( ( stock1, stock2 ) => stock1.name.localeCompare(stock2.name) )

      return stocks
  }

  render() {
    return (
      <div>
        <SearchBar
          changeFilterBy = { this.changeFilterBy }
          changeSortBy = { this.changeSortBy }
          sortBy = { this.state.sortBy }
        />

          <div className="row">
            <div className="col-8">

              <StockContainer
                stocks = { this.filterStocks() }
                addStockToPortfolio = { this.addStockToPortfolio }
              />

            </div>
            <div className="col-4">

              <PortfolioContainer
                stocks = { this.state.stocks }
                myPortfolio = { this.state.myPortfolio }
                removeStockFromPortfolio = { this.removeStockFromPortfolio }
              />

            </div>
          </div>
      </div>
    );
  }
}

export default MainContainer;

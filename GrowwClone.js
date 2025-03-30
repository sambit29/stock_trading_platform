import React, { useState } from "https://esm.sh/react@18.2.0";

const STOCKS_DATA = [
  {
    symbol: "INFY",
    name: "Infosys Limited",
    price: 1500.50,
    change: 2.35,
    changePercent: 0.16,
    sector: "IT Services",
    marketCap: "₹6.5L Cr",
    pe: 25.6,
    logo: "https://maxm-imggenurl.web.val.run/infosys-logo"
  },
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    price: 2350.75,
    change: -15.20,
    changePercent: -0.64,
    sector: "Diversified",
    marketCap: "₹19.2L Cr",
    pe: 18.3,
    logo: "https://maxm-imggenurl.web.val.run/reliance-logo"
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: 3200.25,
    change: 12.45,
    changePercent: 0.39,
    sector: "IT Services",
    marketCap: "₹12.5L Cr",
    pe: 22.7,
    logo: "https://maxm-imggenurl.web.val.run/tcs-logo"
  },
  {
    symbol: "HDFC",
    name: "HDFC Bank",
    price: 1450.60,
    change: 5.75,
    changePercent: 0.40,
    sector: "Banking",
    marketCap: "₹8.7L Cr",
    pe: 19.5,
    logo: "https://maxm-imggenurl.web.val.run/hdfc-logo"
  }
];

const MUTUAL_FUNDS = [
  {
    name: "HDFC Top 100 Fund",
    category: "Large Cap",
    returns: {
      "1Y": 18.5,
      "3Y": 22.3,
      "5Y": 25.7
    },
    minInvestment: 500,
    risk: "Moderate",
    fundManager: "Prashant Jain"
  },
  {
    name: "SBI Bluechip Fund",
    category: "Large Cap",
    returns: {
      "1Y": 16.2,
      "3Y": 20.1,
      "5Y": 23.4
    },
    minInvestment: 1000,
    risk: "Moderate",
    fundManager: "Dinesh Balachandran"
  }
];

export default function GrowwClone() {
  const [activeTab, setActiveTab] = useState("stocks");
  const [portfolio, setPortfolio] = useState([]);
  const [balance, setBalance] = useState(100000);
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (stock) => {
    if (!watchlist.find(item => item.symbol === stock.symbol)) {
      setWatchlist([...watchlist, stock]);
    }
  };

  const buyStock = (stock, quantity) => {
    const totalCost = stock.price * quantity;
    if (totalCost <= balance) {
      const existingHolding = portfolio.find(item => item.symbol === stock.symbol);
      
      if (existingHolding) {
        setPortfolio(portfolio.map(item => 
          item.symbol === stock.symbol 
            ? {...item, quantity: item.quantity + quantity} 
            : item
        ));
      } else {
        setPortfolio([...portfolio, {...stock, quantity}]);
      }
      
      setBalance(balance - totalCost);
    } else {
      alert("Insufficient balance!");
    }
  };

  return (
    <div className="groww-container">
      <header className="groww-header">
        <div className="logo">Groww</div>
        <nav>
          <button 
            className={activeTab === "stocks" ? "active" : ""}
            onClick={() => setActiveTab("stocks")}
          >
            Stocks
          </button>
          <button 
            className={activeTab === "mutualFunds" ? "active" : ""}
            onClick={() => setActiveTab("mutualFunds")}
          >
            Mutual Funds
          </button>
          <button 
            className={activeTab === "portfolio" ? "active" : ""}
            onClick={() => setActiveTab("portfolio")}
          >
            Portfolio
          </button>
        </nav>
        <div className="user-actions">
          <div className="user-balance">
            ₹{balance.toLocaleString()}
          </div>
          <button className="invest-button">Invest</button>
        </div>
      </header>

      {activeTab === "stocks" && (
        <div className="stocks-section">
          <div className="stocks-grid">
            {STOCKS_DATA.map(stock => (
              <div key={stock.symbol} className="stock-card">
                <div className="stock-header">
                  <img src={stock.logo} alt={stock.name} className="stock-logo" />
                  <div className="stock-basic-info">
                    <h3>{stock.symbol}</h3>
                    <p>{stock.name}</p>
                  </div>
                </div>
                <div className="stock-details">
                  <div className="stock-price-section">
                    <span className="stock-price">₹{stock.price.toFixed(2)}</span>
                    <span 
                      className={`price-change ${stock.change >= 0 ? 'positive' : 'negative'}`}
                    >
                      {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change).toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                  <div className="stock-meta">
                    <span>Sector: {stock.sector}</span>
                    <span>Market Cap: {stock.marketCap}</span>
                    <span>P/E: {stock.pe}</span>
                  </div>
                  <div className="stock-actions">
                    <button 
                      className="watchlist-btn"
                      onClick={() => addToWatchlist(stock)}
                    >
                      Watchlist
                    </button>
                    <button 
                      className="buy-btn"
                      onClick={() => {
                        const quantity = parseInt(prompt("Enter quantity to buy:") || "0");
                        if (quantity > 0) {
                          buyStock(stock, quantity);
                        }
                      }}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "mutualFunds" && (
        <div className="mutual-funds-section">
          <div className="mutual-funds-grid">
            {MUTUAL_FUNDS.map(fund => (
              <div key={fund.name} className="mutual-fund-card">
                <div className="fund-header">
                  <h3>{fund.name}</h3>
                  <span className="fund-category">{fund.category}</span>
                </div>
                <div className="fund-returns">
                  <div className="return-item">
                    <span>1Y</span>
                    <strong>{fund.returns["1Y"]}%</strong>
                  </div>
                  <div className="return-item">
                    <span>3Y</span>
                    <strong>{fund.returns["3Y"]}%</strong>
                  </div>
                  <div className="return-item">
                    <span>5Y</span>
                    <strong>{fund.returns["5Y"]}%</strong>
                  </div>
                </div>
                <div className="fund-details">
                  <div className="fund-meta">
                    <span>Min Investment: ₹{fund.minInvestment}</span>
                    <span>Risk: {fund.risk}</span>
                    <span>Fund Manager: {fund.fundManager}</span>
                  </div>
                  <button className="invest-btn">Invest Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "portfolio" && (
        <div className="portfolio-section">
          <div className="portfolio-summary">
            <div className="portfolio-value">
              <h3>Total Portfolio Value</h3>
              <span>₹{portfolio.reduce((total, stock) => total + (stock.price * stock.quantity), 0).toLocaleString()}</span>
            </div>
            <div className="portfolio-performance">
              <span className="positive">+₹5,234 (3.2%)</span>
              <small>Today's Gain</small>
            </div>
          </div>

          <div className="portfolio-holdings">
            <h3>My Holdings</h3>
            {portfolio.length === 0 ? (
              <p className="empty-state">No stocks in portfolio</p>
            ) : (
              portfolio.map(holding => (
                <div key={holding.symbol} className="portfolio-stock">
                  <div className="stock-info">
                    <span className="symbol">{holding.symbol}</span>
                    <span className="quantity">Qty: {holding.quantity}</span>
                  </div>
                  <div className="stock-value">
                    <span className="current-price">₹{holding.price.toFixed(2)}</span>
                    <span className="total-value">₹{(holding.price * holding.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="watchlist-section">
            <h3>Watchlist</h3>
            {watchlist.length === 0 ? (
              <p className="empty-state">No stocks in watchlist</p>
            ) : (
              watchlist.map(stock => (
                <div key={stock.symbol} className="watchlist-stock">
                  <div className="stock-info">
                    <span className="symbol">{stock.symbol}</span>
                    <span className="name">{stock.name}</span>
                  </div>
                  <div className="stock-actions">
                    <span className="current-price">₹{stock.price.toFixed(2)}</span>
                    <button onClick={() => buyStock(stock, 1)}>Buy</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
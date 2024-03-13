import './App.css';

function App() {
  return (
    <form>
      <label>
        <span>ETH amount:</span>
        <input type='number' />
      </label>
      <label>
        <span>Action:</span>
        <div>
          <input type='checkbox' />
          <span aria-live='assertive'>Sell</span>
        </div>
      </label>
      <label>
        <span>You will receive:</span>
        <input type='text' disabled />
      </label>
    </form>
  );
}

export default App;

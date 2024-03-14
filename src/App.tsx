import "./App.css";

function App() {
  return (
    <form className='form'>
      <label className='label'>
        <span className='label-text'>ETH amount:</span>
        <input type='number' className='amount-input'/>
      </label>
      <label className='label'>
        <span className='label-text'>Action:</span>
        <div className='checkbox-wrapper'>
          <input type='checkbox' className='checkbox' />
          <span aria-live='assertive' className='label-text'>Sell</span>
        </div>
      </label>
      <label className='label'>
        <span className='label-text'>You will receive:</span>
        <input type='number' className='receive-input'/>
      </label>
    </form>
  );
}

export default App;

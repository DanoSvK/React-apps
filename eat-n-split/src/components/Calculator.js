import { useState } from "react";

export default function Calculator({ selectedFriend, onBalance }) {
  const [bill, setBill] = useState(0);
  const [myBill, setMyBill] = useState(0);
  const [payer, setPayer] = useState(0);

  const friendBill = payer === "friend" ? -bill + myBill : bill - myBill;

  if (!selectedFriend) return;

  return (
    <div className="calculator">
      <h2>SPLIT A BILL WITH NAME</h2>
      <form
        className="flex-vertical"
        onSubmit={(e) => onBalance(e, friendBill)}
      >
        <fieldset>
          <label>Bill value</label>
          <input
            type="number"
            onInputCapture={(e) => setBill(+e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label>Your expense</label>
          <input
            type="number"
            onInputCapture={(e) => setMyBill(+e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label>{`${selectedFriend.name}'s expense`}</label>
          <input
            type="number"
            className="disabled-input"
            value={Math.abs(friendBill)}
          />
        </fieldset>

        <fieldset>
          <label>Who's paying the bill</label>
          <select onChange={(e) => setPayer(e.target.value)}>
            <option value="you">You</option>
            <option value="friend">Friend</option>
          </select>
        </fieldset>

        <button>Split bill</button>
      </form>
    </div>
  );
}

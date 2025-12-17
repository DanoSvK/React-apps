import { useState } from "react";
import "../App.css";
import FriendsList from "./FriendsList";
import AddFriend from "./AddFriend";
import Calculator from "./Calculator";

function App() {
  const [friendsList, setFriendsList] = useState([]);
  const [selectedId, setselectedId] = useState(null);

  const selectedFriend = friendsList.find((friend) => friend.id === selectedId);

  function handleBalance(e, amount) {
    e.preventDefault();
    setFriendsList((prev) =>
      prev.map((friend) =>
        friend.id === selectedId
          ? { ...friend, balance: friend.balance + amount }
          : friend
      )
    );
  }

  function handleSelectFriend(id) {
    setselectedId((cur) => (cur !== id ? id : null));
  }

  function handleAddFriend(newFriend) {
    setFriendsList((prev) => [...prev, newFriend]);
  }

  return (
    <div className="main-layout">
      <div>
        <FriendsList
          friendsList={friendsList}
          onSelectFriend={handleSelectFriend}
          selectedId={selectedId}
        />
        <AddFriend onAddFriend={handleAddFriend} />
      </div>
      <Calculator selectedFriend={selectedFriend} onBalance={handleBalance} />
    </div>
  );
}

export default App;

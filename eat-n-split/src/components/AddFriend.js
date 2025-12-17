import { useState } from "react";

export default function AddFriend({ onAddFriend }) {
  const [friendName, setFriendName] = useState("");
  const [friendImage, setFriendImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenForm(e) {
    e.preventDefault();
    setIsOpen(true);
  }

  function handleCloseForm(e) {
    e.preventDefault();
    setIsOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!friendName || !friendImage) return;

    const newFriend = {
      id: Date.now(),
      name: friendName,
      image: friendImage,
      balance: 0,
    };

    onAddFriend(newFriend);

    setFriendName("");
    setFriendImage("");
  }

  return (
    <div>
      {isOpen ? (
        <>
          <form
            className="flex-vertical add-form add-friend"
            onSubmit={(e) => handleSubmit(e)}
          >
            <fieldset>
              <label>Friend name</label>
              <input
                type="text"
                onInput={(e) => setFriendName(e.target.value)}
                value={friendName}
              />
            </fieldset>

            <fieldset>
              <label>Image URL</label>
              <input
                type="text"
                onInput={(e) => setFriendImage(e.target.value)}
                value={friendImage}
              />
            </fieldset>

            <button className="add-btn">Add</button>
          </form>

          <button className="close-btn" onClick={(e) => handleCloseForm(e)}>
            Close
          </button>
        </>
      ) : (
        <button className="open-btn" onClick={(e) => handleOpenForm(e)}>
          Add friend
        </button>
      )}
    </div>
  );
}

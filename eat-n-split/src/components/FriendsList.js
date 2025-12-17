import Friend from "./Friend";

// const initialFriendsList = [
//   {
//     id: "1",
//     name: "Palino",
//     image: "https://i.pravatar.cc/48?u=118836",
//   },
//   {
//     id: "2",
//     name: "Palino",
//     image: "https://i.pravatar.cc/48?u=118836",
//   },
// ];

export default function FriendsList({
  friendsList,
  onSelectFriend,
  selectedId,
}) {
  if (!friendsList.length) return <p>No friends yet! Add one 👇</p>;

  return (
    <div className="friends-list">
      {friendsList.map((friend) => (
        <Friend
          friend={friend}
          onSelectFriend={onSelectFriend}
          selectedId={selectedId}
          key={friend.id}
        />
      ))}
    </div>
  );
}

export default function Friend({ friend, onSelectFriend, selectedId }) {
  const { id, name, image, balance } = friend;

  const isSelected = selectedId === id;

  const style =
    balance > 0
      ? { color: "#76AB3D" }
      : balance < 0
      ? { color: "#9F3332" }
      : { color: "black" };

  return (
    <div
      className="friend flex-horizontal"
      style={isSelected ? { backgroundColor: "#FDF4E1" } : {}}
    >
      <img src={image} alt={`${name}'s avatar`} />
      <div>
        <p>{name}</p>
        <p style={style}>
          {balance > 0
            ? `${name} owes you ${balance}€`
            : balance < 0
            ? `You owe ${name} ${Math.abs(balance)}€`
            : "You are even"}
        </p>
      </div>
      <button onClick={() => onSelectFriend(id)}>{`${
        isSelected ? "Close" : "Select"
      }`}</button>
    </div>
  );
}

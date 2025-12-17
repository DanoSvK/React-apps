export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list</em>
      </p>
    );

  const itemsCount = items.length;
  const packedCount = items.reduce((acc, obj) => acc + obj.packed, 0);
  const packedAvg = Math.round((packedCount / itemsCount) * 100);

  return (
    <footer className="stats">
      <em>
        {packedAvg === 100
          ? "You got everything! Ready to go ✈️"
          : `You have ${itemsCount} items on your list, and you already packed ${packedCount} (${
              packedAvg > 0 ? packedAvg : 0
            }%)`}
      </em>
    </footer>
  );
}

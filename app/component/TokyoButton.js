import Tokyo from "./Tokyo";

export default function TokyoButton() {
  return (
    <>
      <div>Hello World!</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={Tokyo}
      >
        Tokyo
      </button>
    </>
  );
}

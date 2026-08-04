export default function FormattedResult({ value }: { value: string }) {
  const [integer, decimal = ""] = value.split(".");

  return (
    <span>
      {integer}
      {decimal && (
        <>
          .{decimal.slice(0, 2)}
          <span className="text-slate-400">{decimal.slice(2)}</span>
        </>
      )}
    </span>
  );
}

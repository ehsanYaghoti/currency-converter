import React, { useState } from "react";
import SelectBox from "./selectBox";

export default function ConverterCard() {
  const [amount, setAmont] = useState("1");
  const [result, setResult] = useState(12500.55);
  const [originCC, setOriginCC] = useState("IRR");
  const [destinationCC, setDestinationCC] = useState("USD");

  const destinationCCHandler = (value: string) => {
    console.log(value);
    setDestinationCC(value);
  };

  const originCCHandler = (value: string) => {
    setOriginCC(value);
  };

  const swaphandler = () => {
    setOriginCC(destinationCC);
    setDestinationCC(originCC);
  };

  const handleSubmit = (
    e:
      | React.SubmitEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const ratio = 2;
    setResult(ratio * Number(amount));
  };

  return (
    <section className="w-full bg-white  p-6 border rounded-lg flex flex-col gap-16 ">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-5"
      >
        <div className="flex flex-col items-start gap-5 relative">
          <label htmlFor="amount" className="text-xs text-slate-500">
            Amount
          </label>
          <input
            type="number"
            inputMode="numeric"
            pattern="$/d+^"
            min={0}
            name="amount"
            id="amount"
            placeholder="Enter from here.."
            className="border-b-2 border-black/10 outline-none px-1 py-2 text-slate-700 text-2xl font-medium invalid:border-red-500 peer "
            value={amount}
            onChange={(e) => setAmont(e.target.value)}
          />
          <span className="  invisible  transition-all ease-in-out duration-100 peer-invalid:visible text-red-500 absolute -bottom-10 ">
            Enter only positive number inputs...
          </span>
        </div>

        <div className="flex flex-col items-start gap-5 flex-1">
          <label htmlFor="from-input" className="text-xs text-slate-500">
            From
          </label>
          <SelectBox name="from" value={originCC} handler={originCCHandler} />
        </div>

        <button
          type="button"
          onClick={swaphandler}
          className="border-2 bg-white cursor-pointer size-12 rounded-full border-primary text-primary hover:bg-primary hover:text-text-4 p-2.5 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>
        </button>

        <div className="flex flex-col items-start gap-5 flex-1">
          <label htmlFor="from-input" className="text-xs text-slate-500">
            To
          </label>
          <SelectBox
            name="to"
            value={destinationCC}
            handler={destinationCCHandler}
          />
        </div>
      </form>

      <div className="flex items-center justify-between w-full">
        <p className="flex flex-col items-start gap-0.5">
          <span className="text-base text-text-2">
            {amount} {originCC.toUpperCase()} equals to
          </span>
          <span className="text-5xl font-semibold text-text-1">
            {result.toFixed(2)} {destinationCC.toUpperCase()}
          </span>
        </p>
        <button
          onClick={(e) => handleSubmit(e)}
          className="text-lg font-medium cursor-pointer text-text-4 hover:opacity-80 bg-primary/90 border border-primary px-4 py-2 w-36 h-10 rounded-md flex items-center justify-center"
        >
          Convert
        </button>
      </div>

      <div className="flex flex-col items-start gap-1 text-sm text-slate-500 w-full pt-5 border-t">
        <p className="">1 UAH = 0.03383 USD</p>
        <p className="">1 USD = 29.55874 UAH</p>
      </div>
    </section>
  );
}

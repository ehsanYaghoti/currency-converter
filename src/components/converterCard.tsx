import React, { useEffect, useState } from "react";
import SelectBox from "./selectbox";
import amountValidator from "../utils/amountValidator";
import numberFormatter from "../utils/numberFormatter";
import fetchExchangeRates from "../services/fetchExchangeRates";
import FormattedResult from "./formattedResult";
import LoadingSpinner from "./loadingSpinner";

export default function ConverterCard() {
  const [amount, setAmont] = useState("1");
  const [result, setResult] = useState("");
  const [originCC, setOriginCC] = useState("USD");
  const [destinationCC, setDestinationCC] = useState("IRR");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!inputValidation(amount)) return;

    convertHandler(amount);
  }, [amount, originCC, destinationCC]);

  const destinationCCHandler = (value: string) => {
    setDestinationCC(value);
  };

  const originCCHandler = (value: string) => {
    setOriginCC(value);
  };

  const swaphandler = () => {
    setOriginCC(destinationCC);
    setDestinationCC(originCC);
  };

  async function convertHandler(body: string) {
    setLoading(true);

    try {
      const rates = await fetchExchangeRates("USD");

      const originalRate = rates[originCC]
      const destinationRate  = rates[destinationCC]

      const result = +body * (destinationRate / originalRate);

      setResult(numberFormatter(result));

      setError("");
    } catch (error) {
      setError("some thing went wrong");
    } finally {
      setLoading(false);
    }
  }

  const inputValidation = (value: string) => {
    if (!amountValidator(value)) {
      setError("please enter valid amount");
      setResult("");
      setLoading(false);
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (
    e:
      | React.SubmitEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!inputValidation(amount)) return;

    await convertHandler(amount);
  };

  return (
    <section className="w-full bg-white  p-6 border rounded-lg flex flex-col gap-16 ">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col md:flex-row items-center md:items-end justify-between w-full gap-5"
      >
        <div className="flex flex-col items-start gap-5 relative w-full md:w-auto md:flex-1 ">
          <label htmlFor="amount" className="text-xs text-slate-500 w-full">
            Amount
          </label>
          <input
            type="number"
            inputMode="numeric"
            minLength={2}
            min={0}
            name="amount"
            id="amount"
            placeholder="Enter from here.."
            className="border-b-2 border-black/10 outline-none px-1 py-2 w-full text-slate-700 text-base lg:text-lg font-medium invalid:border-red-500 peer "
            value={amount}
            onChange={(e) => setAmont(e.target.value)}
          />
          {error.length !== 0 && (
            <span className="transition-all ease-in-out duration-100  text-red-500 absolute -bottom-10 whitespace-nowrap">
              {error}
            </span>
          )}
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
          className="border-2 bg-white cursor-pointer size-10 lg:size-12 rounded-full border-primary text-primary hover:bg-primary hover:text-text-4 p-2.5 flex items-center justify-center"
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

      <div className="flex flex-col md:flex-row items-center gap-8 justify-between w-full md:h-18">
        {loading ? <LoadingSpinner /> : (
          result &&
          result.length !== 0 && (
            <p className="flex flex-col self-start items-start gap-0.5">
              <span className="text-base text-text-2">
                {amount} {originCC.toUpperCase()} Equals to
              </span>

              <span className="text-xl md:text-4xl font-semibold text-slate-800">
                <FormattedResult value={result} /> {destinationCC.toUpperCase()}
              </span>
            </p>
          )
        )}

        <button
          onClick={(e) => handleSubmit(e)}
          className="text-lg font-medium ssjustify-self-end md:ml-auto cursor-pointer text-text-4 hover:opacity-80 bg-primary/90 border border-primary px-4 py-2 w-36 h-10 rounded-md flex items-center justify-center"
        >
          Convert
        </button>
      </div>
    </section>
  );
}

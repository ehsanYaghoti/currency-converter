import React, { useEffect, useState } from "react";
import SelectBox from "./selectbox";

export default function ConverterCard() {
  const [amount, setAmont] = useState("1");
  const [result, setResult] = useState("");
  const [originCC, setOriginCC] = useState("USD");
  const [destinationCC, setDestinationCC] = useState("IRR");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    if (!amountValidation(amount)) {
      setError("please Enter valid amount");
      return;
    } else {
        setError("")
    }

    fetchData(amount).then((resultFixed) => setResult(resultFixed as string));

    setLoading(false);
  }, []);

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

  function amountValidation(value : string) {
    return value.length !== 0 && !isNaN(+value);
  }

  async function fetchData(body : string) {
    try {
      let response = await fetch(
        "https://v6.exchangerate-api.com/v6/a0fb2ec26c49b86c530024d6/latest/USD",
        {
          cache: "force-cache",
          headers: {
            "Cache-Control": "max-age=3600",
          },
        },
      );

      if(!response.ok){
        setLoading(false)
        setError("Some thing is wrong")
      } else {
        setError("")
      }

      const json = await response.json();
      const rates = json.conversion_rates;

      const result = +body * (rates[destinationCC] / rates[originCC]);

      let resultFixed = `${1 * +result.toFixed(7).replace(/\.0+$/, "")}`;
      resultFixed = resultFixed
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d)\.)/g, ",");

      return resultFixed;
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (typeof error === "string") setError(error);
    }
  }

  const handleSubmit = async (
    e:
      | React.SubmitEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setLoading(true);
    if (!amountValidation(amount)) {
      setError("please enter valid amount");
      setResult("");
      setLoading(false);
      return;
    }else {
        setError("")
    }

    const resultFixed = (await fetchData(amount)) as string;

    setResult(resultFixed);
    setLoading(false);
  };

  const inputHandler = async (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    e.preventDefault();

    const value = e.target.value;

    setAmont(value);
    setLoading(true);

    console.log(amountValidation(value));
    if (!amountValidation(value)) {
      setError("please enter valid amount");
      setLoading(false);
      setResult("");
      return;
    } else {
        setError("")
    }

    const resultFixed = (await fetchData(value)) as string;

    setResult(resultFixed);
    setLoading(false);
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
            minLength={2}
            min={0}
            name="amount"
            id="amount"
            placeholder="Enter from here.."
            className="border-b-2 border-black/10 outline-none px-1 py-2 text-slate-700 text-2xl font-medium invalid:border-red-500 peer "
            value={amount}
            onChange={(e) => inputHandler(e)}
          />
          {/* <span className="  invisible  transition-all ease-in-out duration-100 peer-invalid:visible text-red-500 absolute -bottom-10 ">
            Enter only positive number inputs...
          </span> */}
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

      <div className="flex items-center justify-between w-full h-18">
        {loading ? (
          <i className=" size-8 text-text-2 animate-spin flex items-center justify-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </i>
        ) : (
          (result && result.length !== 0 )&& (
            <p className="flex flex-col items-start gap-0.5">
              <span className="text-base text-text-2">
                {amount} {originCC.toUpperCase()} equals to
              </span>

              <span className="text-5xl font-semibold text-text-1">
                {result} {destinationCC.toUpperCase()}
              </span>
            </p>
          )
        )}

        <button
          onClick={(e) => handleSubmit(e)}
          className="text-lg font-medium self-end justify-self-end ml-auto cursor-pointer text-text-4 hover:opacity-80 bg-primary/90 border border-primary px-4 py-2 w-36 h-10 rounded-md flex items-center justify-center"
        >
          Convert
        </button>
      </div>

      {/* <div className="flex flex-col items-start gap-1 text-sm text-slate-500 w-full pt-5 border-t">
        <p className="">1 UAH = 0.03383 USD</p>
        <p className="">1 USD = 29.55874 UAH</p>
      </div> */}
    </section>
  );
}

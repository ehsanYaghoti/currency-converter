import { currency_units } from "../constants/units";

export default function SelectBox({name , value , handler} : {name : string , value : string , handler : (value : string) => void}) {
  return (
    <select
      name={name}
      id={name}
      className="border-b-2 border-black/10 outline-none px-1 py-2 text-slate-700 text-lg w-full min-w-0 font-medium "
      value={value}
      onChange={e => handler(e.target.value)}
    >
      {
        currency_units.map((currency , index) => <option key={index} value={currency[0]}>
            {currency[0]}  -  {currency[1]}
        </option>)
      }
    </select>
  );
}

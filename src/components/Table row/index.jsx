import { useEffect, useState } from "react";
import InputField from "../Input";
import { useTableRowContext } from "../context";

/* eslint-disable react/prop-types */
export default function TableRow(props) {
  const { updateRowData } = useTableRowContext();
  const { removeData } = useTableRowContext();
  const { hidden } = useTableRowContext();
  const { multiplier } = useTableRowContext();
  const [data, setData] = useState({
    part: props.part,
    model: props.model,
    netPrice: props.netPrice,
    quantity: props.quantity,
    link: props.link,
    keyV: props.keyV,
  });

  useEffect(() => {
    updateRowData(props.keyV - 1, {
      ...data,
      grossPrice: (data.netPrice * data.quantity * 1.23).toFixed(2),
      grossPriceWithMarkup: (data.netPrice * data.quantity * 1.23 * multiplier).toFixed(2),
      multiplier: multiplier,
    });
  }, [data, multiplier]);

  const handleRemove = () => {
    removeData(data.keyV);
    props.remove(data.keyV);
  };

  return (
    <tr
      className={`${
        props.classes ? props.classes : ""
      } text-black odd:bg-white even:bg-slate-100 border-b h-10`}
    >
      <td className={`${hidden ? "w-10" : ""} pl-2`}>
        <InputField
          defaultValue={props.part}
          data={data}
          setData={setData}
          placeholder={"Obudowa"}
          dataKey={"part"}
          type={"text"}
        />
      </td>
      <td>
        <InputField
          type={"text"}
          defaultValue={props.model}
          data={data}
          setData={setData}
          placeholder={"Np. Endorfy Signum 300"}
          dataKey={"model"}
        />
      </td>
      <td className={`${hidden ? "hidden" : ""}`}>
        <InputField
          type={"number"}
          defaultValue={props.netPrice}
          data={data}
          setData={setData}
          placeholder={"Np. 512"}
          dataKey={"netPrice"}
        />
      </td>
      <td className={`${hidden ? "hidden" : ""}`}>
        <InputField
          type={"number"}
          defaultValue={props.quantity}
          data={data}
          setData={setData}
          placeholder={"Np. 1"}
          dataKey={"quantity"}
        />
      </td>
      <td className={`${hidden ? "hidden" : ""}`}>
        {data.netPrice && data.quantity
          ? (data.netPrice * data.quantity * 1.23).toFixed(2)
          : (props.netPrice * props.quantity * 1.23).toFixed(2) >= 0
          ? (props.netPrice * props.quantity * 1.23).toFixed(2)
          : 0}
        zł
      </td>
      <td>
        {data.netPrice && data.quantity
          ? (data.netPrice * data.quantity * 1.23 * multiplier).toFixed(2)
          : (props.netPrice * props.quantity * 1.23 * multiplier).toFixed(2) >= 0
          ? (props.netPrice * props.quantity * 1.23 * multiplier).toFixed(2)
          : 0}
        zł
      </td>
      <td className={`${hidden ? "hidden" : ""}`}>
        <input
          defaultValue={data.link}
          onChange={(e) => setData({ ...data, link: e.target.value })}
          placeholder='Link'
          className='w-[95%] border-none focus-visible:outline-none bg-transparent text-slate-300'
        />
        <a href={data.link} target='_blank' className={`text-blue-800 underline`}>
          Przenieś
        </a>
      </td>
      <td className={`${hidden ? "hidden" : ""}`}>
        <button onClick={handleRemove}>Usuń</button>
      </td>
    </tr>
  );
}

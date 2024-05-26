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
    personalMultiplier: props.personalMultiplier,
  });

  useEffect(() => {
    updateRowData(props.keyV, {
      ...data,
      grossPrice: (data.netPrice * data.quantity * 1.23).toFixed(2),
      grossPriceWithMarkup: (
        data.netPrice *
        data.quantity *
        1.23 *
        (data.personalMultiplier > 1 ? data.personalMultiplier : multiplier)
      ).toFixed(2),
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
        {(props.netPrice * props.quantity * 1.23).toFixed(2)} zł
      </td>
      <td>
        {(
          data.netPrice *
          data.quantity *
          1.23 *
          (data.personalMultiplier > 1 ? data.personalMultiplier : multiplier)
        ).toFixed(2)}
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
      <td className={`${hidden ? "hidden" : ""} group`}>
        <div className='hidden group-hover:flex text-wrap absolute top-6  bg-red-500 w-60 h-max p-2 rounded-md rounded-bl-none opacity-0 group-hover:opacity-50 delay-150'>
          Zastępuje główny narzut jeżeli jest wyższy niż 1 (ustaw na 1 żeby nie był brany pod uwagę)
        </div>
        <InputField
          type={"number"}
          defaultValue={props.personalMultiplier}
          data={data}
          setData={setData}
          placeholder={"Np. 1.01"}
          step={"0.01"}
          dataKey={"personalMultiplier"}
        />
      </td>
      <td className={`${hidden ? "hidden" : ""}`}>
        <button onClick={handleRemove}>Usuń</button>
      </td>
    </tr>
  );
}

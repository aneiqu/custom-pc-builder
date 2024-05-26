import { useTableRowContext } from "../context";

/* eslint-disable react/prop-types */
export default function Sum(props) {
  const { rowsData } = useTableRowContext();

  const netPrice = rowsData.reduce((max, obj) => +obj?.netPrice + max, 0);
  const grossPrice = rowsData.reduce((max, obj) => +obj?.grossPrice + max, 0);
  const grossWithMarkup = rowsData.reduce((max, obj) => +obj?.grossPriceWithMarkup + max, 0);

  return (
    <tr className='text-black odd:bg-white even:bg-slate-100 border-b h-10'>
      <td className='pl-2'>Suma</td>
      <td></td>
      <td className={`${props.hidden ? "hidden" : ""}`}>
        {rowsData.length > 0 ? netPrice.toFixed(2) : 0} zł
      </td>
      <td className={`${props.hidden ? "hidden" : ""}`}></td>
      <td className={`${props.hidden ? "hidden" : ""}`}>
        {rowsData.length > 0 ? grossPrice.toFixed(2) : 0} zł
      </td>
      <td>{rowsData.length > 0 ? grossWithMarkup.toFixed(2) : 0} zł</td>
      <td className={`${props.hidden ? "hidden" : ""}`}>
        Zysk: {rowsData.length > 0 ? (grossWithMarkup - grossPrice).toFixed(2) : 0} zł
      </td>
      <td className={`${props.hidden ? "hidden" : ""}`}></td>
      <td className={`${props.hidden ? "hidden" : ""}`}></td>
    </tr>
  );
}

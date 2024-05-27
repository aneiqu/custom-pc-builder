import { useTableRowContext } from "../context";

/* eslint-disable react/prop-types */
export default function Sum(props) {
  const { rowsData } = useTableRowContext();

  const netPrice = rowsData.reduce((max, obj) => +obj?.netPrice + max, 0);
  const grossPrice = rowsData.reduce((max, obj) => +obj?.grossPrice + max, 0);
  const grossPriceWithMarkup = rowsData.reduce((max, obj) => +obj?.grossPriceWithMarkup + max, 0);

  const hidden = props.hidden ? "hidden" : "";
  return (
    <tr className='text-black odd:bg-white even:bg-slate-100 border-b h-10'>
      <td className='pl-2'>Suma</td>
      <td></td>
      <td className={hidden}>{rowsData.length > 0 ? netPrice.toFixed(2) : 0} zł</td>
      <td className={hidden}></td>
      <td className={hidden}>{rowsData.length > 0 ? grossPrice.toFixed(2) : 0} zł</td>
      <td>{rowsData.length > 0 ? grossPriceWithMarkup.toFixed(2) : 0} zł</td>
      <td className={hidden}>
        Zysk: {rowsData.length > 0 ? (grossPriceWithMarkup - grossPrice).toFixed(2) : 0} zł
      </td>
      <td className={hidden}></td>
      <td className={hidden}></td>
    </tr>
  );
}

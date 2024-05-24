import { useTableRowContext } from "../context";

/* eslint-disable react/prop-types */
export default function Sum(props) {
  const { rowsData } = useTableRowContext();

  return (
    <tr className='text-black odd:bg-white even:bg-slate-100 border-b h-10'>
      <td className='pl-2'>Suma</td>
      <td></td>
      <td className={`${props.hidden ? "hidden" : ""}`}>
        {rowsData.length > 0
          ? rowsData.reduce((max, obj) => +obj?.netPrice + max, 0) >= 0
            ? rowsData.reduce((max, obj) => +obj?.netPrice + max, 0).toFixed(2) + " zł"
            : `0 zł`
          : ""}
      </td>
      <td className={`${props.hidden ? "hidden" : ""}`}></td>
      <td className={`${props.hidden ? "hidden" : ""}`}>
        {rowsData.length > 0
          ? rowsData.reduce((max, obj) => +obj?.grossPrice + max, 0) >= 0
            ? rowsData.reduce((max, obj) => +obj?.grossPrice + max, 0).toFixed(2) + " zł"
            : `0 zł`
          : ""}
      </td>
      <td>
        {rowsData.length > 0
          ? rowsData.reduce((max, obj) => +obj?.grossPriceWithMarkup + max, 0) >= 0
            ? rowsData.reduce((max, obj) => +obj?.grossPriceWithMarkup + max, 0).toFixed(2) + " zł"
            : `0 zł`
          : ""}
      </td>
      <td className={`${props.hidden ? "hidden" : ""}`}></td>
      <td className={`${props.hidden ? "hidden" : ""}`}></td>
      <td className={`${props.hidden ? "hidden" : ""}`}></td>
    </tr>
  );
}

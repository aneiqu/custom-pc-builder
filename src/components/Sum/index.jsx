import { useTableRowContext } from "../context";

/* eslint-disable react/prop-types */
export default function Sum(props) {
  // console.log(props);
  const { rowsData } = useTableRowContext();
  return (
    <tr>
      <td>Suma</td>
      <td></td>
      <td className={`${props.hidden ? "hidden" : ""}`}>
        {rowsData.length > 0
          ? rowsData.reduce((max, obj) => +obj.netPrice + max, 0).toFixed(2)
          : ""}
      </td>
      <td className={`${props.hidden ? "hidden" : ""}`}></td>
      <td className={`${props.hidden ? "hidden" : ""}`}>
        {rowsData.length > 0
          ? rowsData.reduce((max, obj) => +obj.grossPrice + max, 0).toFixed(2)
          : ""}
      </td>
      <td>
        {rowsData.length > 0
          ? rowsData.reduce((max, obj) => +obj.grossPriceWithMarkup + max, 0).toFixed(2)
          : ""}
      </td>
    </tr>
  );
}

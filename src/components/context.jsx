/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const TableRowContext = createContext();

export const useTableRowContext = () => useContext(TableRowContext);

export const TableRowProvider = (props) => {
  const [rowsData, setRowsData] = useState([]);
  const [hidden, setHidden] = useState(true);

  const updateRowData = (index, data) => {
    setRowsData((prevData) => {
      const newData = [...prevData];
      newData[index] = data;
      return newData;
    });
  };

  const removeData = (keyV) => {
    setRowsData((prevData) => {
      const newData = prevData.filter((el) => el.keyV !== keyV);
      return newData;
    });
  };

  const toggleHide = () => {
    setHidden(!hidden);
  };
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(rowsData)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  return (
    <TableRowContext.Provider
      value={{
        rowsData,
        updateRowData,
        removeData,
        toggleHide,
        hidden: props.hidden,
        multiplier: props.multiplier,
      }}
    >
      <button
        className='bg-gradient-to-br m-2 border-2 border-slate-700 rounded-md p-2 active:translate-y-1 active:shadow-none  shadow-sm shadow-slate-500 duration-150'
        onClick={exportData}
      >
        Pobierz
      </button>
      {props.children}
    </TableRowContext.Provider>
  );
};

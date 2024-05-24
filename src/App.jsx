import { useEffect, useState } from "react";
import Sum from "./components/Sum";
import TableRow from "./components/Table row";
import { TableRowProvider } from "./components/context";

function App() {
  const [multiplier, setMultiplier] = useState(1);
  const [hiddenMode, setHiddenMode] = useState(false);
  const [data, setData] = useState("[]");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const objects = JSON.parse(data);
    if (objects.length > 1) {
      setMultiplier(
        +objects.reduce((max, obj) => (obj.multiplier > max ? obj.multiplier : max), 0) > 1
          ? +objects.reduce((max, obj) => (obj.multiplier > max ? obj.multiplier : max), 0)
          : multiplier
      );
    }
    setRows(
      JSON.parse(data).map((el) => {
        return (
          <TableRow
            part={el?.part}
            model={el?.model}
            netPrice={el?.netPrice ? el.netPrice : 0}
            quantity={el?.quantity ? el.quantity : 0}
            personalMultiplier={el?.personalMultiplier}
            link={el?.link}
            keyV={el.keyV}
            key={el.keyV}
            remove={removeRow}
          />
        );
      })
    );
  }, [data]);

  useEffect(() => {
    // console.log(data);
  }, [data]);

  const removeRow = (keyV) => {
    setData((prev) => JSON.stringify(JSON.parse(prev).filter((el) => el.keyV !== keyV)));
  };
  const toggleVisibility = () => {
    setHiddenMode(!hiddenMode);
  };

  const addNewRow = () => {
    setData((prev) => {
      const highestKey = JSON.parse(data).reduce((max, obj) => {
        return obj.keyV > max ? obj.keyV : max;
      }, -1);
      return JSON.stringify(
        JSON.parse(prev).concat([
          {
            keyV: highestKey >= 0 ? highestKey + 1 : 0,
          },
        ])
      );
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        JSON.parse(content).map((el) => {
          setData((prev) =>
            JSON.stringify(
              JSON.parse(prev).concat([
                {
                  ...el,
                  keyV: JSON.parse(prev).reduce((max, obj) => {
                    return (obj.keyV > max ? obj.keyV : max) + 1;
                  }, 0),
                },
              ])
            )
          );
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className='h-screen w-screen bg-gradient-to-br from-gray-800 to-slate-900 text-white'>
      <TableRowProvider hidden={hiddenMode} multiplier={multiplier}>
        <div className='flex flex-row space-x-4 items-center'>
          <button
            className='bg-gradient-to-br border-2 border-slate-700 rounded-md p-2 ml-2 active:translate-y-1 active:shadow-none  shadow-sm shadow-slate-500 duration-150'
            onClick={addNewRow}
          >
            Dodaj
          </button>

          <span className='active:translate-y-1 duration-150'>
            <label
              htmlFor='upload'
              className='bg-gradient-to-br border-2 p-3 rounded-md border-slate-700 cursor-pointer active:translate-y-1 active:shadow-none  shadow-sm shadow-slate-500 '
            >
              Importuj
            </label>
            <input id='upload' type='file' onChange={handleFileChange} className='hidden'></input>
          </span>
          <button
            className='bg-gradient-to-br border-2 border-slate-700 rounded-md p-2 active:translate-y-1 active:shadow-none  shadow-sm shadow-slate-500 duration-150'
            onClick={toggleVisibility}
          >
            Przełącz tryb widoczności
          </button>
          <span className='bg-gradient-to-br flex border-2 border-slate-700 p-2 w-36 rounded-md active:translate-y-1 active:shadow-none  shadow-sm shadow-slate-500 duration-150'>
            <label>Narzut: </label>
            <input
              value={multiplier}
              onChange={(e) => setMultiplier(e.target.value)}
              type='number'
              min={1}
              step={0.01}
              className='pl-1 focus-visible:outline-none w-2/4 bg-transparent'
            />
          </span>
        </div>

        <div>
          <table className={`${hiddenMode ? "w-1/2" : ""} mt-2 table-fixed w-full TABELA`}>
            <thead>
              <tr className='text-left text-black uppercase bg-slate-100 h-14'>
                <th className={`${hiddenMode ? "w-1/4" : ""} pl-2`}>Część</th>
                <th className={`${hiddenMode ? "w-2/4" : ""}`}>Model</th>
                <th className={hiddenMode ? "hidden" : ""}>Cena netto</th>
                <th className={hiddenMode ? "hidden" : ""}>Ilość</th>
                <th className={hiddenMode ? "hidden" : ""}>Cena brutto</th>
                <th>{hiddenMode ? "Cena brutto" : "Cena brutto z narzutem"}</th>
                <th className={hiddenMode ? "hidden" : ""}>Link</th>
                <th className={hiddenMode ? "hidden" : ""}>Osobisty narzut</th>
                <th className={hiddenMode ? "hidden" : ""}></th>
              </tr>
            </thead>
            <tbody>
              {rows}
              <Sum data={data} hidden={hiddenMode} />
            </tbody>
          </table>
        </div>
      </TableRowProvider>
    </div>
  );
}

export default App;

import './App.css';
import Sidebar from './components/Sidebar';
import ExcelViewer from './components/ExcelViewer';
import * as XLSX from 'xlsx'
import { useState } from 'react';
import { StateProvider } from './StateProvider';
import reducer, { initialState } from './reducer';


function App() {

  const [sheet, setSheet] = useState([])
  const [fileName, setFileName] = useState('')
  const [columns, setColumns] = useState([])

  const openFileDialog = () => {
    document.getElementById('excelInput').click();
  }

  return (
    <StateProvider value={initialState} reducer={reducer}>
      <div className="app">
      <header>
        <div className="header-inputFile">
          <input id="excelInput" onChange={(e) => {
            e.preventDefault();
            let files = e.target.files, f = files[0];
            setFileName(f.name);
            let reader = new FileReader();
            reader.onload = function (e) {
              let data = e.target.result;
              let readedData = XLSX.read(data, { type: 'binary' });
              const wsname = readedData.SheetNames[0];
              const ws = readedData.Sheets[wsname];
              const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });

              setTimeout(() => {
                setSheet(dataParse);
                setColumns(dataParse[0]);
              }, 500);

            };
            reader.readAsBinaryString(f)
          }} className="header-inputFile-button" type="file" accept=".xlsx" />
        </div>

        <div className="header-customInput">
          <span>{fileName === '' ? 'No file selected.' : fileName}</span>
          <button onClick={openFileDialog}>Import Sheet</button>
        </div>
      </header>
      <Sidebar columns={columns} />
      <ExcelViewer sheet={sheet} />
    </div>
    </StateProvider>
  );
}

export default App;

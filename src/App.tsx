import { useState, useEffect, useRef } from 'react'
//import './App.css'

import { RemoteFile } from 'generic-filehandle'
import Sequences from "./components/Sequences";
import { accessFasta } from "./accessFasta";
import Select from 'react-select';
import {Buffer} from 'buffer';

window.Buffer = Buffer

function App() {
  // using useState for the text area causes it to fire for every keystroke
  //const [locations, setLocations] = useState('II:1..100\nV:100000..110000');
  var initialLocations = '';
  const ref = useRef(null);
  const [locations, setLocations] = useState(initialLocations);
  const [assembly,  setAssembly]  = useState('c_elegans.PRJNA13758');
  const [result,    setResult]    = useState('');
  const [error,     setError]     = useState('');
  const options = [
    { value: 'c_elegans.PRJNA13758', label: 'c_elegans N2' },
    { value: 'b_malayi.PRJNA10729', label: 'b_malayi.PRJNA10729' },
    { value: 'c_angaria.PRJNA51225', label: 'c_angaria.PRJNA51225' },
    { value: 'c_becei.PRJEB28243', label: 'c_becei.PRJEB28243' },
    { value: 'c_bovis.PRJEB34497', label: 'c_bovis.PRJEB34497' },
    { value: 'c_brenneri.PRJNA20035', label: 'c_brenneri.PRJNA20035' },
    { value: 'c_briggsae.PRJNA10731', label: 'c_briggsae.PRJNA10731' },
    { value: 'c_elegans.PRJEB28388', label: 'c_elegans.PRJEB28388' },
    { value: 'c_elegans.PRJNA275000', label: 'c_elegans.PRJNA275000' },
    { value: 'c_inopinata.PRJDB5687', label: 'c_inopinata.PRJDB5687' },
    { value: 'c_japonica.PRJNA12591', label: 'c_japonica.PRJNA12591' },
    { value: 'c_latens.PRJNA248912', label: 'c_latens.PRJNA248912' },
    { value: 'c_nigoni.PRJNA384657', label: 'c_nigoni.PRJNA384657' },
    { value: 'c_panamensis.PRJEB28259', label: 'c_panamensis.PRJEB28259' },
    { value: 'c_parvicauda.PRJEB12595', label: 'c_parvicauda.PRJEB12595' },
    { value: 'c_quiockensis.PRJEB11354', label: 'c_quiockensis.PRJEB11354' },
    { value: 'c_remanei.PRJNA53967', label: 'c_remanei.PRJNA53967' },
    { value: 'c_remanei.PRJNA577507', label: 'c_remanei.PRJNA577507' },
    { value: 'c_sinica.PRJNA194557', label: 'c_sinica.PRJNA194557' },
    { value: 'c_sulstoni.PRJEB12601', label: 'c_sulstoni.PRJEB12601' },
    { value: 'c_tribulationis.PRJEB12608', label: 'c_tribulationis.PRJEB12608' },
    { value: 'c_tropicalis.PRJNA53597', label: 'c_tropicalis.PRJNA53597' },
    { value: 'c_uteleia.PRJEB12600', label: 'c_uteleia.PRJEB12600' },
    { value: 'c_waitukubuli.PRJEB12602', label: 'c_waitukubuli.PRJEB12602' },
    { value: 'c_zanzibari.PRJEB12596', label: 'c_zanzibari.PRJEB12596' },
    { value: 'o_tipulae.PRJEB15512', label: 'o_tipulae.PRJEB15512' },
    { value: 'o_volvulus.PRJEB513', label: 'o_volvulus.PRJEB513' },
    { value: 'p_pacificus.PRJNA12644', label: 'p_pacificus.PRJNA12644' },
    { value: 'p_redivivus.PRJNA186477', label: 'p_redivivus.PRJNA186477' },
    { value: 's_ratti.PRJEB125', label: 's_ratti.PRJEB125' },
    { value: 't_muris.PRJEB126', label: 't_muris.PRJEB126' },
  ];

  const handleAssembly = (selectedAssembly) => {
    setAssembly(selectedAssembly);
  }

  useEffect(() => {
    (async () => {
      try {
        const ass = typeof assembly.value === 'undefined' ? 'c_elegans.PRJNA13758' : assembly.value
        const fastaurl = 'https://s3.amazonaws.com/wormbase-modencode/fasta/current/' + ass + '.WS284.genomic.fa.gz';
        const res = await accessFasta(
          fastaurl,
          locations,  
        );
        setResult(res);
      } catch (e) {
        console.error(e);
        setError(e);
      }
    })();
  }, [
    locations,
    assembly
  ]);

  if (error) {
    return <div style={{ color: "red" }}>{`${error}`}</div>;
  } else if (!result) {
    return <div>Loading...</div>;
  } else {
    return (
    <>
      <h2>Fetch worm sequences</h2>
      <div>
        Assembly:
          <Select onChange={handleAssembly}
            name='assembly'
            options={options}
            defaultOption={options[0]}
          />
        <p>Locations: </p>
        <textarea 
               ref={ref}
               name="locs" 
               defaultValue={locations}
               rows="10" 
               cols="30">
        </textarea>
        <p>Locations should look like "II:300..500"</p>
        <button label="getSequences" onClick={() => {setLocations(ref.current.value)}} >
           get sequences
        </button>

        <textarea id="results" cols="70" rows="20" defaultValue={result.fasta}>
        </textarea>
        
      </div>
    </>
    )
  }
}

export default App

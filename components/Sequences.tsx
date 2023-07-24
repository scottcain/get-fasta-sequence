// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from "react";
import { accessFasta } from "../accessFasta";

export default function Sequences({
  assembly,
  locations
}: {
  assembly: string;
  locations: string; 
}) {
  const [result, setResult] = useState<unknown>();
  const [error, setError] = useState<unknown>();

  const fastaurl = 'https://s3.amazonaws.com/wormbase-modencode/fasta/current/' + assembly + '.WS284.genomic.fa.gz';

  const sequence = '';

  //console.log(locations);

  useEffect(() => {
    (async () => {
      try {
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
    fastaurl,
    locations,
  ]);

  if (error) {
    return <div style={{ color: "red" }}>{`${error}`}</div>;
  } else if (!result) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="Sequences">
        <textarea id="results" cols="70" rows="40">
{result.fasta}
        </textarea>
      </div>
    );
  }
}

import { RemoteFile } from "generic-filehandle";
import { BgzipIndexedFasta } from "@gmod/indexedfasta";

export async function accessFasta(
    fastaurl: string,
    locations: string,
) {

  const fastaFilehandle = new RemoteFile(fastaurl);
  const faiFilehandle = new RemoteFile(fastaurl + ".fai");
  const gziFilehandle = new RemoteFile(fastaurl + ".gzi");

  const t = new BgzipIndexedFasta({
    fasta: fastaFilehandle,
    fai: faiFilehandle,
    gzi: gziFilehandle,
    chunkSizeLimit: 500000,
  });


  const locs = locations.split("\n");

  console.log(locs);

  let results='';
  for (const row of locs) {
    if (row.length == 0) {break}
    const tmp = row.split(":");
    const refseq = tmp[0];
    const tmp2 = tmp[1].split("..");
    const start = tmp2[0]-1; //interbase coords, right?
    const end = tmp2[1];

    const seq = await t.getResiduesByName(refseq, start, end);

    const fasta = ">" +row+ "\n" +seq+ "\n";
   
    results = results+fasta;
  }


  return {
    fasta: results,
  };
}

# get-fasta-sequence

At the moment, this is a simple web app that takes as inputs a list of genomic locations and a dropdown to select a genomic assembly from those available at WormBase, and on submit, fetches the sequences from bgzipped fasta sequences that are hosted on AWS S3. The plan is to make this a more generic tool that could be configured to point at any collection of fasta sequences. 

A demo instance is running on https://scottcain.github.io/get-fasta-sequence/

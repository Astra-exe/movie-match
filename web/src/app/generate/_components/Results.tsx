interface ResultsProps {
  results: any;
}

export default function Results({ results }: ResultsProps) {
  return (
    <div>
      <h2>Results</h2>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}

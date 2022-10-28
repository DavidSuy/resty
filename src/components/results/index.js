export default function Results(props) {
  return (
    <section>
      <h2>Results</h2>
      <pre>{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
    </section>
  );
}

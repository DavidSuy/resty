export default function History(props) {
  let list = props.history.map((el, idx) => (
    <li
      key={idx}
      onClick={() => props.handleHistoryClick(idx)}
    >{`${el.method}: ${el.url}`}</li>
  ));
  return (
    // <section>
    //   <pre>{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
    // </section>
    <>
      <h2>History</h2>
      <ul>{list}</ul>
    </>
  );
}

import { useRef, useState } from "react";
import { add } from "date-fns";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import "./style.scss";
import { Header } from "../../components/Header";
import { Container } from "../../components/Container";
import { Flex } from "../../components/Flex";
import { Animated } from "react-animated-css";

const KEY_ENTER = "Enter";

function shuffle(array) {
  return [...array]
    .sort(() => Math.random() - 0.5)
    .sort(() => Math.random() - 0.5)
    .sort(() => Math.random() - 0.5)
    .sort(() => Math.random() - 0.5);
}

function Form({ handleSubmit, initialNames, initialDate }) {
  const inputRef = useRef();
  const [names, setNames] = useState(initialNames);
  const [name, setName] = useState("");
  const [date, setDate] = useState(initialDate);

  function addName() {
    if (!name.trim()) {
      return;
    }

    setNames((n) => [...n, name.trim()]);
    setName("");

    inputRef.current.focus();
  }

  return (
    <>
      <Flex alignItems="flex-end" gap={10}>
        <Input
          label="Nome"
          value={name}
          inputRef={inputRef}
          onChange={(event) => setName(event.target.value)}
          onKeyUp={(event) => event.key === KEY_ENTER && addName()}
        />

        <Button onClick={addName}>Adicionar</Button>
      </Flex>

      <Input
        label="Mês de início"
        type="month"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <Button onClick={() => handleSubmit(names, date)}>Sortear</Button>

      <h2>Nomes</h2>

      <ul className="list-names">
        {names.map((n, index) => (
          <li key={index}>
            {n}
            <Button
              onClick={() => {
                setNames((n) => [
                  ...n.slice(0, index),
                  ...n.slice(index + 1, n.length),
                ]);
              }}
            >
              Remover
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}

function Dates({ dates, onBack }) {
  return (
    <>
      <ul className="list">
        {dates.map((data, index) => (
          <li key={index} className="card">
            <div className="card__content">
              <strong>
                {index + 1} - {data.name}
              </strong>

              <span>
                {data.date.toLocaleString("pt-br", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <br />
      <br />

      <Button onClick={onBack}>Voltar</Button>
    </>
  );
}

export function Home() {
  const [old, setOld] = useState({
    initialNames: [],
    initialDate: "",
  });
  const [dates, setDates] = useState([]);

  function handleSubmit(names, date) {
    const initialDate = new Date(date.split("-"));
    const shuffledNames = shuffle(names);

    setOld({
      initialNames: names,
      initialDate: date,
    });
    setDates([
      ...shuffledNames.map((n, index) => ({
        date: add(initialDate, {
          months: index,
        }),
        name: n,
      })),
    ]);
  }

  return (
    <>
      <Header />

      <Container>
        <Flex gap={20} direction="column">
          {!dates.length && <Form {...old} handleSubmit={handleSubmit} />}

          {!!dates.length && (
            <Animated animationIn="fadeIn" isVisible={!!dates.length}>
              <Dates dates={dates} onBack={() => setDates([])} />
            </Animated>
          )}
        </Flex>
      </Container>
    </>
  );
}

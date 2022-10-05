import { useState } from "react";
import { add } from "date-fns";
import { Header } from "../../components/Header";
import { Animated } from "react-animated-css";

function shuffle(array) {
  // return [...array]
  //   .sort(() => Math.random() - 0.5)
  //   .sort(() => Math.random() - 0.5)
  //   .sort(() => Math.random() - 0.5)
  //   .sort(() => Math.random() - 0.5);

  let newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }

  return newArray;
}

function Form({ handleSubmit, initialNames, initialDate }) {
  const [names, setNames] = useState(initialNames);
  const [date, setDate] = useState(initialDate);

  return (
    <>
      <label className="flex flex-col w-full">
        Nomes
        <textarea
          rows="10"
          className="
            w-full 
            shadow-sm
            outline-none
            border
            border-solid
            focus:border-indigo-500 
            border-gray-300 
            rounded-md
            mt-1
            p-4 
            min-h-[20rem]
          "
          value={names}
          onChange={(event) => setNames(event.target.value)}
        />
      </label>

      <label className="flex flex-col w-full">
        Mês de início
        <input
          className="
            w-full 
            h-12
            shadow-sm
            outline-none
            border
            border-solid
            focus:border-indigo-500 
            border-gray-300 
            rounded-md
            mt-1 
            p-4
          "
          type="month"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>

      <button
        onClick={() => handleSubmit(names, date)}
        className="
          flex
          justify-center
          items-center
          w-full 
          h-12
          shadow-md
          outline-none
          focus:bg-indigo-600
          active:bg-indigo-400
          border-gray-300 
          bg-indigo-500
          text-white
          rounded-md
          mt-1 
          p-4
        "
      >
        Sortear
      </button>
    </>
  );
}

function Dates({ dates, onBack }) {
  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dates.map((data, index) => (
          <li className="w-full rounded-lg border border-gray-200 shadow-md flex flex-col items-center p-6 relative">
            <span className="absolute top-5 left-5 text-indigo-500 font-bold">
              {index + 1}
            </span>

            <h5 className="mb-1 text-2xl font-medium text-gray-900 ">
              {data.name}
            </h5>

            <span className="text-md">
              {data.date.toLocaleString("pt-br", {
                year: "numeric",
                month: "long",
              })}
            </span>
          </li>
        ))}
      </ul>
      {/* <ul className="list">
        {dates.map((data, index) => (
          <li key={index} className="card">
            <div className="card__content">
              <strong>
                {index + 1} - {data.name}
              </strong>

              <span>
                
              </span>
            </div>
          </li>
        ))}
      </ul> */}

      <br />
      <br />

      <button onClick={onBack}>Voltar</button>
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
    const shuffledNames = shuffle(
      names
        .split(/[\n,]/)
        .map((s) => s.trim())
        .filter((s) => s)
    );

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

      <div className="container w-full flex mx-auto pt-40">
        <div className="w-full p-8 mt-6 bg-white border shadow-md">
          <div className="flex flex-col gap-5">
            {!dates.length && <Form {...old} handleSubmit={handleSubmit} />}

            {!!dates.length && (
              <Animated animationIn="fadeIn" isVisible={!!dates.length}>
                <Dates dates={dates} onBack={() => setDates([])} />
              </Animated>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";

function StartScreen({ numQuestions, dispatch }) {
  const [draft, setDraft] = useState(1);

  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <p>Test your React mastery</p>
      <p for="mode">Select mode</p>
      <form
        onChange={(e) =>
          dispatch({ type: "changeMode", payload: e.target.value })
        }
      >
        <label>
          <input type="radio" name="mode" value="normal" />
          <span>Normal</span>
        </label>

        <label>
          <input type="radio" name="mode" value="easy" />
          <span>Easy</span>
        </label>

        <label>
          <input type="radio" name="mode" value="medium" />
          <span>Medium</span>
        </label>

        <label>
          <input type="radio" name="mode" value="hard" />
          <span>Hard</span>
        </label>
      </form>
      <label for="questions-limit">
        How many questions do you want? –
        {numQuestions ? ` 1 - ${numQuestions}` : " Select a mode"}
      </label>
      <input
        id="questions-limit"
        type="number"
        min="1"
        max={numQuestions}
        onChange={(e) => setDraft(Number(e.target.value))}
      />
      <br />
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start", payload: draft })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;

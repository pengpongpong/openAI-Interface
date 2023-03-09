import { useState, useRef, useEffect } from "react";
import { SSE } from "sse";

function StreamDaVinci() {
  let [prompt, setPrompt] = useState("");
  let [result, setResult] = useState("");

  const resultRef = useRef();

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  let handleSubmitPromptBtnClicked = async (e) => {
    e.preventDefault();
    if (prompt !== "") {
      setResult("");
      let url = "https://api.openai.com/v1/completions";
      let data = {
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.75,
        top_p: 0.95,
        max_tokens: 100,
        stream: true,
        n: 1,
      };
      console.log(data);
      let source = new SSE(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        method: "POST",
        payload: JSON.stringify(data),
      });

      source.addEventListener("message", (e) => {
        if (e.data !== "[DONE]") {
          let payload = JSON.parse(e.data);
          let text = payload.choices[0].text;
          if (text !== "\n") {
            resultRef.current = resultRef.current + text;
            setResult(resultRef.current);
          }
        } else {
          source.close();
          console.log("close");
        }
      });

      source.addEventListener("readystatechange", (e) => {
        if (e.readyState >= 2) {
          console.log("readystate");
        }
      });

      source.stream();
    } else {
      alert("Please insert a prompt!");
    }
  };

  let handleClearBtnClicked = () => {
    setPrompt("");
    setResult("");
  };

  let handlePromptChange = (e) => {
    e.preventDefault();
    setPrompt(e.target.value);
  };
  return (
    <section>
      <form>
        <h3>text-stream-davinci-003</h3>
        <textarea
          type="text"
          name="query"
          placeholder="enter query"
          value={prompt}
          onChange={handlePromptChange}
        ></textarea>
        <input
          className="submitButton"
          type="submit"
          defaultValue="Generate query"
          onClick={handleSubmitPromptBtnClicked}
        />
        <input
          className="submitButton"
          defaultValue="Clear"
          onClick={handleClearBtnClicked}
        />
        <p>{result}</p>
      </form>
    </section>
  );
}

export default StreamDaVinci;

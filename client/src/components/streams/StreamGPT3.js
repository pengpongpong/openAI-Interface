import { useDispatch } from "react-redux";
import React, { useState, useRef } from "react";
import classNames from "classnames";
import { saveGPTStream } from "../../actions/streams/streamActions";
import { resetChatData } from "../../actions/types";
import { SSE } from "sse";

function StreamGPT3() {
  const [removeActive, setRemoveActive] = useState(true);
  const [removeResultBox, setRemoveResultBox] = useState(true);
  const [settingAI, setSettingAI] = useState("");
  const [userInput, setUserInput] = useState("");
  const [inputFields, setInputFields] = useState([]);
  const [result, setResult] = useState("");
  const resultRef = useRef("");
  const allChat = useRef([]);
  const dispatch = useDispatch();

  const handleFormChange = (index, event) => {
    let data = [...inputFields];

    if (event.target.name === "assistant") {
      data[index][event.target.name] = event.target.value;
      setInputFields(data);
    }
    if (event.target.name === "user") {
      data[index][event.target.name] = event.target.value;
      setInputFields(data);
    }
  };

  // save to local storage
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("ChatState", serializedState);
    } catch (e) {
      console.log(e);
    }
  };

  // load last chat from locale storage
  if (localStorage.ChatState && !allChat.current.length) {
    const loadState = () => {
      try {
        const serializedState = localStorage.getItem("ChatState");
        if (serializedState === null) {
          return undefined;
        }
        return JSON.parse(serializedState);
      } catch (e) {
        return undefined;
      }
    };
    const loadedState = loadState();
    allChat.current = loadedState;
  }

  // reset chat state & localeStorage
  const resetLocalStorage = (e) => {
    e.preventDefault();
    setRemoveResultBox(true);
    localStorage.setItem("ChatState", "");
    dispatch(resetChatData());
    window.location.reload(true);
  };

  // submit new chat with additional interaction inputs
  const onSubmitChat = (e) => {
    e.preventDefault();
    const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
    let url = "https://api.openai.com/v1/chat/completions";
    let current_date = new Date().toUTCString();
    setResult("");
    resultRef.current = "";

    // get previous chats from state
    let prevChatArr = [];

    if (allChat.current.length) {
      prevChatArr = allChat.current;
    }

    // get value from form input and format
    const interactionsInput = inputFields.map((obj, i) => {
      if (i % 2 === 0) {
        return { role: "assistant", content: obj.assistant };
      } else {
        return { role: "user", content: obj.user };
      }
    });

    const firstUserInput = {
      role: "user",
      content: userInput,
    };

    // first user input + interactions
    const interactions = [...prevChatArr, firstUserInput, ...interactionsInput];

    const setting =
      settingAI !== ""
        ? {
            role: "system",
            content: settingAI,
          }
        : {
            role: "system",
            content: `You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible. Current date: ${current_date}`,
          };

    let messageData = [setting].concat(interactions);
    console.log("messageData", messageData);

    let data = {
      model: "gpt-3.5-turbo-0301",
      messages: messageData,
      temperature: 0.75,
      top_p: 0.95,
      max_tokens: 1000,
      stream: true,
      n: 1,
    };

    let source = new SSE(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      method: "POST",
      payload: JSON.stringify(data),
    });

    source.addEventListener("message", (e) => {
      setRemoveResultBox(false);
      if (e.data !== "[DONE]") {
        let payload = JSON.parse(e.data);
        let text = payload.choices[0].delta.content;
        if (text !== "\n") {
          // console.log("Text: " + text);
          if (text !== undefined) {
            resultRef.current = resultRef.current + text;
            setResult(resultRef.current);
          }
        }
      } else {
        source.close();
      }
    });

    source.addEventListener("readystatechange", (e) => {
      if (e.readyState === 2) {
        const streamData = { roles: messageData, result: resultRef.current };
        const chatResults = [
          ...messageData,
          { role: "assistant", content: resultRef.current },
        ];
        allChat.current = chatResults;
        saveState(chatResults);
        dispatch(saveGPTStream(streamData));
        setUserInput("");
      }
    });

    source.stream();
  };

  // handle change settings
  const handleChangeSettings = (e) => {
    setSettingAI(e.target.value);
  };

  // handle change first user input
  const handleChangeUser = (e) => {
    setUserInput(e.target.value);
  };

  // add interaction
  const addInteraction = (e) => {
    e.preventDefault();
    let newUserInput = { user: "" };
    let newAIInput = { assistant: "" };

    if (inputFields.length % 2 === 0) {
      setInputFields([...inputFields, newAIInput]);
    } else {
      setInputFields([...inputFields, newUserInput]);
    }

    setRemoveActive(false);
  };

  // remove interaction
  const removeInteraction = (e) => {
    e.preventDefault();
    let data = [...inputFields];

    if (inputFields.length === 1) {
      data.splice(data.length - 1, 1);
      setInputFields(data);
      setRemoveActive(true);
    }
    if (inputFields.length > 1) {
      data.splice(data.length - 1, 1);
      setInputFields(data);
    }
  };

  // disable remove add-new-interaction when no additional fields
  const removeInteractionActive = classNames(
    { "submitButton inactive": removeActive },
    { submitButton: !removeActive }
  );

  // disable result box when reset or no result
  const showResults = classNames(
    { "stream inactive": removeResultBox },
    { stream: !removeResultBox }
  );

  return (
    <form id="addnewChat" onSubmit={onSubmitChat}>
      <h3>gpt-3.5-turbo-0301 with AI settings user assistant - Stream</h3>
      <fieldset>
        <textarea
          type="text"
          name="settings"
          placeholder="Define AI setting or leave blank for default: You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible."
          onChange={handleChangeSettings}
        />
        <label htmlFor="settings">Define system settings</label>
      </fieldset>
      <fieldset>
        <textarea
          type="text"
          name="userinteraction"
          placeholder="User interaction"
          value={userInput}
          onChange={handleChangeUser}
        />
        <label htmlFor="userinteraction">User interaction</label>
      </fieldset>
      {inputFields.map((input, index) => {
        if (index % 2 === 0) {
          return (
            <fieldset key={index}>
              <textarea
                type="text"
                name="assistant"
                placeholder="Assistant"
                value={input.assistant}
                onChange={(event) => handleFormChange(index, event)}
              />
              <label htmlFor="assistant">Assistant interaction</label>
            </fieldset>
          );
        } else {
          return (
            <fieldset key={index}>
              <textarea
                type="text"
                name="user"
                placeholder="User"
                value={input.user}
                onChange={(event) => handleFormChange(index, event)}
              />
              <label htmlFor="user">User interaction</label>
            </fieldset>
          );
        }
      })}
      <div className="buttons">
        <button className="submitButton" type="submit">
          submit chat
        </button>
        <button className="submitButton" onClick={addInteraction}>
          add new interaction
        </button>
        <button className={removeInteractionActive} onClick={removeInteraction}>
          remove interaction
        </button>
        <button className="submitButton" onClick={resetLocalStorage}>
          Reset chat
        </button>
      </div>
      <p className={showResults}>{result}</p>
      <ul className="result">
        {allChat.current
          .map((chat, i) => {
            if (chat.role === "user") {
              return (
                <li key={i}>
                  <p className="user">
                    <span className="chatName">user:</span> {chat.content}
                  </p>
                </li>
              );
            } else if (chat.role === "assistant") {
              return (
                <li key={i}>
                  <p className="assistant">
                    <span className="chatName">assistant:</span> {chat.content}
                  </p>
                </li>
              );
            }
            return "";
          })
          .reverse()}
      </ul>
    </form>
  );
}

export default StreamGPT3;

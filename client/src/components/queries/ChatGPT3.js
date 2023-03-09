import { useDispatch, useSelector } from "react-redux";
import React, { useState, useRef } from "react";
import classNames from "classnames";
import { getChat, setChatData, resetChatData } from "../../actions/queries/queryActions";

function ChatGPT3() {
  const chatData = useSelector((x) => x.chat);
  const [inputItem, setInputItem] = useState([]);
  const [removeActive, setRemoveActive] = useState(true);
  const dispatch = useDispatch();
  const settingAI = useRef();
  const form = useRef();

  // load last chat from locale storage
  if (localStorage.ChatState && !chatData.length) {
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
    dispatch(setChatData(...loadedState));
  }

  //   reset chat state & localeStorage
  const resetLocalStorage = (e) => {
    e.preventDefault();
    localStorage.setItem("ChatState", "");
    dispatch(resetChatData());
    window.location.reload(true);
  };

  // submit new chat with additional interaction inputs
  const onSubmitChat = (e) => {
    e.preventDefault();
    let prevChatArr = [];

    // get previous chats
    if (chatData) {
      chatData
        .map((obj, i) => {
          return [
            { role: "user", content: obj.user },
            { role: "assistant", content: obj.assistant },
          ];
        })
        .map((obj) => {
          return prevChatArr.push(...obj);
        });
    }

    // get value from form input and format
    const formArray = Array.from(form.current);
    let num = formArray.length - 3;
    let textArr = formArray.slice(1, num);

    let filterTextElement = [
      textArr[0],
      ...textArr.slice(2, textArr.length - 1),
    ]
      .map((obj, i) => {
        if (obj.value) {
          if (i % 2 === 0) {
            return {
              role: "assistant",
              content: obj.value,
            };
          } else {
            return {
              role: "user",
              content: obj.value,
            };
          }
        } else {
          return null;
        }
      })
      .filter((obj) => obj !== null);

    const allChats = prevChatArr.concat(filterTextElement);

    // dispatch and get result
    if (allChats) {
      // console.log({
      //   settings: settingAI.current.value,
      //   roles: allChats,
      // });
      dispatch(getChat({ settings: settingAI.current.value, roles: allChats }));
      form.current.reset();
    }
  };

  // add interaction
  const addInteraction = (e) => {
    e.preventDefault();
    setRemoveActive(false);
    if (inputItem.length === 0) {
      setInputItem((oldVal) => [...oldVal, "Assistant"]);
    }

    if (inputItem.length !== 0 && inputItem.length % 2 === 0) {
      setInputItem((oldVal) => [...oldVal, "Assistant"]);
    }
    if (inputItem.length !== 0 && inputItem.length % 2 === 1) {
      setInputItem((oldVal) => [...oldVal, "User"]);
    }
  };

  // remove interaction
  const removeInteraction = (e) => {
    e.preventDefault();
    if (inputItem.length === 0) {
      setRemoveActive(true);
    }
    if (inputItem.length !== 0) {
      setInputItem((oldVal) => [...oldVal.slice(0, oldVal.length - 1)]);
    }
  };

  // disable remove interaction when no additional fields
  const removeInteractionActive = classNames(
    { "submitButton inactive": removeActive },
    { submitButton: !removeActive }
  );

  // itemlist for additional interactioninputs
  const renderItem = inputItem?.map((list, i) => {
    const val = `${list}`;
    return (
      <>
        <li className="interaction_input" key={i}>
          <textarea type="text" name="interaction" placeholder={val} />
          <label htmlFor="interaction">{`${list} interaction`}</label>
        </li>
      </>
    );
  });

  // render all chats
  let allChats = chatData?.map((obj, i) => (
    <li key={i} className="chats">
      <p>
        <span className="chatName">AI result:</span> {obj.assistant}
      </p>
      <p>
        <span className="chatName">User input:</span> {obj.user}
      </p>
    </li>
  ));

  return (
    <form id="addnewChat" onSubmit={onSubmitChat} ref={form}>
      <h3>gpt-3.5-turbo with AI settings user assistant</h3>
      <fieldset>
        <textarea
          type="text"
          name="settings"
          placeholder="Define AI setting or leave blank for default: You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible."
          ref={settingAI}
        />
        <label htmlFor="settings">Define system settings</label>
      </fieldset>
      <fieldset>
        <textarea
          type="text"
          name="userinteraction"
          placeholder="User interaction"
        />
        <label htmlFor="userinteraction">User interaction</label>
      </fieldset>
      <ul>{renderItem}</ul>
      <input className="submitButton" type="submit" value="submit chat" />
      <input
        className="submitButton"
        onClick={addInteraction}
        value="add new interaction"
      />
      <input
        className={removeInteractionActive}
        onClick={removeInteraction}
        value="remove new interaction"
      />
      <input
        className="submitButton"
        value="Reset chat"
        onClick={resetLocalStorage}
      />
      <ul className="result">{allChats.reverse()}</ul>
    </form>
  );
}

export default ChatGPT3;

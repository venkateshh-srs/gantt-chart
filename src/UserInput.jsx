import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const UserInput = ({ setTasks, setLoading }) => {
  const inputRef = useRef(null);
  const [input, setInput] = useState("");

  const errorRef = useRef(null);

  useEffect(() => {
    const textArea = inputRef.current;
    textArea.style.height = "auto";
    textArea.style.height = Math.min(textArea.scrollHeight, 150) + "px";
    errorRef.current.innerText = "";
  }, [input]);

  const sendMessage = async () => {
    // console.log("sending...");
    setInput("");
    setTasks([]);

    if (input.trim()) {
      //show loader in plce of gantt chart div
      setLoading(true);
      try {
        console.log(process.env.BACKEND_URL);

        const res = await axios.post(
          process.env.BACKEND_URL + "/generate-gantt",
          {
            input: input,
          }
        );

        // console.log(res.data);

        if (res.data.isValid) {
          //set data and send to App.jsx
          setTasks(res.data.tasks);
        } else {
          //set error
          //   console.log(errorRef);
          errorRef.current.innerText = res.data.message;
        }
      } catch (error) {
        errorRef.current.innerText = error.message;
      } finally {
        //stop loader in plce of gantt chart div
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="input-container">
        <h1 className="heading">
          Enter Your Project Details to Create a Gantt Chart
        </h1>

        <div className="input-wrapper">
          <textarea
            ref={inputRef}
            className="input-area"
            value={input}
            rows={1}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type..."
          />
          <button className="send-btn" onClick={sendMessage}>
            Send
          </button>
        </div>
        <div ref={errorRef} className="validate-error"></div>
      </div>
    </>
  );
};
export default UserInput;

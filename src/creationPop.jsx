import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";

const Cpop = props => {
  const [start, setStart] = useState(props.start);
  const [end, setEnd] = useState(props.end);
  const [title, setTitle] = useState(props.title || "");
  const [location, setLocation] = useState(props.location || "");

  const onInfoChange = e => {
    e.target.id === "title"
      ? setTitle(e.target.value)
      : setLocation(e.target.value);
  };

  const startChange = value => {
    console.log(value);
    setStart(value);
  };
  const endChange = value => {
    setEnd({ value });
  };

  const submit = e => {
    e.preventDefault();
    const newSched = { title: title, location: location };
    console.log(newSched);
    props.cred(newSched);
  };
  console.log(props.pop);

  useEffect(() => {
    // setStart(prop);
    setEnd(props.end);
  }, [props.start, props.end]);

  return (
    <div className="formCont">
      <form className="cForm" onSubmit={submit}>
        <div className="titleCont">
          <label className="title" htmlFor="title">
            Title:{" "}
          </label>
          <input id="title" type="text" onChange={onInfoChange} />
        </div>
        <div className="locCont">
          <label className="loc" htmlFor="loc">
            Location:{" "}
          </label>
          <input id="loc" type="text" onChange={onInfoChange} />
        </div>
        <button className="sub">Save</button>
      </form>
    </div>
  );
};

export default Cpop;

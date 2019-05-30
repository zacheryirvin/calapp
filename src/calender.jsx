import React, { useState, useEffect } from "react";
import "tui-calendar/dist/tui-calendar.css";
import Calendar from "@toast-ui/react-calendar";
import format from "date-fns";
import Cpop from "./creationPop.jsx";

const MyComponent = () => {
  let [start, setStart] = useState(new Date());
  let [end, setEnd] = useState(new Date());
  const [title, setTitle] = useState();
  const [location, setLocation] = useState();
  const myTheme = {};
  const today = new Date();
  const getDate = (type, start, value, operator) => {
    start = new Date(start);
    type = type.charAt(0).toUpperCase() + type.slice(1);

    if (operator === "+") {
      start[`set${type}`](start[`get${type}`]() + value);
    } else {
      start[`set${type}`](start[`get${type}`]() - value);
    }

    return start;
  };

  const calRef = React.createRef();
  let [schedules, setSchedules] = useState([
    // {
    //   id: "1",
    //   calendarId: "0",
    //   title: "TOAST UI Calendar Study",
    //   category: "time",
    //   dueDateClass: "",
    //   start: today.toISOString(),
    //   end: getDate("hours", today, 3, "+").toISOString()
    // },
    // {
    //   id: "2",
    //   calendarId: "0",
    //   title: "Practice",
    //   category: "milestone",
    //   dueDateClass: "",
    //   start: getDate("date", today, 1, "+").toISOString(),
    //   end: getDate("date", today, 1, "+").toISOString(),
    //   isReadOnly: true
    // },
    // {
    //   id: "3",
    //   calendarId: "0",
    //   title: "FE Workshop",
    //   category: "allday",
    //   dueDateClass: "",
    //   start: getDate("date", today, 2, "-").toISOString(),
    //   end: getDate("date", today, 1, "-").toISOString(),
    //   isReadOnly: true
    // },
    {
      id: "4",
      calendarId: "0",
      title: "Report",
      category: "time",
      dueDateClass: "",
      start: today.toISOString(),
      end: getDate("hours", today, 1, "+").toISOString()
    }
  ]);

  const change = e => {
    const cRef = calRef.current.getInstance();
    switch (true) {
      case e.target.id === "next":
        cRef.next();
        break;
      case e.target.id === "prev":
        cRef.prev();
        break;
      case e.target.id === "day":
        cRef.changeView("day", true);
        break;
      case e.target.id === "week":
        cRef.changeView("week", true);
        break;
    }
  };

  const editSch = e => {
    const cRef = calRef.current.getInstance();
    const schedule = e.schedule;
    const startTime = e.start;
    const endTime = e.end;
    const title = schedule.title;
    console.log(e);
    // console.log(e);
    const location = schedule.location;
    cRef.updateSchedule(schedule.id, schedule.calendarId, {
      start: startTime,
      end: endTime,
      title: title,
      category: "time",
      location: location
    });
    schedules = schedules.filter(s => {
      return s.id !== schedule.id;
    });
    schedules = [
      ...schedules,
      {
        ...schedule,
        start: startTime,
        end: endTime,
        title: title,
        category: "time",
        location: location
      }
    ];
  };
  const createSch = e => {
    const cRef = calRef.current.getInstance();
    cRef.clear();
    const ids = schedules.map(s => {
      return s.id;
    });
    let newId;
    if (ids.length > 0) {
      newId = Math.max(...ids) + 1;
    } else {
      newId = 1;
    }
    const startTime = e.start;
    const endTime = e.end;
    const title = e.title;
    const location = e.location;
    const schedule = {
      id: String(newId),
      calendarId: "0",
      title: title,
      category: "time",
      dueDateClass: "",
      start: e.start,
      end: e.end,
      location: location,
      isReadOnly: false,
      complete: false
    };
    start = new Date(e.start);
    end = new Date(e.end);
    // setStart(new Date(e.start));
    // setEnd(new Date(e.end));
    // id: "3",
    // calendarId: "0",
    // title: "FE Workshop",
    // category: "allday",
    // dueDateClass: "",
    // start: getDate("date", today, 2, "-").toISOString(),
    // end: getDate("date", today, 1, "-").toISOString(),
    // isReadOnly: true
    // };
    cRef.createSchedules([...schedules, schedule]);
    schedules = [...schedules, schedule];
  };

  const lastSch = e => {
    const cRef = calRef.current.getInstance();
    const ids = schedules.map(s => {
      return s.id;
    });
    const lastId = ids[ids.length - 1];
    const lastS = cRef.getSchedule(String(lastId), "0");
    return lastS;
  };

  const credForm = sch => {
    const cRef = calRef.current.getInstance();
    const schedule = lastSch();
    const start = schedule.start;
    const end = schedule.end;
    const title = sch.title;
    const location = sch.location;
    cRef.updateSchedule(schedule.id, schedule.calendarId, {
      start: start,
      end: end,
      title: title,
      category: "time",
      location: location
    });
    schedules.pop();
    schedules = [
      ...schedules,
      { ...schedule, title: title, location: location }
    ];
    console.log(schedules);
  };

  const delSch = e => {
    const cRef = calRef.current.getInstance();
    const schedule = e.schedule;
    console.log(schedule);
    cRef.deleteSchedule(schedule.id, schedule.calendarId);
    schedules = schedules.filter(s => {
      return s.id !== schedule.id;
    });
  };

  return (
    <div className="calComp">
      <Cpop start={start} end={end} cred={credForm} />
      <Calendar
        schedules={schedules}
        onBeforeUpdateSchedule={editSch}
        onBeforeCreateSchedule={createSch}
        onBeforeDeleteSchedule={delSch}
        onAfterRenderSchedule={lastSch}
        height="100%"
        ref={calRef}
        calendars={[
          {
            id: "0",
            name: "Private",
            bgColor: "#9e5fff",
            borderColor: "#9e5fff"
          },
          {
            id: "1",
            name: "Company",
            bgColor: "#00a9ff",
            borderColor: "#00a9ff"
          }
        ]}
        disableDblClick={true}
        isReadOnly={false}
        scheduleView
        taskView={false}
        template={{
          milestone(schedule) {
            return `<span style="color:#fff;background-color: ${
              schedule.bgColor
            };">${schedule.title}</span>`;
          },
          milestoneTitle() {
            return "Milestone";
          },
          allday(schedule) {
            return `${schedule.title}<i class="fa fa-refresh"></i>`;
          },
          alldayTitle() {
            return "All Day";
          }
        }}
        theme={myTheme}
        // timezones={[
        //   {
        //     timezoneOffset: 540,
        //     displayLabel: "GMT+09:00",
        //     tooltip: "Seoul"
        //   },
        //   {
        //     timezoneOffset: -420,
        //     displayLabel: "GMT-08:00",
        //     tooltip: "Los Angeles"
        //   }
        // ]}
        useDetailPopup
        // useCreationPopup
        week={{
          showTimezoneCollapseButton: true,
          timezonesCollapsed: true
        }}
      />
      <button id="next" onClick={change}>
        Next
      </button>
      <button id="prev" onClick={change}>
        Prev
      </button>
      <button id="day" onClick={change}>
        Day
      </button>
      <button id="week" onClick={change}>
        Week
      </button>
    </div>
  );
};

export default MyComponent;

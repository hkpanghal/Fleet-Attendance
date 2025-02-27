import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Students.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import StudentItem from "./StudentItem";
import StudentPopUp from "./StudentPopUp";
import { useParams } from "react-router-dom";
import { switchIsPresent } from "../../Slices/studentsSlice";
import addStudentImage from "../../assets/addStudent.jpg";
import { markIsPresent } from "../../Slices/studentsSlice";
import Helper from "./Helper";
import SuccessMessage from "./SuccessMessage";
import { fetchStudents } from "../../Slices/studentsSlice";
import { addAttendanceToDb } from "../../backend/backend";
import Loader from "./Loader";
import { Document, Page, pdf } from "@react-pdf/renderer";
import StudentsPDF from "../../utils/StudentsPDF";
function Students() {
  const comp = useRef(null);

  const { class_id, class_name } = useParams();
  const dispatch = useDispatch();

  const [subject, setSubject] = useState("");
  const [successMessageDisplay, setSuccessMessageDisplay] = useState("none");
  const [successMessage, setSuccessMessage] = useState("");
  const [stpopup, setStpopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(0);

  const userDetails = useSelector((state) => state.user.details);
  const students = useSelector((state) => state.student.students);
  const isLoading = useSelector((state) => state.student.isLoading);

  const handleDownloadPdf = () => {
    const pdfContent = (
      <Document>
        <StudentsPDF
          students={students}
          className={class_name}
          subjectName={subject}
          totalPresent={calculateIsPresent()}
          totalAbsent={students.length - calculateIsPresent()}
        />
      </Document>
    );
    pdf(pdfContent)
      .toBlob()
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "student_list.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
  };

  const presentStudents = useMemo(() => {
    return students.filter((student) => student.is_present === true).length;
  }, [students]);

  const totalStudents = useMemo(() => {
    return students.length;
  }, [students.length]);

  const handleKeyPress = (event) => {
    const { key } = event;

    let screen = document.querySelector(".screen");

    if (key === "ArrowLeft" || key === "ArrowRight") {
      const scrollAmount = key === "ArrowRight" ? 80 : -80;
      screen.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
    }

    if (key === "ArrowLeft") {
      // Move selection up
      setSelectedStudent((prev) => (prev > 1 ? prev - 1 : prev));

      // console.log(selectedStudent)
    } else if (key === "ArrowRight") {
      // Move selection down
      setSelectedStudent((prev) => (prev < students.length ? prev + 1 : prev));
    } else if (students.length && key === "Tab") {
      event.preventDefault();
      if (selectedStudent) {
        const sid = students[selectedStudent - 1]._id;
        const isPresent = !students[selectedStudent - 1].is_present;
        dispatch(markIsPresent({ _id: sid, is_present: isPresent }));
      }
    }
  };

  const handleCreateAttendance = () => {
    if (!subject) {
      setSuccessMessage("Subject field is empty");
      setSuccessMessageDisplay("flex");
      return;
    }

    addAttendanceToDb(class_id, userDetails._id, students, subject)
      .then((res) => {
        if (res.data.success) {
          setSuccessMessage("All done"), setSuccessMessageDisplay("flex");
        }
      })
      .catch((err) => {
        console.log(err);
        setSuccessMessage("some error occurred while saving attendance."),
          setSuccessMessageDisplay("flex");
      });
  };

  useEffect(() => {
    if (comp.current) {
      const t = gsap.timeline();
      t.from(".sli-anim", {
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
        stagger: 0.2,
        scale: 0,
      });
    }
  }, [isLoading]);

  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedStudent, students]); // Empty dependency array to run the effect only once5
  useEffect(() => {
    dispatch(fetchStudents({ class_id, user_id: userDetails._id }));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="students dynamic" ref={comp}>
      <StudentPopUp stpopup={stpopup} setStpopup={setStpopup} />
      <div className="upper-comp">
        <div className="uc-left">
          <label htmlFor="" className="sli-anim">
            Subject :{" "}
            <input
              type="text"
              placeholder="enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </label>
          <div className="uds sli-anim">
            {Date(Date.now()).toLocaleString()}
          </div>
        </div>
        <div className="uc-right">
          <div className="add-studentbtn sli-anim">
            Add Student
            <button onClick={() => setStpopup(true)}>🧑+</button>
          </div>
          <div className="ustbtns sli-anim">
            Switch
            <button
              onClick={() =>
                students.length &&
                dispatch(
                  switchIsPresent({
                    is_present: true,
                  })
                )
              }
            >
              P
            </button>
            <button
              onClick={() =>
                students.length &&
                dispatch(
                  switchIsPresent({
                    is_present: false,
                  })
                )
              }
            >
              A
            </button>
          </div>
        </div>
      </div>
      <ol>
        {students.length ? (
          students.map((student, index) => (
            <li
              key={student._id}
              className={
                selectedStudent === index + 1 ? "selected sli-anim" : "sli-anim"
              }
            >
              <StudentItem student={student} index={index} />
            </li>
          ))
        ) : (
          <Helper name={"student"} src={addStudentImage} />
        )}
      </ol>
      <div
        className="attendanceResult sli-anim"
        style={students.length ? { display: "flex" } : { display: "none" }}
      >
        <h2>Attendance Result</h2>
        <div className="data-box">
          <div className="db-top">
            <div className="db-top-text">
              <p>
                <span>🙂Present</span>
                <span>:</span>
                <span>{presentStudents}</span>
              </p>
              <p>
                <span>😟Absent</span>
                <span>:</span>
                <span>{totalStudents - presentStudents}</span>
              </p>
              <p>
                <span>🤙Total</span>
                <span> :</span>
                <span>{totalStudents}</span>
              </p>
            </div>
          </div>
          <div className="db-bottom">
            <button
              onClick={() =>
                subject
                  ? (handleDownloadPdf(),
                    setSuccessMessageDisplay("flex"),
                    setSuccessMessage("All done"))
                  : (setSuccessMessageDisplay("flex"),
                    setSuccessMessage("Subject is not provided"))
              }
            >
              Take PDF 📂
            </button>
            <button onClick={() => handleCreateAttendance()}>Save to db</button>
          </div>
        </div>
      </div>

      <SuccessMessage
        message={successMessage}
        display={successMessageDisplay}
        setDisplay={setSuccessMessageDisplay}
      />
    </div>
  );
}

export default Students;

import React from "react";
import "../Home/SnapItem.css"
function SnapItem({ elem }) {

    const presentStudents = elem.students.filter((student) => student.is_present)
    const absentStudents = elem.students.filter((student) => !student.is_present)
    const dateTime = new Date(elem.createdAt);

    let hours = dateTime.getHours();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12-hour format

    const formattedDateTime = `${dateTime.getFullYear()}/${(dateTime.getMonth() + 1).toString().padStart(2, '0')}/${dateTime.getDate().toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}:${dateTime.getSeconds().toString().padStart(2, '0')} ${amPm}`;

    
  return (
    <div className="snapitem-container">
      <details>
        <summary className="summary" ><span>{elem.subject_name}</span><span>{formattedDateTime}</span></summary>
        <div>
            <details>
                <summary className="inner-summary">Present ({presentStudents.length})</summary>
                {
                presentStudents.map(student => (
                    <div key={student._id} className="status">
                        <p>{student.first_name + " "  + student.last_name}</p>
                        <p>{student.roll_number}</p>
                    </div>
                ))
                }
            </details>
            <details>
                <summary className="inner-summary">Absent ({absentStudents.length})</summary>
                {
                absentStudents.map(student => (
                    <div key={student._id} className="status">
                        <p>{student.first_name + " "  + student.last_name}</p>
                        <p>{student.roll_number}</p>
                    </div>
                ))
                }
            </details>
        </div>
      </details>
    </div>
  );
}

export default SnapItem;

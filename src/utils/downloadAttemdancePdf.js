import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function generateAttendancePDF(attendanceData,className,subject) {

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    let count = 1;
    let present = 0;
    let absent = 0;
    attendanceData.map((student) => student.is_present == true? present++:absent++)
    const docDefinition = {
      content: [
        { text: "Attendance Report", style: 'header' },
        { text: className, style: 'header' },
        { text: subject, style: 'header' },
        { text: `Date: ${formattedDate}`, style: 'subheader' }, // Add current date
        {
          table: {
            headerRows: 1,
            widths: ['*','*', '*', '*'], // Adjust column widths as needed

            body: [
              [{ text: 'Sr No.', style: 'tableHeader' },{ text: 'Roll Number', style: 'tableHeader' },{ text: 'Student Name', style: 'tableHeader' },{ text: 'Status', style: 'tableHeader' }],
              ...attendanceData.map(attendance => [{ text: count++, style: 'dataCell' },{text:attendance.roll_number,style:'dataCell'},{text:attendance.first_name + " " + attendance.last_name,style:'dataCell'},{text: attendance.is_present === true ? "Present" :"Absent",   style: attendance.is_present === true ? 'presentStyle' : 'absentStyle' }]),
            ],
          },
        },
        { text: `Present Students: ${present}`, style: 'subheader' },
        { text: `Absent Students: ${absent}`, style: 'subheader' }, 
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          alignment: 'center',
        },
        subheader: {
          fontSize: 14,
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'white', // Header text color
          fillColor: '#2c3e50', // Header background color
          alignment: 'center',
          margin: [0, 5, 0, 5],
        },
        dataCell: {
          fontSize: 10,
          margin: [0, 5, 0, 5],
          alignment: 'center',
        },
        presentStyle: {
          color: 'black', // Header text color
          fillColor: 'lightgreen', // Header background color
          fontSize: 10,
          margin: [0, 5, 0, 5],
          alignment: 'center',
        },
        absentStyle: {
          color: 'black', // Header text color
          fillColor: 'lightcoral', // Header background color
          fontSize: 10,
          margin: [0, 5, 0, 5],
          alignment: 'center',
        },
      },
    
      defaultStyle: {
        fontSize: 10,
        color: 'black',
      },
    };
  
    pdfMake.createPdf(docDefinition).download('attendance_report.pdf');
  }

  export {generateAttendancePDF}
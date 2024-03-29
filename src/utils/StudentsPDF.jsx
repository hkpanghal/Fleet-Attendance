import React from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 15,
  },
  title: {
    fontSize: 15,
    marginVertical: 5,
    fontWeight: 'heavy',
    textAlign: "center"
  },
  table: {
    display: 'table',
    width: '100%',
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    borderStyle: 'solid',
  },
  tableCol: {
    width: '35%',
    paddingVertical: 5,
    borderStyle: 'solid',
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    fontSize: 10,
    textAlign: "center"
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  headerText: {
    fontWeight: 'bold',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
});


const StudentsPDF = ({ students, className, subjectName,totalPresent,totalAbsent }) => {
  const renderStudentsPage = (studentsBatch, pageNumber) => (
    <Page key={pageNumber} size="A4" style={styles.page}>
      {pageNumber === 1 && (
        <>
          <Text style={styles.title}>Attendance Report</Text>
          <Text style={styles.title}>{className}</Text>
          <Text style={styles.title}>{subjectName}</Text>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={[styles.title, { textAlign: "left" }]}>{new Date().toDateString()}</Text>
           <View style={{flexDirection:"row",gap:10}}>
            <Text style={styles.title}>Present:{totalPresent}</Text>
            <Text style={styles.title}>Absent:{totalAbsent}</Text>
           </View>
          </View>
        </>
      )}
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCol, styles.headerText, { width: "10%", textAlign: "center" }]}>Sr. No.</Text>
          <Text style={[styles.tableCol, styles.headerText]}>Name</Text>
          <Text style={[styles.tableCol, styles.headerText]}>Roll Number</Text>
          <Text style={[styles.tableCol, styles.headerText, { width: "20%" }]}>Status</Text>
        </View>
        {studentsBatch.map((student, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCol, { width: "10%", textAlign: "center" }]}>{(pageNumber - 1) * 25 + index + 1}</Text>
            <Text style={[styles.tableCol, { textAlign: "left", paddingHorizontal: 15 }]}>{student.first_name + " " + student.last_name}</Text>
            <Text style={styles.tableCol}>{student.roll_number}</Text>
            <Text style={[styles.tableCol, { backgroundColor: student.is_present ? "rgba(0, 128, 0, 0.458)" : "rgba(255, 0, 0, 0.468)", width: "20%" }]}>{student.is_present ? 'Present' : 'Absent'}</Text>
          </View>
        ))}
      </View>
    </Page>
  );

  const studentsPages = [];
  const batchSize = 25;
  for (let i = 0; i < students.length; i += batchSize) {
    studentsPages.push(renderStudentsPage(students.slice(i, i + batchSize), Math.floor(i / batchSize) + 1));
  }

  return studentsPages
};

export default StudentsPDF;

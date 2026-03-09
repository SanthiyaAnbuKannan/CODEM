function analyzeStudents(students) {
  let total = 0;
  let topper = "";
  let highest = 0;
  let failedStudents = [];
  let passCount = 0;
  for(let i = 0; i < students.length; i++){
    total += students[i].marks;
    if(students[i].marks > highest){
        highest = students[i].marks;
        topper = students[i].name;
    }
    if(students[i].marks < 50){
        failedStudents.push(students[i].name);
    } else {
        passCount++;
    }
  }
  let average = Math.round(total / students.length);
  let result = {average: average, topper: topper, failedStudents: failedStudents, passCount: passCount};
  return result;
}
console.log(analyzeStudents(students));

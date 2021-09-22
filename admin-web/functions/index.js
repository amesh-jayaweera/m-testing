const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const database = admin.firestore();
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const jobPath = "jobs";
const employeePath = "employees";
const todayJobPath = "today_jobs";
const runningJobPath = "running_jobs";

const scheduling = async () => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate()+1);
  const todayStr = today.toISOString().split("T")[0];
  const tomorrowStr = tomorrow.toISOString().split("T")[0];
  const todayDay = days[today.getDay()];
  const tomorrowDay = days[tomorrow.getDay()];

  console.log("Today      -------- ", todayStr);
  console.log("Tomorrow   -------- ", tomorrowStr);
  console.log("Today Day  -------- ", todayDay);
  console.log("Tomorrow Day  -------- ", tomorrowDay);

  const todayJobRef = database.collection(todayJobPath);
  const runningJobRef = database.collection(runningJobPath);
  const employeesRef = database.collection(employeePath);
  const jobRef = database.collection(jobPath);
  await jobRef
      .where("active", "==", true)
      .where("days", "array-contains-any", [tomorrowDay])
      .get()
      .then(function(snapshot) {
        snapshot.forEach((doc) => {
          const docId = doc.id;
          const data = doc.data();
          const employees = data.assignedEmployees;
          console.log("Data ------- ", docId);
          console.log("Employees ------ ", employees);
          const selectedEmployees = [];
          const len = employees.length;
          for (let i=0; i<len; i++) {
            const employee = employees[i]["value"];
            console.log(docId, " - Employee - ", employee);
            const employeeRef = employeesRef.doc(employee.trim());
            employeeRef
                .get()
                .then(function(doc) {
                  // check whether the employee exists
                  if (doc.exists) {
                    const employeeDocData = doc.data();
                    if (!employeeDocData.suspend) {
                      selectedEmployees.push(employee);
                      runningJobRef.doc().set({
                        jobId: docId,
                        date: tomorrowStr,
                        title: data.title,
                        address: data.address,
                        category: data.category,
                        shiftOn: data.shiftOn,
                        shiftOff: data.shiftOff,
                        day: tomorrowDay,
                        locations: data.locations,
                        datetime: new Date(),
                        employee: {
                          email: employeeDocData.email,
                          firstName: employeeDocData.firstName,
                          lastName: employeeDocData.lastName,
                          position: employeeDocData.position,
                        },
                        status: {
                          status: "NOT_STARTED",
                        },
                      }).then(() => {
                        console.log("Created running job for --- Email - "
                            , employee, " - First Name - ",
                            employeeDocData.firstName, " - Last Name - "
                            , employeeDocData.lastName);
                        // last employee
                        if (i == len - 1) {
                          // create today jobs
                          todayJobRef.doc().set({
                            jobId: docId,
                            date: tomorrowStr,
                            title: data.title,
                            address: data.address,
                            category: data.category,
                            shiftOn: data.shiftOn,
                            shiftOff: data.shiftOff,
                            day: tomorrowDay,
                            locations: data.locations,
                            datetime: new Date(),
                            employees: selectedEmployees,
                            employeeCount: selectedEmployees.length,
                          })
                              .then(() => {
                                console.log("Created today job");
                              })
                              .catch((todayJobError)=> {
                                console.log("Today Job Error ----- "
                                    , todayJobError);
                              });
                        }
                      }).catch((error) => {
                        console.log("Running Job Error ----- "
                            , error);
                      });
                    } else {
                      console.log("Suspended Employee ---- ", employee);
                    }
                  } else {
                    console.log("Employee Not Exists ---- ", employee);
                  }
                })
                .catch(function(error) {
                  console.log("Employee Getting Error ---- ",
                      error);
                });
          }
        });
      })
      .catch(function(error) {
        console.log("Error ------- ", error);
      });
};

exports.scheduleJobs = functions.pubsub
    .schedule("30 23 * * *")
    .timeZone("Asia/Colombo")
    .onRun(() => {
      scheduling()
            .then((r) => console.log("Successfully Updated ....."))
            .catch((error) => console.log(error));
    },
    );

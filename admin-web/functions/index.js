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
  // calculate today date and tomorrow date
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const todayStr = today.toISOString().split("T")[0];
  const tomorrowStr = tomorrow.toISOString().split("T")[0];
  const todayDay = days[today.getDay()];
  const tomorrowDay = days[tomorrow.getDay()];

  console.log("Today          =========> ", todayStr, todayDay);
  console.log("Tomorrow       =========> ", tomorrowStr, tomorrowDay);

  //  const employeesRef = database.collection(employeePath);
  const jobRef = database.collection(jobPath);
  const jobs = await jobRef
      .where("active", "==", true)
      .where("days", "array-contains-any", [tomorrowDay])
      .get();

  await Promise.all(jobs.docs.map(async (job) => {
    const jobId = job.id;
    const jobDetails = job.data();
    if (!jobDetails) {
      console.log(jobId, " is null");
    } else {
      console.log("Job =========> ", jobDetails.title);
      const assignedEmployees = jobDetails.assignedEmployees;

      const selectedEmployees = [];
      await Promise.all(assignedEmployees.map(async (assignedEmployee) => {
        const assignedEmployeeEmail = assignedEmployee["value"];
        const assignedEmployeeRef = database.collection(employeePath)
            .doc(assignedEmployeeEmail.trim());
        const employeeData = await assignedEmployeeRef.get();
        if (employeeData.exists) {
          const employee = employeeData.data();
          if (!employee.suspend) {
            console.log("Employee Details ==================> ");
            console.log(employee.email);
            selectedEmployees.push(employee.email);
            const runningJobRef = database.collection(runningJobPath);
            runningJobRef.doc().set({
              jobId: jobId,
              date: tomorrowStr,
              title: jobDetails.title,
              address: jobDetails.address,
              category: jobDetails.category,
              shiftOn: jobDetails.shiftOn,
              shiftOff: jobDetails.shiftOff,
              day: tomorrowDay,
              locations: jobDetails.locations,
              datetime: new Date(),
              employee: {
                email: employee.email,
                firstName: employee.firstName,
                lastName: employee.lastName,
                position: employee.position,
              },
              status: {
                status: "NOT_STARTED",
              },
            }).then(() => {
              console.log("Created running job for --- Email - "
                  , employee, " - First Name - ",
                  employee.firstName, " - Last Name - "
                  , employee.lastName);
            }).catch((error) => {
              console.log("Running Job Error ----- "
                  , error);
            });
          }
        } else {
          console.log("Employee details of ", assignedEmployeeEmail,
              " is null.");
        }
      }));

      if (selectedEmployees.length > 0) {
        const todayJobRef = database.collection(todayJobPath);
        await todayJobRef.doc().set({
          jobId: jobId,
          date: tomorrowStr,
          title: jobDetails.title,
          address: jobDetails.address,
          category: jobDetails.category,
          shiftOn: jobDetails.shiftOn,
          shiftOff: jobDetails.shiftOff,
          day: tomorrowDay,
          locations: jobDetails.locations,
          datetime: new Date(),
          employees: selectedEmployees,
          employeeCount: selectedEmployees.length,
        })
            .then(() => {
              console.log("Created today job for ", jobDetails.title);
            })
            .catch((todayJobError)=> {
              console.log("Today Job Error for ", jobDetails.title
                  , todayJobError);
            });
      }
    }
  }));
  return 0;
};

exports.scheduleJobs = functions.pubsub
    .schedule("0 20 * * *")
    .timeZone("Asia/Colombo")
    .onRun(async () => {
      const status = await scheduling();
      if (status === 0) {
        console.log("Scheduling completed ...");
      }
    },
    );

const auth = require("../controllers/authorization-microservice");
const asms = require("./../controllers/assignment-microservice");
module.exports = (app) => {
  /*
  Gets all the assignments due for the given student.
  */

  app.get("/api/assignments/student/getAssignments", async (req, res) => {
    const authenticated = await auth.authoriseStudent(
      req.headers.authorization
    );

    if (authenticated !== false) {
      const resp = await asms.getAssignments(authenticated["grade"], authenticated["section"])
      if(resp !== false) {
        res.status(200).json({
          "object":resp
        })
      }
      else {
        res.status(500).json({
          "message":"Something went wrong"
        })
      }
    }
    else {
      res.status(403).json({
        "message":"No Auth"
      })
    }
  });
  /*
  Allows a student to submit a particular assignment
  */
  app.post("/api/assignment/student/submitAssignment", async (req, res) => {
    const authenticated = await auth.authoriseStudent(
      req.headers.authorization
    );

    if (authenticated !== false) {
    }
  });

  app.post("/api/assignments/students/requestExtension", async (req, res) => {
    const authenticated = await auth.authoriseStudent(
      req.headers.authorization
    );

    if (authenticated !== false) {
    }
  });

  app.get("/api/assignments/teacher/getAssignments", async (req, res) => {
    const authenticated = await auth.authoriseTeacher(
      req.headers.authorization
    );

    if (authenticated !== false) {
    }
  });

  app.post("/api/assignments/teacher/makeAssignment", async (req, res) => {
    const authenticated = await auth.authoriseTeacher(
      req.headers.authorization
    );

    if (
      authenticated !== false &&
      req.body.dueDate !== null &&
      req.body.assignmentName !== null &&
      req.body.assignmentLink !== null
    ) {
      //means we are authorized by this point, so
      const response = await asms.makeAssignment(
        authenticated["grade"],
        authenticated["section"],
        authenticated["username"],
        authenticated["name"],
        req.body.dueDate,
        req.body.assignmentName,
        req.body.assignmentLink
      );

      if(response) {
        res.status(200).json({
          "message":"Successfully Created Assignment"
        })
      }
      else {
        res.status(500).json({
          "message":"failed to create assignment"
        })
      }
    }
    else {
      res.status(403).json({
        "message":"Either Auth Failed, or you failed to supply the required parameters"
      })
    }
  });
};
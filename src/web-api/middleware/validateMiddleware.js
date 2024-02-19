const validateUserFields = (req, res, next) => {
  if (!req.body.accountType) {
    res.status(400);
    throw new Error("Account type is required");
  } else if (!req.body.name) {
    res.status(400);
    throw new Error("Name is required");
  } else if (!req.body.email) {
    res.status(400);
    throw new Error("Email is required");
  } else if (!req.body.password) {
    res.status(400);
    throw new Error("Password is required");
  } else if (req.body.password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters");
  } else if (req.body.accountType === "player" && !req.body.region) {
    res.status(400);
    console.log(req.body.region);
    throw new Error("Region is required");
  } else if (req.body.accountType === "coach" && !req.body.teamName) {
    res.status(400);
    throw new Error("Team name is required");
  } else {
    console.log("Validated");
    next();
  }
};

const validateTeamFields = (req, res, next) => {
  if (!req.body.teamName) {
    res.status(400);
    throw new Error("Team name is required");
  } else if (!req.body.coachId) {
    res.status(400);
    throw new Error("Coach ID is required");
  } else {
    next();
  }
};

export { validateUserFields, validateTeamFields };

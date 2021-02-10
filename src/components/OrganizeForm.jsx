import React from "react";
import { TextInput, RadioGroup, Textarea, Button, Checkbox } from "react-materialize";//paymeny check box
import { parseISO } from "date-fns";
import TimezonePicker from "react-bootstrap-timezone-picker";
import SimpleReactValidator from "simple-react-validator";
import DatePicker from "react-datepicker";
import "react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "../css/common.css";

let validator = new SimpleReactValidator({ autoForceUpdate: this });

let validateForm = (e) => {
  validator.showMessageFor(e.target.name);
};
const OrganizeForm = (props) => {
  let {
    tournament,
    update,
    handleDatePicker,
    handleImageSelect,
    handleTextChange,
    handleChecked, //  payment code
    handleTimezone,
    handleCreateTournament,
    handleSubmit,
    handleUpdate,
    dateErrors,
  } = props;

  return (
    <>
      <div className="section container">
        <div className="section-header">
          <div className="section-title-box blue">
            <h6 className="section-title" style={{ display: "inline-block" }}>
              Organize {tournament.tournamentType} Tournament
            </h6>

            <i
              className="fa fa-times right"
              style={{ cursor: "pointer" }}
              onClick={() => handleCreateTournament("")}
            ></i>
          </div>
        </div>
        <div className="section-body">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <TextInput
                  value={tournament.name}
                  label="Tournament Name"
                  name="name"
                  onChange={(e) => handleTextChange(e)}
                  onBlur={(e) => validateForm(e)}
                />
                {validator.message(
                  "name",
                  tournament.name,
                  "required|min:3|max:35"
                )}
              </div>
              <div className="col-sm-6">
                <TextInput
                  value={tournament.gameName}
                  label="Game Name"
                  name="gameName"
                  error="Game name is required"
                  validate
                  onChange={(e) => handleTextChange(e)}
                  onBlur={(e) => validateForm(e)}
                />
                {validator.message(
                  "gameName",
                  tournament.gameName,
                  "required|min:3|max:35"
                )}
              </div>
              <div className="col-sm-6">
                <TextInput
                  type="file"
                  className="blue"
                  label="Image"
                  placeholder="Upload game Image"
                  name="image"
                  onChange={(e) => handleImageSelect(e)}
                />
              </div>
              <div className="col-sm-12">
                {tournament.image && (
                  <div className="p-3 center">
                    <img
                      src={tournament.image.base64}
                      width="300px"
                      height="auto"
                      alt="Article"
                    />
                  </div>
                )}
              </div>
              <div className="col-sm-6">
                {tournament.tournamentType === "Sports" ? (
                  <>
                    <TextInput
                      value={tournament.avenue}
                      label="Avenue"
                      name="avenue"
                      onChange={(e) => handleTextChange(e)}
                      onBlur={(e) => validateForm(e)}
                    />
                  </>
                ) : (
                    <>
                      <TextInput
                        value={tournament.platform}
                        label="PLatform"
                        placeholder="like PC, Mobile..."
                        name="platform"
                        onChange={(e) => handleTextChange(e)}
                        onBlur={(e) => validateForm(e)}
                      />
                    </>
                  )}
              </div>
              <div className="col-sm-6">
                <TextInput
                  value={tournament.email}
                  email
                  label="Email for participant contact"
                  name="email"
                  onChange={(e) => handleTextChange(e)}
                  onBlur={(e) => validateForm(e)}
                />
                {validator.message("email", tournament.email, "required|email")}
              </div>
              <div className="col-sm-12">
                <h5
                  className="ml-3 mr-4 grey-text text-darken-3"
                  style={{ display: "inline-block" }}
                >
                  Participants:
                </h5>
                <RadioGroup
                  label="Type"
                  name="participantsType"
                  value={tournament.participantsType}
                  onChange={(e) => handleTextChange(e)}
                  onBlur={(e) => validateForm(e)}
                  options={[
                    {
                      label: "Teams",
                      value: "teams",
                    },
                    {
                      label: "Players",
                      value: "players",
                    },
                  ]}
                  withGap
                />
              </div>
              <div className="col-sm-6">
                <TextInput
                  type="number"
                  value={tournament.teams + ""}
                  disabled={tournament.participantsType !== "teams"}
                  label="Teams"
                  name="teams"
                  onChange={(e) => handleTextChange(e)}
                  onBlur={(e) => validateForm(e)}
                />
                {validator.message(
                  "teams",
                  tournament.teams,
                  `${tournament.participantsType === "teams"
                    ? "required|numeric"
                    : "numeric"
                  }`
                )}
              </div>
              <div className="col-sm-6">
                <TextInput
                  type="number"
                  value={tournament.players + ""}
                  label="Players"
                  name="players"
                  onChange={(e) => handleTextChange(e)}
                  onBlur={(e) => validateForm(e)}
                />
                {validator.message(
                  "players",
                  tournament.players,
                  "required|numeric"
                )}
              </div>
              {/* payment code here */}
              <div className="col-sm-6 ">
                <h5
                  className="ml-3 mr-4 grey-text text-darken-3"
                  style={{ display: "inline-block" }}
                >
                  Payment optional:
                </h5>
                <Checkbox
                  id="Checkbox_3"
                  label="check if you want to add payment"
                  value={tournament.isChecked} //initially false
                  onChange={(e) => handleChecked(e)}
                // onBlur={(e) => validateForm(e)}
                />

              </div>
              <div className="col-sm-6">
                <TextInput
                  type="number"
                  value={tournament.entryfee}
                  label="Add Entry Fee"
                  name="entryfee"
                  disabled={!tournament.isChecked} //initially true when tournament.isChecked=false and vice versa
                  onChange={(e) => handleTextChange(e)}
                  onBlur={(e) => validateForm(e)}
                />
                {validator.message(
                  "entryfee",
                  tournament.entryfee,
                  `${tournament.isChecked === "true" ? "required|numeric" : "numeric"}`
                )}
              </div>
              {/* paymentcode end here */}
              <div className="col-sm-6">
                <TimezonePicker
                  absolute={false}
                  name="timezone"
                  value={tournament.timezone}
                  defaultValue="Asia/Karachi"
                  placeholder="Select timezone..."
                  onChange={(timezone) => handleTimezone(timezone)}
                // onBlur={(e) => validateForm(e)}
                />
                {validator.message("timezone", tournament.timezone, "required")}
              </div>
              <div className="col-md-3 col-sm-6">
                <DatePicker
                  placeholderText="Start Date"
                  className="mt-3"
                  selected={
                    update
                      ? parseISO(tournament.startDate)
                      : tournament.startDate
                  }
                  onSelect={(date) => handleDatePicker("startDate", date)}
                />
                {dateErrors && dateErrors.startDate && (
                  <p>{dateErrors.startDate}</p>
                )}
              </div>
              <div className="col-md-3 col-sm-6">
                <DatePicker
                  disabled={tournament.startDate === ""}
                  placeholderText="End Date"
                  className="mt-3"
                  selected={
                    update ? parseISO(tournament.endDate) : tournament.endDate
                  }
                  onSelect={(date) => handleDatePicker("endDate", date)}
                />
                {dateErrors && dateErrors.endDate && (
                  <p>{dateErrors.endDate}</p>
                )}
              </div>
              <div className="col-sm-6">
                <TextInput
                  value={tournament.startTime}
                  label="Start Time"
                  placeholder="hh:mm AM/PM"
                  name="startTime"
                  onChange={(e) => handleTextChange(e)}
                  onBlur={(e) => validateForm(e)}
                />
                {validator.message(
                  "startTime",
                  tournament.startTime,
                  "required"
                )}
              </div>
              <div className="col-sm-6">
                <TextInput
                  value={tournament.prize + ""}
                  label="Prize"
                  name="prize"
                  onChange={(e) => handleTextChange(e)}
                  onBlur={(e) => validateForm(e)}
                />
              </div>
              <div className="col-sm-6">
                <Textarea
                  value={tournament.description}
                  label="Description"
                  name="description"
                  onChange={(e) => handleTextChange(e)}
                  onBlur={(e) => validateForm(e)}
                />
              </div>
              <div className="col-sm-6">
                <Textarea
                  value={tournament.rules}
                  label="Rules"
                  name="rules"
                  onChange={(e) => handleTextChange(e)}
                  onBlur={(e) => validateForm(e)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="section-footer">
          {update ? (
            <Button
              node="button"
              className="green white-text"
              waves="light"
              onClick={() => handleUpdate(validator)}
            >
              Update
            </Button>
          ) : (
              <Button
                node="button"
                className="blue white-text"
                waves="light"
                onClick={() => handleSubmit(validator)}
              >
                Submit
              </Button>
            )}
        </div>
      </div>
    </>
  );
};

export default OrganizeForm;

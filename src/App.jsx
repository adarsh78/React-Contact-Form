import React, { createRef, useRef, useState } from "react";
import "./App.css";

const App = ({ bgColor }) => {
  const appStyle = {
    backgroundColor: bgColor,
    minHeight: "100vh",
    paddingBlock: "3rem",
    paddingInline: "1rem",
  };

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    checkbox: false,
    radioButton: "",
  });

  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    message: false,
    checkbox: false,
    radioButton: false,
  });

  const [successMessage, setSuccessMessage] = useState(false);

  const firstNameRef = createRef();
  const lastNameRef = createRef();
  const emailRef = createRef();
  const messageRef = createRef();
  const checkBoxRef = createRef();
  const generalQueryRef = createRef();
  const supportQueryRef = createRef();

  const handleKeyDown = (e, field) => {
    if (e.key == "ArrowDown") {
      e.preventDefault();
      if (field == "firstName") {
        lastNameRef.current.focus();
      } else if (field == "lastName") {
        emailRef.current.focus();
      } else if (field == "email") {
        generalQueryRef.current.focus();
      } else if (field == "general-enquiry") {
        supportQueryRef.current.focus();
      } else if (field == "support-enquiry") {
        messageRef.current.focus();
      } else if (field == "message") {
        checkBoxRef.current.focus();
      }
    }

    if (e.key == "ArrowUp") {
      e.preventDefault();
      if (field == "lastName") {
        firstNameRef.current.focus();
      } else if (field == "email") {
        lastNameRef.current.focus();
      } else if (field == "general-enquiry") {
        emailRef.current.focus();
      } else if (field == "support-enquiry") {
        generalQueryRef.current.focus();
      } else if (field == "message") {
        supportQueryRef.current.focus();
      } else if (field == "checkbox") {
        messageRef.current.focus();
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setSuccessMessage(true);
      setInitialValues({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    }
  };

  const handleFormSubmitKeyDown = (e) => {
    if (e.key == "Enter") {
      console.log("Enter");
      e.preventDefault();
      const isValid = validateForm();
      if (isValid) {
        setSuccessMessage(true);
        setInitialValues({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
      }
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInitialValues({
      ...initialValues,
      [name]: value,
    });

    if (name == "firstName") {
      error.firstName = false;
    }
    if (name == "lastName") {
      error.lastName = false;
    }
    if (name == "email") {
      error.email = false;
    }
    if (name == "message") {
      error.message = false;
    }
  };

  const isValidEmail = (email) => {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegEx.test(email);
  };

  const handleCheckBox = (e) => {
    let { name, checked } = e.target;
    setInitialValues({
      ...initialValues,
      [name]: checked,
    });
    error.checkbox = false;
  };

  const handleRadioButton = (e) => {
    setInitialValues({
      ...initialValues,
      radioButton: e.target.value,
    });
    error.radioButton = false;
  };

  const validateForm = () => {
    let newErrors = {};

    if (!initialValues.firstName) {
      newErrors.firstName = true;
    }
    if (!initialValues.lastName) {
      newErrors.lastName = true;
    }
    if (!initialValues.email) {
      newErrors.email = true;
    } else if (!isValidEmail(initialValues.email)) {
      newErrors.email = true;
    }
    if (!initialValues.message) {
      newErrors.message = true;
    }
    if (!initialValues.checkbox) {
      newErrors.checkbox = true;
    }
    if (!initialValues.radioButton) {
      newErrors.radioButton = true;
    }

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div style={appStyle}>
      {successMessage && (
        <div className="bg-[hsl(171,45%,16%)] lg:w-[30rem] mx-auto rounded-xl p-8">
          <div className="flex gap-2 items-center justify-start text-white">
            <img
              src="../assets/images/icon-success-check.svg"
              alt="icon-success"
            />
            <span>Message Sent!</span>
          </div>
          <p className="text-[hsl(186,15%,69%)] mt-2">
            Thanks for completing the form. We'll be in touch soon!
          </p>
        </div>
      )}

      <div className="bg-white p-6 lg:p-10 min-w-[20rem] mx-auto rounded-2xl lg:w-[44rem]">
        <h1 className="text-4xl font-[700] text-[hsl(169,82%,15%)] mb-8 lg:mb-0">
          Contact Us
        </h1>
        <form
          onKeyDown={handleFormSubmitKeyDown}
          onSubmit={handleFormSubmit}
          autoComplete="off"
        >
          <label className="text-[hsl(187,24%,22%)] lg:inline-block lg:w-[49%]">
            First Name
            <span className="ml-2 text-xl text-[hsl(169,82%,27%)]">*</span>
            <input
              className={`w-[100%] mt-2  lg:mb-0 p-3 rounded-md bg-transparent border-[1px] ${
                error.firstName
                  ? "border-[hsl(0,66%,54%)]"
                  : "border-[hsl(186,15%,59%)]"
              }  focus:border-[hsl(169,82%,27%)] focus:outline-none hover:border-[hsl(169,82%,27%)]`}
              type="text"
              name="firstName"
              value={initialValues.firstName}
              ref={firstNameRef}
              onKeyDown={(e) => handleKeyDown(e, "firstName")}
              onChange={handleChange}
            />
            <p
              className={`text-[hsl(0,66%,54%)] mt-2 ${
                error.firstName ? "visible" : "invisible"
              }`}
            >
              This field is required
            </p>
          </label>

          <label className="text-[hsl(187,24%,22%)] mt-6 lg:inline-block lg:w-[49%] lg:ml-3">
            Last Name
            <span className="ml-2 text-xl text-[hsl(169,82%,27%)]">*</span>
            <input
              className={`w-[100%] mt-2 p-3 rounded-md bg-transparent border-[1px] ${
                error.lastName
                  ? "border-[hsl(0,66%,54%)]"
                  : "border-[hsl(186,15%,59%)]"
              } focus:border-[hsl(169,82%,27%)] focus:outline-none hover:border-[hsl(169,82%,27%)]`}
              type="text"
              name="lastName"
              value={initialValues.lastName}
              ref={lastNameRef}
              onKeyDown={(e) => handleKeyDown(e, "lastName")}
              onChange={handleChange}
            />
            <p
              className={`text-[hsl(0,66%,54%)] mt-2 ${
                error.lastName ? "visible" : "invisible"
              }`}
            >
              This field is required
            </p>
          </label>

          <div className="">
            <label className="text-[hsl(187,24%,22%)] mt-6">
              Email Address
              <span className="ml-2 text-xl text-[hsl(169,82%,27%)]">*</span>
              <input
                className={`w-[100%] mt-2 p-3 rounded-md bg-transparent border-[1px] ${
                  error.email
                    ? "border-[hsl(0,66%,54%)]"
                    : "border-[hsl(186,15%,59%)]"
                } focus:border-[hsl(169,82%,27%)] focus:outline-none hover:border-[hsl(169,82%,27%)]`}
                type="text"
                name="email"
                value={initialValues.email}
                ref={emailRef}
                onKeyDown={(e) => handleKeyDown(e, "email")}
                onChange={handleChange}
              />
              {error.email &&
                (!initialValues.email ? (
                  <p className="text-[hsl(0,66%,54%)] mt-2">
                    This field is required
                  </p>
                ) : (
                  <p className="text-[hsl(0,66%,54%)] mt-2">
                    Please enter a valid email address
                  </p>
                ))}
            </label>
          </div>

          <h2 className="text-[hsl(187,24%,22%)] mt-6 mb-3">
            Query Type
            <span className="ml-2 text-xl text-[hsl(169,82%,27%)]">*</span>
          </h2>

          <div>
            <div
              className={`w-[100%] inline-block lg:w-[49%] mt-2 mb-4 py-3 px-5 rounded-md bg-transparent border-[1px] border-[hsl(186,15%,59%)]`}
            >
              <div className="flex items-center">
                {initialValues.radioButton === "general" ? (
                  <img
                    src="../assets/images/icon-radio-selected.svg"
                    alt="icon-radio"
                  />
                ) : (
                  <input
                    className="focus:border-[hsl(169,82%,27%)] focus:outline-none"
                    type="radio"
                    id="general-enquiry"
                    name="enquiry"
                    value="general"
                    checked={initialValues.radioButton === "general"}
                    onChange={handleRadioButton}
                    ref={generalQueryRef}
                    onKeyDown={(e) => handleKeyDown(e, "general-enquiry")}
                  />
                )}

                <label
                  className="text-[hsl(187,24%,22%)] ml-4"
                  htmlFor="general-enquiry"
                >
                  General Enquiry
                </label>
              </div>
            </div>
            <div className="w-[100%] lg:w-[49%] inline-block mt-2 lg:ml-3 py-3 px-5 rounded-md bg-transparent border-[1px] border-[hsl(186,15%,59%)]">
              <div className="flex items-center">
                {initialValues.radioButton === "support" ? (
                  <img
                    src="../assets/images/icon-radio-selected.svg"
                    alt="icon-radio"
                  />
                ) : (
                  <input
                    className="focus:border-[hsl(169,82%,27%)] focus:outline-none"
                    type="radio"
                    id="support-enquiry"
                    name="enquiry"
                    value="support"
                    checked={initialValues.radioButton === "support"}
                    onChange={handleRadioButton}
                    ref={supportQueryRef}
                    onKeyDown={(e) => handleKeyDown(e, "support-enquiry")}
                  />
                )}
                <label
                  className="text-[hsl(187,24%,22%)] ml-4"
                  htmlFor="support-enquiry"
                >
                  Support Request
                </label>
              </div>
            </div>
          </div>
          {error.radioButton && (
            <p className="text-[hsl(0,66%,54%)]">Please select a query type</p>
          )}

          <h2 className="text-[hsl(187,24%,22%)] mt-6 lg:mt-2">
            Message
            <span className="ml-2 text-xl text-[hsl(169,82%,27%)]">*</span>
          </h2>
          <textarea
            rows={10}
            className={`w-[100%] lg:h-[7rem] mt-2 p-4 rounded-md border-[1px] ${
              error.message
                ? "border-[hsl(0,66%,54%)]"
                : "border-[hsl(186,15%,59%)]"
            } focus:border-[hsl(169,82%,27%)] focus:outline-none hover:border-[hsl(169,82%,27%)]`}
            type="text"
            name="message"
            value={initialValues.message}
            onChange={handleChange}
            ref={messageRef}
            onKeyDown={(e) => handleKeyDown(e, "message")}
          ></textarea>
          {error.message && (
            <p className="text-[hsl(0,66%,54%)] mt-1">This field is required</p>
          )}

          <div className="flex items-center gap-4 mt-8">
            {initialValues.checkbox ? (
              <img
                src="../assets/images/icon-checkbox-check.svg"
                alt="icon-checkbox"
              />
            ) : (
              <input
                type="checkbox"
                name="checkbox"
                checked={initialValues.checkbox}
                onChange={handleCheckBox}
                ref={checkBoxRef}
                onKeyDown={(e) => handleKeyDown(e, "checkbox")}
              />
            )}
            <p>
              I consent to being contacted by the team
              <span className="ml-2 text-xl text-[hsl(169,82%,27%)]">*</span>
            </p>
          </div>
          {error.checkbox && (
            <p className="text-[hsl(0,66%,54%)] mt-1">
              To submit this form, please consent to being contacted
            </p>
          )}

          <button
            onKeyDown={handleFormSubmitKeyDown}
            className="w-[100%] bg-[hsl(169,82%,27%)] text-white rounded-md p-4 mt-10 text-xl hover:bg-[hsl(171,45%,16%)]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;

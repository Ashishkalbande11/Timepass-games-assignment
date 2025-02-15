import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "Arcade",
    addOns: {
      online: false,
      storage: false,
      profile: false,
    },
    billingCycle: "monthly", // Default to monthly
    price: 0,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // For phone number field, filter out alphabetic characters
    if (name === "phone") {
      // Replace anything that's not a number, space, plus, or dash
      const validValue = value.replace(/[^0-9+\s-]/g, "");
      setFormData({
        ...formData,
        [name]: validValue,
      });
    } else {
      // For other fields, just update normally
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      addOns: {
        ...formData.addOns,
        [name]: checked,
      },
    });
  };

  const handleToggleChange = () => {
    setFormData({
      ...formData,
      billingCycle: formData.billingCycle === "monthly" ? "yearly" : "monthly",
    });
  };

  const validate = () => {
    let tempErrors = {};

    // Name validation: at least 3 characters long
    if (!formData.name) {
      tempErrors.name = "This field is required";
    } else if (formData.name.length < 3) {
      tempErrors.name = "Name must be at least 3 characters long";
    }

    // Email validation: proper email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      tempErrors.email = "This field is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Enter a valid email address";
    }

    // Phone validation: required and correct format (supports various formats)
    if (!formData.phone) {
      tempErrors.phone = "This field is required";
    }
    if (formData.phone.length < 9 || formData.phone.length > 13) {
      tempErrors.phone = "Enter valid phone number";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNextStep = () => {
    formData.price = calculateTotal();
    console.log("Form Data on Next Step:", formData); // Log the form data on each step
    if (step === 5) return; // Prevent going beyond step 5
    if (!validate()) return; // Only move to next step if validation passes
    setStep((prevStep) => prevStep + 1);
  };

  const handleGoBack = () => {
    console.log("Form Data on Go Back:", formData); // Log the form data when going back
    if (step === 1) return; // Prevent going back below step 1
    setStep((prevStep) => prevStep - 1);
  };

  const handleConfirm = () => {
    console.log("Form Data on Confirm:", formData); // Log the form data when confirming the subscription
    setStep(5); // This would go to the thank you page or final step
  };

  const calculateTotal = () => {
    let total = 0;

    if (formData.billingCycle === "monthly") {
      if (formData.plan === "Arcade") total = 9; // Example: Arcade plan price
      if (formData.plan === "Advanced") total = 12; // Example: Advanced plan price
      if (formData.plan === "Pro") total = 15; // Example: Pro plan price

      // Add price for selected add-ons
      if (formData.addOns.online) total += 1;
      if (formData.addOns.storage) total += 2;
      if (formData.addOns.profile) total += 2;
    } else {
      if (formData.plan === "Arcade") total = 90; // Example: Arcade plan price
      if (formData.plan === "Advanced") total = 120; // Example: Advanced plan price
      if (formData.plan === "Pro") total = 150; // Example: Pro plan price

      // Add price for selected add-ons
      if (formData.addOns.online) total += 10;
      if (formData.addOns.storage) total += 20;
      if (formData.addOns.profile) total += 20;
    }

    return total;
  };

  return (
    <div className="container bg-[#EEF5FF] h-screen flex justify-center items-center ">
      <div className="md:p-4 md:rounded-xl md:bg-white md:flex md:max-w-fit mx-auto md:h-[75%] shadow-lg h-screen w-[100%]">
        {/* Sidebar */}
        <aside className="md:block border bg-[url('assets/bg-sidebar-mobile.svg')] md:bg-[url('assets/bg-sidebar-desktop.svg')] md:bg-desk bg-no-repeat bg-cover bg-bottom md:basis-[276px] shrink-0 md:min-h-[570p] min-h-[150px] p-10 text-white font-bold uppercase  md:rounded-xl overflow-hidden">
          <ul className="flex justify-center gap-2 md:flex-col md:gap-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <li key={stepNumber} className="flex gap-4 items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                    step === stepNumber
                      ? "bg-blue-300 text-black border-transparent"
                      : "bg-transparent text-white border-white"
                  } font-bold text-sm`}
                >
                  {stepNumber}
                </div>
                <div className="hidden md:flex flex-col">
                  <span className="text-sm text-[#ecf3fb] font-thin text-[12px]">
                    Step {stepNumber}
                  </span>
                  <span className="tracking-wider text-sm">
                    {stepNumber === 1
                      ? "Your info"
                      : stepNumber === 2
                      ? "Select plan"
                      : stepNumber === 3
                      ? "Add-ons"
                      : "Summary"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
        {/* Sidebar end */}

        <main className=" rounded-xl bg-white my-[-60px] md:my-0 p-4  lg:mx-16 md:w-[530px] md:relative flex flex-col justify-between w-[90%] m-auto max-w-md ">
          {/* Step 1 */}
          {step === 1 && (
            <Step1 formData={formData} errors={errors} handleInputChange={handleInputChange} />
          )}
          {/* Step 2 */}
          {step === 2 && (
            <Step2
              formData={formData}
              setFormData={setFormData}
              handleToggleChange={handleToggleChange}
            />
          )}
         {step === 3 && (
            <Step3
              formData={formData}
              handleCheckboxChange={handleCheckboxChange}
            />
          )}
         {step === 4 && (
            <Step4
              formData={formData}
              handleGoBack={handleGoBack}
              calculateTotal={calculateTotal}
            />
          )}

          {/* Step 5: Thank You */}
          {step === 5 && <Step5 />}

          {/* Buttons */}
          {step !== 5 && (
            <div
              className={`hidden  md:flex  md:flex-row mb-5 justify-between items-center `}
            >
              {step > 1 && (
                <span
                  className="go-back font-semibold px-6 py-2 cursor-pointer text-zinc-500 hover:text-[#03295A] md:absolute md:left-[20px] md:bottom-[20px] mt-4 md:mt-0"
                  onClick={handleGoBack}
                >
                  Go Back
                </span>
              )}
              <button
                onClick={handleNextStep}
                className={`px-6 py-2 mx-2 md:mx-0 text-white font-semibold rounded-md transition bg-[#03295A] hover:bg-[#184A89] cursor-pointer md:absolute md:right-[20px] md:bottom-[20px] mt-4 md:mt-0`}
              >
                {step === 4 ? "Confirm" : "Next Step"}
              </button>
            </div>
          )}
        </main>
        {step !== 5 && (
          <div className="flex md:hidden flex-row mt-[60px] mb-5 justify-between items-center w-[90%] mx-auto">
            {step > 1 && (
              <span
                className="go-back font-semibold px-6 py-2 cursor-pointer text-zinc-500 hover:text-[#03295A] mt-8"
                onClick={handleGoBack}
              >
                Go Back
              </span>
            )}
            <button
              onClick={step === 5 ? handleConfirm : handleNextStep}
              className="px-6 py-2 mx-2 md:mx-0 text-white font-semibold rounded-md transition bg-[#03295A] hover:bg-[#184A89] cursor-pointer mt-8 ml-auto"
            >
              {step === 4 ? "Confirm" : "Next Step"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;

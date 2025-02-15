import { useState } from "react";
import Arcade from "../assets/icon-arcade.svg";
import Advance from "../assets/icon-advanced.svg";
import Pro from "../assets/icon-pro.svg";
import checkIcon from "../assets/icon-checkmark.svg";
import thankyou from "../assets/icon-thank-you.svg";

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
    price : 0
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });
  // const [step, setStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // For phone number field, filter out alphabetic characters
    if (name === "phone") {
      // Replace anything that's not a number, space, plus, or dash
      const validValue = value.replace(/[^0-9+\s-]/g, '');
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
  }
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
   if (!formData.phone ) {
    tempErrors.phone = "This field is required";
  }
  if(formData.phone.length < 9 || formData.phone.length > 13){
    tempErrors.phone = "Enter valid phone number"
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

   if(formData.billingCycle === "monthly"){
    if (formData.plan === "Arcade") total = 9; // Example: Arcade plan price
    if (formData.plan === "Advanced") total = 12; // Example: Advanced plan price
    if (formData.plan === "Pro") total = 15; // Example: Pro plan price

    // Add price for selected add-ons
    if (formData.addOns.online) total += 1;
    if (formData.addOns.storage) total += 2;
    if (formData.addOns.profile) total += 2;
   }else{
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
  <section className="one">
    <h1 className="text-2xl font-bold mb-2">Personal info</h1>
    <p className="text-zinc-500 text-sm">
      Please provide your name, email address, and phone number.
    </p>
    <form className="mt-6 text-marineBlue">
      <div className="mb-4 flex items-center justify-between">
        <label htmlFor="name" className="block text-sm font-semibold ">
          Name
        </label>
        {errors.name && (
          <p className="text-red-500 text-xs ml-2 font-semibold">
            {errors.name}
          </p>
        )}
      </div>
      <input
        className={`block mb-4 mt-[-15px] border font-semibold p-2 rounded-lg w-full ${
          errors.name ? "border-red-500" : "border-zinc-600"
        }`}
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="e.g. Stephen King"
      />
      <div className="mb-4 flex items-center justify-between">
        <label htmlFor="mail" className="block text-sm font-semibold mb-1">
          Email Address
        </label>
        {errors.email && (
          <p className="text-red-500 text-xs ml-2 font-semibold">
            {errors.email}
          </p>
        )}
      </div>
      <input
        className={`block mb-4 mt-[-15px]  border font-semibold p-2 rounded-lg w-full ${
          errors.email ? "border-red-500" : "border-zinc-600"
        }`}
        type="email"
        id="mail"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="e.g. stephenking@lorem.com"
      />
      <div className="mb-4 flex items-center justify-between">
        <label htmlFor="phone" className="block text-sm font-semibold mb-1">
          Phone Number
        </label>
        {errors.phone && (
          <p className="text-red-500 text-xs ml-2 font-semibold">
            {errors.phone}
          </p>
        )}
      </div>
      <input
        className={`block mb-4 mt-[-15px]  border font-semibold p-2 rounded-lg w-full ${
          errors.phone ? "border-red-500" : "border-zinc-600"
        }`}
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="e.g. +1 234 567 890"
        inputMode="tel"
      />
    </form>
  </section>
)}


          {/* Step 2 */}
          {step === 2 && (
            <section className="two mx-auto w-[100%]">
              <h1 className="text-3xl text-marineBlue font-bold mb-3">
                Select your plan
              </h1>
              <p className="text-zinc-500 mb-4">
                You have the option of monthly or yearly billing.
              </p>
              <div className="grid gap-6 md:grid-cols-3 mt-3">
                {["Arcade", "Advanced", "Pro"].map((plan) => (
                  <div
                    key={plan}
                    className={`border-2 p-4 flex gap-2 md:flex-col  rounded-xl text-left cursor-pointer  ${
                      formData.plan === plan
                        ? "border-[#03295A] bg-[#F8F9FE]"
                        : "border-zinc-200 bg-white"
                    }`}
                    onClick={() => setFormData({ ...formData, plan })}
                  >
                    <img
                      src={
                        plan === "Arcade"
                          ? Arcade
                          : plan === "Advanced"
                          ? Advance
                          : Pro
                      }
                      alt={plan}
                    />
                    <div className="md:mt-4">
                      <h3 className="text-marineBlue font-bold">{plan}</h3>
                      <span className="text-zinc-400 block">
                        $
                        {formData.billingCycle === "monthly"
                          ? plan === "Arcade"
                            ? "9"
                            : plan === "Advanced"
                            ? "12"
                            : "15"
                          : plan === "Arcade"
                          ? "90"
                          : plan === "Advanced"
                          ? "120"
                          : "150"}{" "}
                        /{formData.billingCycle === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Toggle for billing cycle */}
              <div className=" flex items-center justify-center mt-8 mb-4 md:mb-0">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={handleToggleChange}
                    checked={formData.billingCycle === "yearly"}
                  />
                  <span className="text-black font-semibold peer-checked:text-zinc-500">
                    Monthly
                  </span>
                  <div className="relative mx-2 w-14 h-7 bg-[#03295A] hover:bg-[#184A89] rounded-full transition-all duration-300">
                    <div
                      className={`absolute w-5 h-5 top-1 bg-white rounded-full transition-transform duration-300 ${
                        formData.billingCycle === "yearly"
                          ? "right-1"
                          : "left-1"
                      }`}
                    ></div>
                  </div>
                  <span
                    className={`font-semibold ml-2 transition-colors duration-300 ${
                      formData.billingCycle === "yearly"
                        ? "text-[#03295A]"
                        : "text-zinc-500"
                    }`}
                  >
                    Yearly
                  </span>
                </label>
              </div>
            </section>
          )}
          {step === 3 && (
            <section className="three mx-auto">
              <h1 className="text-3xl md:text-3xl text-marineBlue font-bold mb-3">
                Pick add-ons
              </h1>
              <p className="text-zinc-500">
                Add-ons help enhance your gaming experience.
              </p>

              <div className="holder mt-3 md:mt-9">
                {/* Online Service Add-On */}
                <label
                  htmlFor="online"
                  className={`px-3 md:px-5 py-3 mb-3 border-2 hover:border-[#6259FF] border-zinc-400 cursor-pointer rounded-xl flex items-center gap-3 md:gap-5 }`}
                >
                  <input
                    className="peer appearance-none absolute"
                    type="checkbox"
                    id="online"
                    name="online"
                    checked={formData.addOns.online}
                    onChange={handleCheckboxChange}
                  />
                  <span
                    className={`block relative w-6 aspect-square rounded-md border-2 ${
                      formData.addOns.online
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-zinc-300"
                    }`}
                  >
                    <img
                      src={checkIcon}
                      alt="check"
                      className="absolute top-0 left-0 right-0 bottom-0 m-auto"
                    />
                  </span>

                  <div className="flex justify-between items-center grow">
                    <div>
                      <h3 className="text-zinc-700 font-bold">
                        Online service
                      </h3>
                      <p className="text-zinc-500 text-sm md:text-base">
                        Access to multiplayer games
                      </p>
                    </div>
                    {formData.billingCycle === "monthly" ? (
                      <span className="text-[#6259FF] tracking-tighter text-xs md:text-base">
                      +$<span className="online price">1</span>/{" "}
                      <span className="mo-yr">mo</span>
                    </span>
                    ):(<span className="text-[#6259FF] tracking-tighter text-xs md:text-base">
                      +$<span className="online price">10</span>/{" "}
                      <span className="mo-yr">yr</span>
                    </span>)}
                  </div>
                </label>

                {/* Larger Storage Add-On */}
                <label
                  htmlFor="storage"
                  className={`px-3 md:px-5 py-3 mb-3 border-2 hover:border-[#6259FF] border-zinc-400 cursor-pointer rounded-xl flex items-center gap-3 md:gap-5 `}
                >
                  <input
                    className="peer appearance-none absolute"
                    type="checkbox"
                    id="storage"
                    name="storage"
                    checked={formData.addOns.storage}
                    onChange={handleCheckboxChange}
                  />
                  <span
                    className={`block relative w-6 aspect-square rounded-md border-2 ${
                      formData.addOns.storage
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-zinc-300"
                    }`}
                  >
                    <img
                      src={checkIcon}
                      alt="check"
                      className="absolute top-0 left-0 right-0 bottom-0 m-auto"
                    />
                  </span>

                  <div className="flex justify-between items-center grow">
                    <div>
                      <h3 className="text-zinc-700 font-bold">
                        Larger storage
                      </h3>
                      <p className="text-zinc-500 text-sm md:text-base">
                        Extra 1TB of cloud save
                      </p>
                    </div>
                    {formData.billingCycle === "monthly" ? (
                      <span className="text-[#6259FF] tracking-tighter text-xs md:text-base">
                      +$<span className="online price">2</span>/{" "}
                      <span className="mo-yr">mo</span>
                    </span>
                    ):(<span className="text-[#6259FF] tracking-tighter text-xs md:text-base">
                      +$<span className="online price">20</span>/{" "}
                      <span className="mo-yr">yr</span>
                    </span>)}
                  </div>
                </label>

                {/* Customizable Profile Add-On */}
                <label
                  htmlFor="profile"
                  className={`px-3 md:px-5 py-3 border-2 hover:border-[#6259FF] border-zinc-400 cursor-pointer rounded-xl flex items-center gap-3 md:gap-5 `}
                >
                  <input
                    className="peer appearance-none absolute"
                    type="checkbox"
                    id="profile"
                    name="profile"
                    checked={formData.addOns.profile}
                    onChange={handleCheckboxChange}
                  />
                 <span
                    className={`block relative w-6 aspect-square rounded-md border-2 ${
                      formData.addOns.profile
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-zinc-300"
                    }`}
                  >
                    <img
                      src={checkIcon}
                      alt="check"
                      className="absolute top-0 left-0 right-0 bottom-0 m-auto"
                    />
                  </span>

                  <div className="flex justify-between items-center grow">
                    <div>
                      <h3 className="text-zinc-700 font-bold">
                        Customizable Profile
                      </h3>
                      <p className="text-zinc-500 text-sm md:text-base">
                        Custom theme on your profile
                      </p>
                    </div>
                    {formData.billingCycle === "monthly" ? (
                      <span className="text-[#6259FF] tracking-tighter text-xs md:text-base">
                      +$<span className="online price">2</span>/{" "}
                      <span className="mo-yr">mo</span>
                    </span>
                    ):(<span className="text-[#6259FF] tracking-tighter text-xs md:text-base">
                      +$<span className="online price">20</span>/{" "}
                      <span className="mo-yr">yr</span>
                    </span>)}
                  </div>
                </label>
              </div>
            </section>
          )}
          {step === 4 && (
            <section className="four mx-auto ">
              <h1 className="text-3xl md:text-3xl text-[#03295A] font-bold mb-3">
                Finishing up
              </h1>
              <p className="text-zinc-500">
                Double-check everything looks OK before confirming.
              </p>
              <div className="result bg-alabaster rounded-lg p-5 flex flex-col gap-5 mt-3 md:mt-2">
                <div className="flex justify-between items-center border-b border-lightGray pb-5">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-[#03295A]">
                      <span className="plan-name">{formData.plan}</span> (
                      <span className="monthly-yearly">
                        {formData.billingCycle}
                      </span>
                      )
                    </h3>
                    <span
                      className="change-button text-zinc-500 hover:text-blue-800 underline cursor-pointer "
                      onClick={handleGoBack}
                    >
                      Change
                    </span>
                  </div>
                  {formData.billingCycle === "monthly" ? (
                    <span className="text-[#03295A] font-bold">
                    $
                    {formData.plan === "Arcade"
                      ? 9
                      : formData.plan === "Advanced"
                      ? 12
                      : 15}
                    /<span className="mo-yr">mo</span>
                  </span>
                  ):(<span className="text-[#03295A] font-bold">
                    $
                    {formData.plan === "Arcade"
                      ? 90
                      : formData.plan === "Advanced"
                      ? 120
                      : 150}
                    /<span className="mo-yr">yr</span>
                  </span>)}
                </div>

                {/* Add-ons */}
                {formData.addOns.online && (
                  <div className="summary-add-on flex justify-between">
                    <h3 className="text-zinc-500">Online service</h3>
                    {formData.billingCycle === "monthly" ? (
                      <span className="text-zinc-500 font-semibold text-sm">
                      +$1/mo
                    </span>
                    ):(<span className="text-zinc-500 font-semibold text-sm">
                      +$10/yr
                    </span>)}
                  </div>
                )}
                {formData.addOns.storage && (
                  <div className="summary-add-on flex justify-between">
                    <h3 className="text-zinc-500">Larger storage</h3>
                    {formData.billingCycle === "monthly" ? (
                      <span className="text-zinc-500 font-semibold text-sm">
                      +$2/mo
                    </span>
                    ):(<span className="text-zinc-500 font-semibold text-sm">
                      +$20/yr
                    </span>)}
                  </div>
                )}
                {formData.addOns.profile && (
                  <div className="summary-add-on flex justify-between">
                    <h3 className="text-zinc-500">Customizable profile</h3>
                    {formData.billingCycle === "monthly" ? (
                      <span className="text-zinc-500 font-semibold text-sm">
                      +$2/mo
                    </span>
                    ):(<span className="text-zinc-500 font-semibold text-sm">
                      +$20/yr
                    </span>)}
                  </div>
                )}
              </div>

              <div className="total flex justify-between p-5">
                <h3 className="text-zinc-500">
                  Total (per{" "}
                  {formData.billingCycle==="monthly" ?<span className="month-year">month</span>:<span className="month-year">year</span>})
                </h3>
                <span className="text-blue-700 font-bold text-xl">
                  ${calculateTotal()}
                  <span className="mo-yr">/mo</span>
                </span>
              </div>
            </section>
          )}

          {/* Step 5: Thank You */}
          {step === 5 && (
            <section className=" flex mx-auto text-center my-12 md:my-0 flex-col gap-5 justify-center items-center h-full">
              <img src={thankyou} alt="thankyou" />
              <h2 className="text-marineBlue text-3xl font-bold">Thank you!</h2>
              <p className="text-zinc-500">
                Thanks for confirming your subscription! We hope you have fun
                using our platform. If you ever need support, please feel free
                to email us at support@loremgaming.com.
              </p>
            </section>
          )}

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

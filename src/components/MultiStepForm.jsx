import { useState } from "react";
import Arcade from "../assets/icon-arcade.svg";
import Advance from "../assets/icon-advanced.svg";
import Pro from "../assets/icon-pro.svg";

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
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
    if (!formData.name) tempErrors.name = "This field is required";
    if (!formData.email) tempErrors.email = "This field is required";
    if (!formData.phone) tempErrors.phone = "This field is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNextStep = () => {
    console.log("Form Data:", formData); // Log all form data
    if (step === 4) return; // Prevent going beyond step 4
    if (!validate()) return; // Only move to next step if validation passes
    setStep((prevStep) => prevStep + 1);
  };

  const handleGoBack = () => {
    if (step === 1) return; // Prevent going back below step 1
    setStep((prevStep) => prevStep - 1);
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
            <section className="one ">
              <h1 className="text-2xl font-bold mb-2">Personal info</h1>
              <p className="text-zinc-500 text-sm">
                Please provide your name, email address, and phone number.
              </p>
              <form className="mt-6 text-marineBlue">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-1"
                  >
                    Name
                  </label>
                  {errors.name && (
                    <p className="text-red-500 text-xs ml-auto font-semibold">
                      {errors.name}
                    </p>
                  )}
                  <input
                    className={`block mb-2 border font-semibold p-2 rounded-lg w-full ${
                      errors.name ? "border-red-500" : "border-zinc-600"
                    }`}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Stephen King"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="mail"
                    className="block text-sm font-semibold mb-1"
                  >
                    Email Address
                  </label>
                  {errors.email && (
                    <p className="text-red-500 text-xs ml-auto font-semibold">
                      {errors.email}
                    </p>
                  )}
                  <input
                    className={`block mb-2 border font-semibold p-2 rounded-lg w-full ${
                      errors.email ? "border-red-500" : "border-zinc-600"
                    }`}
                    type="email"
                    id="mail"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. stephenking@lorem.com"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold mb-1"
                  >
                    Phone Number
                  </label>
                  {errors.phone && (
                    <p className="text-red-500 text-xs ml-auto font-semibold">
                      {errors.phone}
                    </p>
                  )}
                  <input
                    className={`block mb-2 border font-semibold p-2 rounded-lg w-full ${
                      errors.phone ? "border-red-500" : "border-zinc-600"
                    }`}
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +1 234 567 890"
                  />
                </div>
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

          {/* Buttons */}
          <div className=" hidden  md:flex  md:flex-row mb-5 justify-between items-center">
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
        </main>
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
    onClick={handleNextStep}
    className="px-6 py-2 mx-2 md:mx-0 text-white font-semibold rounded-md transition bg-[#03295A] hover:bg-[#184A89] cursor-pointer mt-8 ml-auto"
  >
    {step === 4 ? "Confirm" : "Next Step"}
  </button>
</div>
      </div>
    </div>
  );
};

export default MultiStepForm;

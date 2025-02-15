import PropTypes from "prop-types";
import Arcade from "../assets/icon-arcade.svg";
import Advance from "../assets/icon-advanced.svg";
import Pro from "../assets/icon-pro.svg";

const Step2 = ({ formData, setFormData, handleToggleChange }) => {
  return (
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
            className={`border-2 p-4 flex gap-2 md:flex-col rounded-xl text-left cursor-pointer ${
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
              <h3 className="font-bold">{plan}</h3>
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
      <div className="flex items-center justify-center mt-8 mb-4 md:mb-0">
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
  );
};

// PropTypes validation
Step2.propTypes = {
  formData: PropTypes.shape({
    plan: PropTypes.string.isRequired,
    billingCycle: PropTypes.string.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  handleToggleChange: PropTypes.func.isRequired,
};

export default Step2;

import PropTypes from "prop-types";
import checkIcon from "../assets/icon-checkmark.svg";

const Step3 = ({ formData, handleCheckboxChange }) => {
  return (
    <section className="three mx-auto">
      <h1 className="text-3xl md:text-3xl font-bold mb-3">
        Pick add-ons
      </h1>
      <p className="text-zinc-500">
        Add-ons help enhance your gaming experience.
      </p>

      <div className="holder mt-3 md:mt-9">
        {/* Online Service Add-On */}
        <label
          htmlFor="online"
          className={`px-3 md:px-5 py-3 mb-3 border-2 hover:border-[#6259FF] border-zinc-400 cursor-pointer rounded-xl flex items-center gap-3 md:gap-5`}
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
              <h3 className="text-zinc-700 font-bold">Online service</h3>
              <p className="text-zinc-500 text-sm md:text-base">
                Access to multiplayer games
              </p>
            </div>
            {formData.billingCycle === "monthly" ? (
              <span className="text-[#6259FF] tracking-tighter text-xs md:text-base">
                +$<span className="online price">1</span>/{" "}
                <span className="mo-yr">mo</span>
              </span>
            ) : (
              <span className="text-[#6259FF] tracking-tighter text-xs md:text-base">
                +$<span className="online price">10</span>/{" "}
                <span className="mo-yr">yr</span>
              </span>
            )}
          </div>
        </label>

        {/* Larger Storage Add-On */}
        <label
          htmlFor="storage"
          className={`px-3 md:px-5 py-3 mb-3 border-2 hover:border-[#6259FF] border-zinc-400 cursor-pointer rounded-xl flex items-center gap-3 md:gap-5`}
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
              <h3 className="text-zinc-700 font-bold">Larger storage</h3>
              <p className="text-zinc-500 text-sm md:text-base">
                Extra 1TB of cloud save
              </p>
            </div>
            {formData.billingCycle === "monthly" ? (
              <span className="text-[#6259FF] tracking-tighter text-xs md:text-base">
                +$<span className="online price">2</span>/{" "}
                <span className="mo-yr">mo</span>
              </span>
            ) : (
              <span className="text-[#6259FF] tracking-tighter text-xs md:text-base">
                +$<span className="online price">20</span>/{" "}
                <span className="mo-yr">yr</span>
              </span>
            )}
          </div>
        </label>

        {/* Customizable Profile Add-On */}
        <label
          htmlFor="profile"
          className={`px-3 md:px-5 py-3 border-2 hover:border-[#6259FF] border-zinc-400 cursor-pointer rounded-xl flex items-center gap-3 md:gap-5`}
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
              <h3 className="text-zinc-700 font-bold">Customizable Profile</h3>
              <p className="text-zinc-500 text-sm md:text-base">
                Custom theme on your profile
              </p>
            </div>
            {formData.billingCycle === "monthly" ? (
              <span className="text-[#6259FF] tracking-tighter text-xs md:text-base">
                +$<span className="online price">2</span>/{" "}
                <span className="mo-yr">mo</span>
              </span>
            ) : (
              <span className="text-[#6259FF] tracking-tighter text-xs md:text-base">
                +$<span className="online price">20</span>/{" "}
                <span className="mo-yr">yr</span>
              </span>
            )}
          </div>
        </label>
      </div>
    </section>
  );
};

// PropTypes validation
Step3.propTypes = {
  formData: PropTypes.shape({
    addOns: PropTypes.shape({
      online: PropTypes.bool.isRequired,
      storage: PropTypes.bool.isRequired,
      profile: PropTypes.bool.isRequired,
    }).isRequired,
    billingCycle: PropTypes.string.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Step3;

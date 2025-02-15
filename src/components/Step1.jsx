
import PropTypes from "prop-types";

const Step1 = ({ formData, errors, handleInputChange }) => {
  return (
    <section className="one">
      <h1 className="text-2xl font-bold mb-2">Personal info</h1>
      <p className="text-zinc-500 text-sm">
        Please provide your name, email address, and phone number.
      </p>
      <form className="mt-6 ">
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
  );
};

// PropTypes validation
Step1.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    plan: PropTypes.string,
    addOns: PropTypes.shape({
      online: PropTypes.bool,
      storage: PropTypes.bool,
      profile: PropTypes.bool,
    }),
    billingCycle: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Step1;

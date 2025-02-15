import PropTypes from "prop-types";

const Step4 = ({ formData, handleGoBack, calculateTotal }) => {
  return (
    <section className="four mx-auto">
      <h1 className="text-3xl md:text-3xl text-[#03295A] font-bold mb-3">
        Finishing up
      </h1>
      <p className="text-zinc-500">
        Double-check everything looks OK before confirming.
      </p>
      <div className="result  rounded-lg p-5 flex flex-col gap-5 mt-3 md:mt-2">
        <div className="flex justify-between items-center border-b border-zinc-500 pb-5">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-[#03295A]">
              <span className="plan-name">{formData.plan}</span> (
              <span className="monthly-yearly">{formData.billingCycle}</span>)
            </h3>
            <span
              className="change-button text-zinc-500 hover:text-blue-800 underline cursor-pointer"
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
          ) : (
            <span className="text-[#03295A] font-bold">
              $
              {formData.plan === "Arcade"
                ? 90
                : formData.plan === "Advanced"
                ? 120
                : 150}
              /<span className="mo-yr">yr</span>
            </span>
          )}
        </div>

        {/* Add-ons */}
        {formData.addOns.online && (
          <div className="summary-add-on flex justify-between">
            <h3 className="text-zinc-500">Online service</h3>
            {formData.billingCycle === "monthly" ? (
              <span className="text-zinc-500 font-semibold text-sm">
                +$1/mo
              </span>
            ) : (
              <span className="text-zinc-500 font-semibold text-sm">
                +$10/yr
              </span>
            )}
          </div>
        )}
        {formData.addOns.storage && (
          <div className="summary-add-on flex justify-between">
            <h3 className="text-zinc-500">Larger storage</h3>
            {formData.billingCycle === "monthly" ? (
              <span className="text-zinc-500 font-semibold text-sm">
                +$2/mo
              </span>
            ) : (
              <span className="text-zinc-500 font-semibold text-sm">
                +$20/yr
              </span>
            )}
          </div>
        )}
        {formData.addOns.profile && (
          <div className="summary-add-on flex justify-between">
            <h3 className="text-zinc-500">Customizable profile</h3>
            {formData.billingCycle === "monthly" ? (
              <span className="text-zinc-500 font-semibold text-sm">
                +$2/mo
              </span>
            ) : (
              <span className="text-zinc-500 font-semibold text-sm">
                +$20/yr
              </span>
            )}
          </div>
        )}
      </div>

      <div className="total flex justify-between p-5">
        <h3 className="text-zinc-500">
          Total (per{" "}
          {formData.billingCycle === "monthly" ? (
            <span className="month-year">month</span>
          ) : (
            <span className="month-year">year</span>
          )}
          )
        </h3>
        {formData.billingCycle === "monthly" ? (
          <span className="text-blue-700 font-bold text-xl">
            ${calculateTotal()}
            <span className="mo-yr">/mo</span>
          </span>
        ) : (
          <span className="text-blue-700 font-bold text-xl">
            ${calculateTotal()}
            <span className="mo-yr">/yr</span>
          </span>
        )}
      </div>
    </section>
  );
};

// PropTypes validation
Step4.propTypes = {
  formData: PropTypes.shape({
    plan: PropTypes.string.isRequired,
    billingCycle: PropTypes.string.isRequired,
    addOns: PropTypes.shape({
      online: PropTypes.bool.isRequired,
      storage: PropTypes.bool.isRequired,
      profile: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  handleGoBack: PropTypes.func.isRequired,
  calculateTotal: PropTypes.func.isRequired,
};

export default Step4;

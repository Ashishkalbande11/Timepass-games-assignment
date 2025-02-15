import thankyou from "../assets/icon-thank-you.svg";

const Step5 = () => {
  return (
    <section className="flex mx-auto text-center my-12 md:my-0 flex-col gap-5 justify-center items-center h-full">
      <img src={thankyou} alt="thankyou" />
      <h2 className="text-[#03295A] text-3xl font-bold">Thank you!</h2>
      <p className="text-zinc-500">
        Thanks for confirming your subscription! We hope you have fun
        using our platform. If you ever need support, please feel free
        to email us at support@loremgaming.com.
      </p>
    </section>
  );
};

Step5.propTypes = {
  // Any props 
};

export default Step5;

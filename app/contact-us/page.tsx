export default function page() {
  return (
    <>
      <div className="contain md:min-h-[500px]">
        <div className="bg-white dark:bg-zinc-800 p-4 md:p-8 border dark:border-zinc-700 rounded-3xl">
          <iframe
            className="w-full h-[500px] rounded-xl"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d578.144398176163!2d57.065918!3d30.285109!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f02194b75763ba7%3A0x7614844a442009ee!2z2YHYsdmI2LTar9in2Ycg2KrYrti12LXbjCDZgtmH2YjZhyDYqtmI2K_Yp9qp!5e1!3m2!1sen!2sus!4v1725218680426!5m2!1sen!2sus"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default function MainFooter() {
  return (
    <>
      <footer className="w-full mb-[70px] lg:mb-0">
        <div className="bg-zinc-100">
          <span className="p-5 block text-sm text-center">فوتر وب سایت</span>
        </div>
        <div className="bg-zinc-800 p-8">
          <p className="text-center text-zinc-200 leading-7">
            این وب سایت صرفا جهت ارائه نمونه کار است و هیچ فعالیت تجاری ندارد.
            تمامی حقوق مطعلق به{" "}
            <a href="https://mobit.ir" className="text-blue-400">
              مبیت
            </a>{" "}
            می باشد.
          </p>
          <span className="bg-gradient-to-r from-transparent via-blue-500/50 to-transparent block h-[1px] max-w-[500px] mx-auto my-3" />
          <p className="text-sm text-center text-zinc-300 leading-7 mb-2">
            این وب سایت شامل پنل مدیریت ادمین و پنل کاربری می باشد که پس از ثبت
            نام / ورود بلافاصله وارد آن می شوید. برای وارد شدن به پنل ادمین باید
            رنک ادمین را داشته باشید.
          </p>
          <span className="text-center block text-zinc-400 text-sm mb-2">
            Owned And Devlope By Mahdi Saljoughi
          </span>
          <span className="block text-center text-zinc-500 text-sm mb-2">
            1403/06/27
          </span>
          <span className="block text-center text-zinc-600 text-sm">
            2024 ©
          </span>
          <span className="bg-gradient-to-r from-transparent via-blue-500/50 to-transparent block h-[1px] max-w-[500px] mx-auto mt-3" />
        </div>
      </footer>
    </>
  );
}

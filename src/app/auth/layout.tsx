import Image from "next/image";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-1 flex-col items-center gap-2 justify-center bg-primary/20">
      <div className="flex flex-col p-14 rounded-md w-full max-w-[456px] bg-black">
        <Image
          src="/logo.png"
          width={50}
          height={50}
          alt="logo"
          className="width-10"
        />
        {children}
      </div>
    </main>
  );
};

export default layout;

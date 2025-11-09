import Body from "../src/assets/body3.png";

function Home() {
  return (
    <>
      <div className="flex flex-col w-full h-full border-amber-600">
        <h1 className="text-3xl font-bold mx-auto text-indigo">CHEST DAY!</h1>
        <div className="flex w-full h-full">
          <img src={Body} alt="body" className="h-full p-8" />
          <div className="bg-[#1E1E2C]">
            <p>teste</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

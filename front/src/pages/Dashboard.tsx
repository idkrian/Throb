import Body from "../../src/assets/body3.png";

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-full border-amber-600">
      <div className="flex w-full h-full">
        <img src={Body} alt="body" className="h-112 p-8" />
        <div className="">
          <p>teste</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

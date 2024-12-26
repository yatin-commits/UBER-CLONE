import { Link } from "react-router-dom";

const Home = () => {
    return (
      <div>
        <div className="bg-cover bg-bottom bg-[url(./public/images/traffic.png)] h-screen pt-5  flex justify-between flex-col w-full ">
          <img className="w-20 ml-8" src="/images/uberlogo.png" alt="" />
          <div className="bg-white pb-7 py-4 px-4">
            <h2 className="text-3xl  font-bold font-[poppins] ">Get Started with Uber</h2>
            <Link to='/login' className="flex item-center justify-center bg-black text-white rounded py-3 mt-4">Continue</Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;
  
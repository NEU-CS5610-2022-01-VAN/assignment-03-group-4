import Header from "../components/Header";
import H2 from "@material-tailwind/react/Heading2";
import LeadText from "@material-tailwind/react/LeadText";

const Home = () => {
  return (
    <>
      <main>
        <Header>
          <div className="container max-w-8xl relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <H2 color="white">Find Your Recipe.</H2>

                <div className="bg-amber-100 bg-opacity-80 p-4 text-white">
                  add seach bar here
                  {/* <LeadText color="gray-200">
                    This is a simple example of a Landing Page you can build
                    using Material Tailwind. It features multiple components
                    based on the Tailwind CSS and Material Design by Google.
                  </LeadText> */}
                </div>
              </div>
            </div>
          </div>
        </Header>
      </main>
    </>
  );
};

export default Home;

import Icon from "@material-tailwind/react/Icon";
import H4 from "@material-tailwind/react/Heading4";
import LeadText from "@material-tailwind/react/LeadText";

const Welcome = () => {
  return (
    <div className="flex px-8 m-full flex-wrap mx-auto items-center my-32">
      <div className="w-8/12 md:w-4/12 mx-auto ">
        <H4 color="gray">Cooking is a pleasure</H4>
        <LeadText color="blueGray">
          Don't let your uses guess by attaching tooltips and popoves to any
          element. Just make sure you enable them first via JavaScript.
        </LeadText>

        <a
          href="../pages/Recipes"
          className="font-medium text-amber-500 mt-2 inline-block"
        >
          View Recipes
        </a>
      </div>
      <img
        className="w-5/12 md:w-4/12 mr-auto"
        src="https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg"
      />
    </div>
  );
};

export default Welcome;

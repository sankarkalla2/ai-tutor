import Spinner from "./spinner";

const Loader = () => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg">
      <Spinner />
    </div>
  );
};

export default Loader;

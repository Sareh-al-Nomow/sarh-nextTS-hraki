import { getAddresses } from "@/lib/axios/addressAxios";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../UI/SpinnerLoading";
import { motion } from "framer-motion";
import AddressInfo from "./AddressInfo";

const AddressesInfo = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });
  

  console.log(data);

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 flex justify-center items-center text-center"></div>
        <div className="p-6">
          <h3 className="font-medium mb-2 text-center">{error.name}</h3>
          <p className="py-10">{error.message}</p>

          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      </motion.div>
    );
  }

  if (data?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 flex justify-center items-center text-center"></div>
        <div className="p-6">
          <h3 className="font-medium mb-2 text-center">No Addresses Yet!</h3>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      {data?.map((a, index) => (
        <AddressInfo key={a.id ?? index} address={a} />
      ))}
    </motion.div>
  );
};

export default AddressesInfo;

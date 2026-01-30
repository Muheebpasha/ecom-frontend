import React, { useState } from "react";
import { MdPersonAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import useSellerFilter from "../../../hooks/useSellerFilter";
import ErrorPage from "../../shared/ErrorPage";

function Sellers() {
    const [openModal, setOpenModal] = useState(false);
    const { sellers, pagination } = useSelector((state) => state.seller);
    const { isLoading, errorMessage } = useSelector((state) => state.errors);

      // Calling the `useSellerFilter` custom hook to fetch sellers and pagination based on the current URL parameters.
    useSellerFilter();
    const emptySellers = !sellers || sellers?.length === 0;

    if (errorMessage) {
      return <ErrorPage message={errorMessage} />;
    }

  return (
     <React.Fragment>

       <div className="pt-6 pb-10 flex justify-end">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300"
        >
          <MdPersonAdd className="text-xl" />
          Add Seller
        </button>
      </div>

     </React.Fragment>
  )
}

export default Sellers
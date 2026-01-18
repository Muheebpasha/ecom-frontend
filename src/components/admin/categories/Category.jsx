import { useState } from "react"
import { FaFolderOpen, FaThList } from "react-icons/fa";
import { useSelector } from "react-redux";
import useCategoryFilter from "../../../hooks/useCategoryFilter";
import Loader from "../../shared/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { categoryTableColumns } from "../../helper/tableColumn";
import Modal from "../../shared/Modal";
import CategoryForm from "./CategoryForm";
import ErrorPage from "../../shared/ErrorPage";

function Category() {
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { categoryLoader, errorMessage } = useSelector((state) => state.errors);

  const { categories, pagination } = useSelector((state)=> state.products);

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  // Calling the `useCategoryFilter` custom hook to handle category fetching and pagination based on the current URL parameters.
  useCategoryFilter();

    const tableRecords = categories?.map((item) => ({
        id: item.categoryId,
        categoryName: item.categoryName,
        version: item.version,
    }));

      const handleEdit = (category) => {
        setOpenUpdateModal(true);
        setSelectedCategory(category);
      }

      const handleDelete = (category) => {
        setSelectedCategory(category);
        setOpenDeleteModal(true);
      }

      const onDeleteHandler = () => {
        dispatch(
          deleteCategoryDashboardAction(setOpenDeleteModal, selectedCategory?.id, toast)
        );
      };

      const handlePaginationChange = (paginationModel) => {
        const page = paginationModel.page + 1; // Adjust to 1-based index
        setCurrentPage(page);

        params.set("page", page.toString());
        navigate(`${pathname}?${params}`);
      };

    const emptyCategories = !categories || categories?.length === 0;

    if (errorMessage) return <ErrorPage message={errorMessage} />;

  return (
    <div>
            <div className="pt-6 pb-10 flex justify-end">
              <button
                  onClick={() => setOpenModal(true)}
                  className="bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300">
                  <FaThList className="text-xl" />
                  Add Category
                </button>
            </div>
             
            {!emptyCategories && (
              <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
                All Categories
              </h1>
            )}

          {categoryLoader ? (
            <Loader />
          ) : (
            <>
              {emptyCategories ? (
                <div className="flex flex-col items-center justify-center text-gray-600 py-10">
                  <FaFolderOpen size={50} className="mb-3" />
                  <h2 className="text-2xl font-semibold">
                    No Categories Created Yet
                  </h2>
                </div>
              ) : (
                <div className="max-w-fit mx-auto">
                  <DataGrid
                    className="w-full"
                    rows={tableRecords}
                    columns={categoryTableColumns(handleEdit, handleDelete)}
                    paginationMode="server"
                    rowCount={pagination?.totalElements || 0}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: pagination?.pageSize || 10,
                          page: currentPage - 1,
                        },
                      },
                    }}
                    onPaginationModelChange={handlePaginationChange}
                    disableRowSelectionOnClick
                    disableColumnResize
                    pageSizeOptions={[pagination?.pageSize || 10]}
                    pagination
                    paginationOptions={{
                      showFirstButton: true,
                      showLastButton: true,
                      hideNextButton: currentPage === pagination?.totalPages,
                    }}
                  />
                </div>
              )}

              <Modal
                  open={openUpdateModal || openModal}
                  setOpen={openUpdateModal ? setOpenUpdateModal : setOpenModal}
                  title={openUpdateModal ? "Update Category" : "Add Category"}
                >
                   <CategoryForm
                      setOpen={openUpdateModal ? setOpenUpdateModal : setOpenModal}
                      open={categoryLoader}
                      category={selectedCategory}
                      update={openUpdateModal}
                    />

                </Modal>
            </>
          )}
    </div>
  )
}

export default Category
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { dashboardProductsAction } from "../store/actions";

export const useDashboardProductFilter = () => {
     const [searchParams] = useSearchParams();
     const dispatch = useDispatch();

     const { user } = useSelector((state) => state.auth);
     const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");


     useEffect(()=>{
          const params = new URLSearchParams();
          const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
          
          const sortOrder = searchParams.get("sortby") || "asc";
          const categoryParams = searchParams.get("category") || null;
          const keyword = searchParams.get("keyword") || null;
          params.set("pageNumber",currentPage - 1);
          params.set("sortBy","price");
          params.set("sortOrder",sortOrder);
          if(categoryParams) {
               params.set("category",categoryParams);
          }
          if(keyword){
               params.set("keyword",keyword);
          }

          const queryString = params.toString();
          dispatch(dashboardProductsAction(queryString, isAdmin));
          console.log("QUERY STRING",queryString);
     },[dispatch,searchParams])
}

export default useDashboardProductFilter;
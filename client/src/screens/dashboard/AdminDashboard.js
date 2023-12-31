import React, { useEffect } from "react";
import Wrapper from "./Wrapper";
import { FaProductHunt } from "react-icons/fa";
import { BsBag, BsListStars } from "react-icons/bs";
import { TbBrandSvelte } from "react-icons/tb";
import { VscFeedback } from "react-icons/vsc";
import { HiOutlineUsers } from "react-icons/hi";
import { clearMessage, setSuccess } from "../../store/reducers/globalReducer";
import { RiAdminLine } from "react-icons/ri";
import { BsCashCoin, BsBagCheck, BsBagDash, BsBagPlus,BsPerson } from "react-icons/bs";
import ScreenHeader from "../../components/ScreenHeader";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../store/services/productService";
import { useGetQuery } from "../../store/services/categoryService";
import { useDeleteBrandMutation, useGetBrandsQuery } from "../../store/services/brandService";
import { useGetfeedbackQuery } from "../../store/services/feedbackService";
import Spinner from "../../components/Spinner";
import { useGetAllOrdersQuery, useGetOrdersQuery } from "../../store/services/orderService";
import {
  useDeleteBoyMutation,
  useGetAuthQuery,
  useGetBoyQuery,
  useGetCustomerQuery,
} from "../../store/services/authService";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination";
import toast, { Toaster } from "react-hot-toast";
const AdminDashboard = () => {
  let {page} = useParams();
   if(!page) {
      page = 1;
   }
  const { data, isFetching } = useGetProductsQuery(1);
  const { data: category, isFetching: fetching } = useGetQuery(1);
  const { data: brand, isFetching: fetch } = useGetBrandsQuery(1);
  const { data: feedback, isFetching: fe } = useGetfeedbackQuery(1);
  const { data: order, isFetching: fet } = useGetOrdersQuery(1);
  const { data: customer, isFetching: f } = useGetCustomerQuery(1);
  const { data: admin, isFetching: fetchi } = useGetAuthQuery(1);
 
 
  const {success} = useSelector(state => state.globalReducer);
    const dispatch = useDispatch();
    const [removeBrand, response] = useDeleteBoyMutation();
  const {data:data1 , isFetching:isf} = useGetBoyQuery(page);
  
  const deleteCat = id => {
    if(window.confirm('Are you really want to delete the Brand ?')) {
      removeBrand(id);
    }
 }
 useEffect(() => {
  if(success) {
    toast.success(success);
  }
  return () => {
     dispatch(clearMessage())
  }
 }, [])
 useEffect(() => {
  if (response.isSuccess) {
      toast.success(response?.data?.msg);
  }
}, [response?.data?.msg]);
 useEffect(() => {
      if(response.isSuccess) {
         dispatch(setSuccess(response?.data?.msg));
      }
 }, [response?.data?.message])
 useEffect(() => {
  return () => {
     dispatch(clearMessage())
  }
 }, [])
 
  return (
    <Wrapper>
      <div className="flex flex-wrap justify-center lg:w-full h-full ">
        <div className="flex flex-wrap   w-full h-[150px]  ">
          <div className=" p-2 w-[50%]  flex justify-center items-center  h-full sm:w-6/12 lg:w-3/12 xl:w-3/12 ">
            <div className="w-full h-full bg-[#268d60] rounded-lg">
              <div className="flex justify-between  sm:xl:justify-between xl:justify-between">
                <h3 className="relative inset-4 lx:inset-4 text-[40px] font-normal text-white  ">
                  {!isFetching ? data?.count : <Spinner />}
                </h3>
                <FaProductHunt
                  size={80}
                  className=" relative top-2  xl:top-4 right-2"
                />
              </div>
              <h3 className="text-[16px] font-normal text-white capitalize relative left-4 top-4 ">
                Total Product
              </h3>
            </div>
          </div>
          <div className=" p-2 w-[50%]  flex justify-center items-center  h-full sm:w-6/12 lg:w-3/12 xl:w-3/12 ">
            <div
              className="w-full h-full bg-[#e24c77] rounded-lg"
            >
              <div className="flex justify-between  sm:xl:justify-between xl:justify-between">
                <h3 className="relative inset-4 lx:inset-4 text-[40px] font-normal text-white  ">
                  {!fetching ? category?.count : <Spinner />}
                </h3>
                <BsListStars
                  size={80}
                  className=" relative top-2  xl:top-4 right-2"
                />
              </div>
              <h3 className="text-[16px] font-normal text-white capitalize relative left-4 top-4 ">
                Total Categories
              </h3>
            </div>
          </div>
          <div className=" p-2 w-[50%]  flex justify-center items-center  h-full sm:w-6/12 lg:w-3/12 xl:w-3/12 ">
            <div className="w-full h-full bg-[#b1a826] rounded-lg">
              <div className="flex justify-between  sm:xl:justify-between xl:justify-between">
                <h3 className="relative inset-4 lx:inset-4 text-[40px] font-normal text-white  ">
                  {!fetch ? brand?.count : <Spinner />}
                </h3>
                <TbBrandSvelte
                  size={80}
                  className=" relative top-2  xl:top-4 right-2"
                />
              </div>
              <h3 className="text-[16px] font-normal text-white capitalize relative left-4 top-4 ">
                Total Brands
              </h3>
            </div>
          </div>
          <div className="p-2 w-[50%]  flex justify-center items-center  h-full sm:w-6/12 lg:w-3/12 xl:w-3/12 ">
            <div className="w-full h-full bg-[#ff625b] rounded-lg">
              <div className="flex justify-between  sm:xl:justify-between xl:justify-between">
                <h3 className="relative inset-4 lx:inset-4 text-[40px] font-normal text-white  ">
                  {!fe ? feedback?.count : <Spinner />}
                </h3>
                <VscFeedback
                  size={80}
                  className=" relative top-2  xl:top-4 right-2"
                />
              </div>
              <h3 className="text-[16px] font-normal text-white capitalize relative left-4 top-4 ">
                Feedback
              </h3>
            </div>
          </div>
        </div>
        <div className="mt-[150px] h-[960px]  flex flex-col sm:flex-row w-full  lg:mt-3 xl:h-[450px] mt-3   ">
          <div className="w-full   flex flex-wrap   h-[450px] sm:w-6/12 lg:w-6/12 xl:w-6/12 ">
            <div className="w-[50%] h-[150px] py-2 px-2 sm:w-full lg:w-6/12 xl:w-6/12">
              <div className="w-full h-full rounded-lg bg-[#984fe7]">
                <div className="flex justify-between  sm:xl:justify-between xl:justify-between">
                  <h3 className="relative inset-4 lx:inset-4 text-[40px] font-normal text-white  ">
                    {!f ? customer?.count : <Spinner />}
                  </h3>
                  <HiOutlineUsers
                    size={80}
                    className=" relative top-2  xl:top-4 right-2"
                  />
                </div>
                <h3 className="text-[16px] font-normal text-white capitalize relative left-4 top-4 ">
                  Total Customers
                </h3>
              </div>
            </div>
            <div className="w-[50%] h-[150px] py-2 px-2 sm:w-full lg:w-6/12 xl:w-6/12">
              <div className="w-full h-full rounded-lg bg-[#d1941a]">
                <div className="flex justify-between  sm:xl:justify-between xl:justify-between">
                  <h3 className="relative inset-4 lx:inset-4 text-[40px] font-normal text-white  ">
                    {!fetchi ? admin?.count : <Spinner />}
                  </h3>
                  <RiAdminLine
                    size={80}
                    className=" relative top-2  xl:top-4 right-2"
                  />
                </div>
                <h3 className="text-[16px] font-normal text-white capitalize relative left-4 top-4 ">
                  Admins
                </h3>
              </div>
            </div>
            <div className="w-[50%] h-[150px] py-2 px-2 sm:w-full lg:w-6/12 xl:w-6/12">
              <div className="w-full h-full rounded-lg bg-[#58b5fb]">
                <div className="flex justify-between  sm:xl:justify-between xl:justify-between">
                  <h3 className="relative inset-4 lx:inset-4 text-[40px] font-normal text-white  ">
                    {data1?.count}
                  </h3>
                  <BsPerson
                    size={80}
                    className=" relative top-2  xl:top-4 right-2"
                  />
                </div>
                <h3 className="text-[16px] font-normal text-white capitalize relative left-4 top-4 ">
                  Delivery Boys
                </h3>
              </div>
            </div>
            <div className="w-[50%] h-[150px] py-2 px-2 sm:w-full lg:w-6/12 xl:w-6/12">
              <div className="w-full h-full rounded-lg bg-[#61d862]">
                <div className="flex justify-between  sm:xl:justify-between xl:justify-between">
                  <h3 className="relative inset-4 lx:inset-4 text-[40px] font-normal text-white  ">
                    {!fet ? order?.count : <Spinner />}
                  </h3>

                  <BsBagPlus
                    size={80}
                    className=" relative top-2  xl:top-4 right-2"
                  />
                </div>
                <h3 className="text-[16px] font-normal text-white capitalize relative left-4 top-4 ">
                  orders
                </h3>
              </div>
            </div>
            <div className="w-[50%] h-[150px] py-2 px-2 sm:w-full lg:w-6/12 xl:w-6/12">
              <div className="w-full h-full rounded-lg bg-[#2264d1]">
                <div className="flex justify-between  sm:xl:justify-between xl:justify-between">
                  <h3 className="relative inset-4 lx:inset-4 text-[40px] font-normal text-white  ">
                    {!fet ? order?.orderReceived : <Spinner />}
                  </h3>
                  <BsBagCheck
                    size={80}
                    className=" relative top-2  xl:top-4 right-2"
                  />
                </div>
                <h3 className="text-[16px] font-normal text-white capitalize relative left-4 top-4 ">
                  Receive Orders
                </h3>
              </div>
            </div>
            <div className="w-[50%] h-[150px] py-2 px-2 sm:w-full lg:w-6/12 xl:w-6/12">
              <div className="w-full h-full rounded-lg bg-[#7a7585]">
                <div className="flex justify-between  sm:xl:justify-between xl:justify-between">
                  <h3 className="relative inset-4 lx:inset-4 text-[40px] font-normal text-white  ">
                    {!fet ? order?.orderPending : <Spinner />}
                  </h3>
                  <BsBagDash
                    size={80}
                    className=" relative top-2  xl:top-4 right-2"
                  />
                </div>
                <h3 className="text-[16px] font-normal text-white capitalize relative left-4 top-4 ">
                  Pending Orders
                </h3>
              </div>
            </div>
          </div>
          <div className="w-full h-[800px] sm:w-full  xl:h-[450px]   p-2    flex justify-center items-center  h-full sm:w-6/12 lg:w-6/12 xl:w-6/12 ">
            <div className="w-full  h-full bg-black border-[1px] border-black rounded-lg">
              <ScreenHeader>
                <div className="flex justify-between pr-2" >
                <button className="btn-dark rounded-xl ml-3">
                  Delivery Boys List
                </button>
                <Link to="/dashboard/create-delivery" className="btn-dark rounded-xl ">
                  Create
                </Link>
                </div>
              </ScreenHeader>
              <Toaster position="top-right" reverseOrder={true} />
           {!isFetching ? data1?.data?.length > 0 && <><div>
              <table className="w-full bg-gray-900 ">
                 <thead>
                    <tr className="border-b border-gray-800 text-left">
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">name</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">location</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">edit</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">delete</th>
                    </tr>
                 </thead>
                 <tbody>
                    {data1?.data?.map(boy => (
                       <tr key={boy._id} className="odd:bg-gray-800">
                          <td className="p-3 capitalize text-sm font-normal text-gray-400">{boy.name}</td>
                          <td className="p-3 capitalize text-sm font-normal text-gray-400">{boy.location}</td>
                          <td className="p-3 capitalize text-sm font-normal text-gray-400"><Link to={`/dashboard/update-boy/${boy._id}`} className="btn btn-warning">edit</Link></td>
                          <td className="p-3 capitalize text-sm font-normal text-gray-400"><button className="btn btn-danger" onClick={() => deleteCat(boy._id)}>delete</button></td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div><Pagination page={parseInt(page)} perPage={data1.perPage} count={data1.count} path="dashboard/deliver-body" /></> : <Spinner />}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminDashboard;

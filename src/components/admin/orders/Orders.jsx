import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import OrderTable from './OrderTable';
import useOrderFilter from '../../../hooks/useOrderFilter';

const Orders = () => {
  
  
  //const adminOrder = [ { orderId: 1001, email: "john.doe@email.com", totalAmount: 299.99, orderStatus: "Delivered", orderDate: "2026-01-08" }, { orderId: 1002, email: "jane.smith@gmail.com", totalAmount: 149.50, orderStatus: "Shipped", orderDate: "2026-01-07" }, { orderId: 1003, email: "mike.wilson@outlook.com", totalAmount: 89.99, orderStatus: "Pending", orderDate: "2026-01-09" }, { orderId: 1004, email: "sarah.brown@yahoo.com", totalAmount: 456.75, orderStatus: "Cancelled", orderDate: "2026-01-06" }, { orderId: 1005, email: "david.lee@company.com", totalAmount: 234.00, orderStatus: "Delivered", orderDate: "2026-01-08" }, { orderId: 1006, email: "emily.davis@hotmail.com", totalAmount: 678.25, orderStatus: "Processing", orderDate: "2026-01-09" } ];

   const {adminOrder, pagination} = useSelector((state) => state.order);

  useOrderFilter();
  // const pagination = { pageNumber: 0, pageSize: 50, totalElements: 11, totalPages: 1, lastPage: true };

  const emptyOrder = !adminOrder || adminOrder?.length ===0;
  
  return (
    <div className='pb-6 pt-20'>
          {emptyOrder ? (
            <div className='flex flex-col items-center justify-center text-gray-600 py-10'>
              <FaShoppingCart size={50} className='mb-3'/>
              <h2 className='text-2xl font-semibold'>No Orders Placed Yet</h2>
            </div>
          ) : (
            <div>
              <OrderTable adminOrder={adminOrder} pagination={pagination} />
            </div>
          )}
           
    </div>
  )
}

export default Orders
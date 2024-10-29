'use client'
import { useDashboardContext } from "@/providers/admin";
import { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
export default function TotalSection() {
  const { userData, orders } = useDashboardContext();
  const [totalPrices, setTotalPrices] = useState(0)
  const calculatedTotal = orders?.reduce((acc, order) => {
    const orderTotal = order?.orderProducts?.reduce((sum, product) => {
      return sum + (product.basePrice * product.quantity);
    }, 0);
    return acc + orderTotal;
  }, 0);
  useEffect(() => {
    setTotalPrices(calculatedTotal || 0);
  }, [orders]);

  const totalSales = 14732;
  const salesIncreasePercentage = 4.2;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
      <div className="bg-gray-100 dark:bg-background rounded-lg p-4 flex items-center">
        <div className="bg-green-200 rounded-lg p-3 mr-4">
          <FaShoppingBag className="text-green-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-foreground font-medium text-sm">Total Sales</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-800 dark:text-gray-400 ont-bold text-2xl">
              {totalSales.toLocaleString()}
            </span>
            <span className="text-green-500 font-semibold text-sm">
              +{salesIncreasePercentage}%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-background rounded-lg p-4 flex items-center">
        <div className="bg-violet-300 rounded-lg p-3 mr-4">
          <IoWallet className="text-violet-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-foreground font-medium text-sm">Total Expenses</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-bold text-2xl">
              ${calculatedTotal?.toLocaleString()}
            </span>
            <span className="text-green-500 font-semibold text-sm">
              +{salesIncreasePercentage}%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-background rounded-lg p-4 flex items-center">
        <div className="bg-blue-200 rounded-lg p-3 mr-4">
          <FaUser className="text-blue-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-foreground font-medium text-sm">Total Visitors</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-bold text-2xl">
              {userData?.length.toLocaleString()}
            </span>
            <span className="text-green-500 font-semibold text-sm">
              +{salesIncreasePercentage}%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-background rounded-lg p-4 flex items-center">
        <div className="bg-yellow-200 rounded-lg p-3 mr-4">
          <FaShoppingCart className="text-yellow-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-foreground font-medium text-sm">Total Orders</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-bold text-2xl">
              {orders?.length.toLocaleString()}
            </span>
            <span className="text-green-500 font-semibold text-sm">
              +{salesIncreasePercentage}%
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}
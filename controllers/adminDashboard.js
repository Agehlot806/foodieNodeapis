 import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { Stats } from "../models/Stats.js";

export const getDashboardStats = catchAsyncError(async(req,res,next)=> {

    const stats = await Stats.find({}).sort({createdAt:"desc"}).limit(12);
    const statsData = [];
    for (let i = 0; i < stats.length; i++) {
        statsData.unshift(stats[i]); 
    }
    const requiredSize = 12 - stats.length;
    for (let i = 0; i < requiredSize; i++) {
        statsData.unshift({
          users: 0,
          subscription: 0,
          views: 0,
        });
      }
      const resturentsCount = statsData[11].resturents;
      const ordersCount = statsData[11].orders;
      const foodsCount = statsData[11].foods;
      const driversCount = statsData[11].drivers;


      let resturentPercentage = 0,
      orderPercentage = 0,
      foodPercentage = 0,
      driverPercentage =0
    let resturentProfit = true,
      orderProfit = true,
      foodProfit = true,
      driverProfit = true;



      if (statsData[10].resturents === 0) resturentPercentage = resturentsCount * 100;
      if (statsData[10].orders === 0) orderPercentage = ordersCount * 100;
      if (statsData[10].foods === 0)foodPercentage = foodsCount * 100;
      if(statsData[10].drivers==0) driverPercentage = driversCount *100;
      else {
        const difference = {
          resturents: statsData[11].resturents - statsData[10].resturents,
          orders: statsData[11].orders - statsData[10].orders,
          foods: statsData[11].foods - statsData[10].foods,
          drivers: statsData[11].drivers - statsData[10].drivers,

        };

        resturentPercentage = (difference.resturents / statsData[10].resturents) * 100;
        orderPercentage = (difference.orders / statsData[10].orders) * 100;
        foodPercentage =(difference.foods / statsData[10].foods) * 100;
        driverPercentage =(difference.drivers / statsData[10].drivers) * 100;
        if (resturentPercentage < 0) resturentProfit = false;
        if (orderPercentage < 0) orderProfit = false;
        if (foodPercentage < 0) foodProfit = false;
        if (driverPercentage < 0) driverProfit = false;
      }

      res.status(200).json({
        success: true,
        stats: statsData,
        resturentsCount,
        foodsCount,
        ordersCount,
        driversCount,
        resturentPercentage,
        foodPercentage,
        orderPercentage,
        driverPercentage,
        // usersProfit,
      });
    


// This will create a chart and collect all the data from the apis 





})

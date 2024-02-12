import moment from 'moment'

export const categorySegregator = (transactions)=>{
     const categoryData = {
        General : 0,
        Food:0,
        Shopping:0,
        Travel:0,
        Fuel:0
     }
     
     const expenseData = {
      January :0, 
      February:0,
      March:0,
      April:0,
      May:0,
      June:0,
      July:0,
      August:0,
      September:0,
      October:0,
      November:0, 
      December:0
     }

     const incomeData = {
      January :0, 
      February:0,
      March:0,
      April:0,
      May:0,
      June:0,
      July:0,
      August:0,
      September:0,
      October:0,
      November:0, 
      December:0
     }
     transactions.forEach((transaction)=>{
          const monthName = moment(transaction.date).format('MMMM');
         if(transaction.transactionType === 'income'){
            incomeData[monthName] += parseInt(transaction.amount)
         }
         else{
            expenseData[monthName] += parseInt(transaction.amount)
            categoryData[transaction.category] +=  parseInt(transaction.amount)
         }
     })
     return [categoryData,expenseData,incomeData];
}
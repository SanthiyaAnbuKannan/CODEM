function calculateCart(cart){
  let total = 0;
  let mostExpensiveItem = "";
  let highestPrice = 0;
  for(let i = 0; i < cart.length; i++){
    total += cart[i].price * cart[i].quantity;
    if(cart[i].price > highestPrice){
        highestPrice = cart[i].price;
        mostExpensiveItem = cart[i].item;
    }
  }
  let discountApplied = false;
  let finalAmount = total;
  if(total > 100000){
      discountApplied = true;
      finalAmount = total - (total * 0.1);
  }
  let result = {totalBeforeDiscount: total, discountApplied: discountApplied, finalAmount: finalAmount, mostExpensiveItem: mostExpensiveItem};
  return result;
}
console.log(calculateCart(cart));
export type CartLine = {
  cost: {totalAmount: number, amountPerQuantity: number},
  id: string,
  merchandise: {
    id: string,
    color: string,
    image: string,
    productTitle: string,
    size: string
  }  
  quantity: number
}

export type Cart = {
  id: string,
  checkoutUrl: string,
  lines: Array<CartLine>
}
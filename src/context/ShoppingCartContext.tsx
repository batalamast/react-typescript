import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number
    increaceCartQuantity: (id: number) => void
    decreaseItemQuantity: (id: number) => void
    removeFromCart: (id: number) => void
}

const ShoppingCartContent = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContent)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartitems, setCartItems] = useState<CartItem[]>([])

    function getItemQuantity(id: number) {
        return cartitems.find(item => item.id === id)?.quantity || 0;
        
    }

    function increaceCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function decreaseItemQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity ===1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item;
                    }
                });
            }
        });  
    }

    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        });
    }

    return (
        <ShoppingCartContent.Provider value={{ 
                getItemQuantity, 
                increaceCartQuantity, 
                decreaseItemQuantity, 
                removeFromCart 
            }}>
            {children}
        </ShoppingCartContent.Provider>
    )
}
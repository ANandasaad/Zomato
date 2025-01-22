import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@states/store';

interface CartItem {
  isVeg: boolean;
  id: string;
  name: string;
  price: number;
  quantity: number;
  cartPrice: number;
  isCustomizable?: boolean;
  customizations?: any[];
}

interface RestaurantDetails {
  id: string;
  name: string;
  discount: string;
  discountAmount: string;
  time: string;
  distance: string;
  rating: number;
  imageUrl: string;
}

interface RestaurantCart {
  restaurants: RestaurantDetails;
  items: CartItem[];
}

interface CartState {
  carts: RestaurantCart[];
}

const initialState: CartState = {
  carts: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (
      state,
      action: PayloadAction<{restaurant: RestaurantDetails; item: CartItem}>,
    ) => {
      const {restaurant, item} = action.payload;
      const cart = state.carts.find(
        cart => cart.restaurants.id === restaurant.id,
      );

      if (cart) {
        const existingCartItem = cart.items?.find(
          cartItem => cartItem.id === item.id,
        );
        if (existingCartItem) {
          existingCartItem.quantity += 1;
          existingCartItem.cartPrice =
            (existingCartItem.cartPrice || 0) + existingCartItem?.price;
        } else {
          cart?.items?.push({...item, quantity: 1, cartPrice: item?.price});
        }
      } else {
        state.carts.push({
          restaurants: restaurant,
          items: [{...item, quantity: 1, cartPrice: item?.price}],
        });
      }
      console.log(cart);
    },
    removeCartItem: (
      state,
      action: PayloadAction<{restaurant_id: string; itemId: string}>,
    ) => {
      const {restaurant_id, itemId} = action.payload;

      const cartRestaurant = state.carts.find(
        cart => cart.restaurants.id === restaurant_id,
      );
      if (!cartRestaurant) {
        return;
      }
      if (cartRestaurant) {
        const itemIndex = cartRestaurant.items?.findIndex(
          cartItem => cartItem.id === itemId,
        );
        if (itemIndex !== -1) {
          const item = cartRestaurant.items[itemIndex];
          if (item.quantity > 1) {
            item.quantity -= 1;
            item.cartPrice = (item.cartPrice || 0) - item?.price;
          } else {
            cartRestaurant.items?.splice(itemIndex, 1);
          }
        }
      }

      if (cartRestaurant?.items?.length === 0) {
        state.carts = state.carts.filter(
          cart => cart.restaurants.id !== restaurant_id,
        );
      }
    },
    addCustomizableItem: (
      state,
      action: PayloadAction<{
        restaurant: RestaurantDetails;
        item: CartItem;
        customization: {
          quantity: number;
          price: number;
          customizationOptions: any[];
        };
      }>,
    ) => {
      const {restaurant, item, customization} = action.payload;
      const existingRestaurants = state.carts.find(
        cart => cart.restaurants.id === restaurant.id,
      );
      if (existingRestaurants) {
        const existingItem = existingRestaurants?.items.find(
          cartItem => cartItem.id === item.id,
        ) as any;
        if (existingItem) {
          const existingCustomizationIndex =
            existingItem?.customizations?.findIndex(
              (cust: any) =>
                JSON.stringify(cust.customizationOptions) ===
                JSON.stringify(customization?.customizationOptions),
            );
          if (
            existingCustomizationIndex !== -1 &&
            existingCustomizationIndex !== undefined
          ) {
            const existingCustomization =
              existingItem?.customizations[existingCustomizationIndex];
            if (existingCustomization) {
              existingCustomization.quantity += customization.quantity;
              existingCustomization.cartPrice += customization.price;
            }
          } else {
            const newCustomizationId =
              `c${existingItem?.customizations?.length || 0}` + 1;
            existingItem?.customizations?.push({
              id: newCustomizationId,
              ...customization,
              quantity: customization?.quantity,
              cartPrice: customization?.price,
              price: customization?.price / customization?.quantity,
            });
          }
        } else {
          existingRestaurants?.items?.push({
            ...item,
            quantity: customization.quantity,
            cartPrice: customization.price,
            customizations: [
              {
                id: `c2`,
                ...customization,
                quantity: customization?.quantity,
                cartPrice: customization?.price,
                price: customization?.price / customization?.quantity,
              },
            ],
          });

          if (existingItem) {
            existingItem.quantity += customization.quantity;
            existingItem.cartPrice =
              (existingItem.cartPrice || 0) + customization.price;
          }
        }
      } else {
        const newCustomizationId = `c1`;
        state.carts.push({
          restaurants: restaurant,
          items: [
            {
              ...item,
              quantity: customization.quantity,
              cartPrice: customization.price,
              customizations: [
                {
                  id: newCustomizationId,
                  ...customization,
                  quantity: customization?.quantity,
                  cartPrice: customization?.price,
                  price: customization?.price / customization?.quantity,
                },
              ],
            },
          ],
        });
      }
    },
  },
});
export const {addCartItem, removeCartItem, addCustomizableItem} =
  cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export const selectRestaurantCartItem = (
  restaurantId: string,
  itemId: string,
) =>
  createSelector(
    (state: RootState) =>
      state.cart.carts.find(cart => cart.restaurants.id === restaurantId)
        ?.items,
    items => items?.find(item => item.id === itemId) || null,
  );
export default cartSlice.reducer;

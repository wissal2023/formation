import { useSelector } from "react-redux";

const TotalWishlist = () => {
   const productItem = useSelector((state) => state.wishlist.wishlist);

   return (
      <>
         <span className="wishlist-count">{productItem.length}</span>
      </>
   );
}

export default TotalWishlist;

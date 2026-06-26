

"use client";

import { Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { openQuickView } from "@/store/slices/uiSlice";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  return (
    <div className="group bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/20">
      <div className="relative aspect-square overflow-hidden bg-gray-800">
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          {product.image ? (
         
          ) : (
           
          )}
          {product.onSale && (
            
          )}
          {product.isNew && (
            
          )}
        </Link>
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
         
    
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-base md:text-lg font-semibold text-white mb-2 line-clamp-2 hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-white">{product.rating || 4.9}</span>
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviews || 128})
          </span>
        </div>
        
        <div className="flex items-center justify-between">
        
          <button
            onClick={() => dispatch(addToCart(product))}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 group-hover:bg-blue-500"
          >
            <ShoppingCart className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}




























// "use client";

// import { Product } from "@/types";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { addToCart } from "@/store/slices/cartSlice";
// import { toggleWishlist } from "@/store/slices/wishlistSlice";
// import { openQuickView } from "@/store/slices/uiSlice";
// import { Heart, Eye, ShoppingCart } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";

// interface ProductCardProps {
//   product: Product;
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const dispatch = useAppDispatch();
//   const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
//   const isWishlisted = wishlistItems.some((item) => item.id === product.id);

//   return (
//     <div className="group bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/20">
//       <div className="relative aspect-square overflow-hidden bg-gray-800">
//         <Link href={`/products/${product.id}`} className="block w-full h-full">
//           {product.image ? (
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//           ) : (
//             <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
//               <span className="text-4xl">📦</span>
//             </div>
//           )}
//           {product.onSale && (
//             <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//               SALE
//             </div>
//           )}
//           {product.isNew && (
//             <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//               NEW
//             </div>
//           )}
//         </Link>
        
//         {/* Action Buttons */}
//         <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               dispatch(openQuickView(product));
//             }}
//             className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
//           >
//             <Eye className="h-4 w-4" />
//           </button>
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               dispatch(toggleWishlist(product));
//             }}
//             className={`p-2.5 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 ${
//               isWishlisted 
//                 ? "bg-red-500 text-white" 
//                 : "bg-white/10 text-white hover:bg-white/20"
//             }`}
//           >
//             <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
//           </button>
//         </div>
//       </div>
      
//       <div className="p-4">
//         <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
//           {product.category}
//         </p>
//         <Link href={`/products/${product.id}`} className="block">
//           <h3 className="text-base md:text-lg font-semibold text-white mb-2 line-clamp-2 hover:text-blue-400 transition-colors">
//             {product.name}
//           </h3>
//         </Link>
        
//         {/* Rating */}
//         <div className="flex items-center gap-2 mb-3">
//           <div className="flex items-center gap-0.5">
//             <span className="text-yellow-400">★</span>
//             <span className="text-sm text-white">{product.rating || 4.9}</span>
//           </div>
//           <span className="text-xs text-gray-500">
//             ({product.reviews || 128})
//           </span>
//         </div>
        
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <p className="text-xl font-bold text-white">Rs.{product.price}</p>
//             {product.originalPrice && (
//               <p className="text-sm text-gray-500 line-through">Rs.{product.originalPrice}</p>
//             )}
//           </div>
//           <button
//             onClick={() => dispatch(addToCart(product))}
//             className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 group-hover:bg-blue-500"
//           >
//             <ShoppingCart className="h-4 w-4 text-white" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

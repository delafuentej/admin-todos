import { ProductCard } from "@/products/components/ProductCard";

export default function Products() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
    {/* Productcard */}
    <ProductCard />
    <ProductCard />
    </div>
  );
}

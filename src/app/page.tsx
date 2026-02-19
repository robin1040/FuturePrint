import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />
      <ProductGrid />
    </div>
  );
}
